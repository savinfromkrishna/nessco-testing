import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const sheets = google.sheets({ version: 'v4' })

export async function POST(req: Request) {
  const { username, password } = await req.json()

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SITE_KEY || ''),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const spreadsheetId = '1IVSGPfI_yJq-2S7fwcReleoamg31_L-s69OeZz9JS4Y'
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is not set in environment variables')
    }

    try {
      const sheetsResponse = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
      })
      console.log('Fetched sheets:', sheetsResponse.data.sheets?.map(sheet => sheet.properties?.title));

      // Use the first sheet instead of looking for a specific name
      const firstSheetName = sheetsResponse.data.sheets?.[0]?.properties?.title

      console.log('Using sheet:', firstSheetName);

      if (!firstSheetName) {
        console.error('No sheets found in the spreadsheet');
        throw new Error('No sheets found in the spreadsheet. Please check the spreadsheet and permissions.');
      }

      // Now use the first sheet name in the range
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${firstSheetName}!A1:C`,
        auth,
      })

      const rows = response.data.values

      if (rows && rows.length > 0) {
        const user = rows.find(row => row[0] === username && row[1] === password)
        if (user) {
          // Set a cookie to maintain the session
          const response = NextResponse.json({ success: true })
          response.cookies.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
          })
          return response
        }
      }

      return NextResponse.json({ success: false }, { status: 401 })
    } catch (error) {
      console.error('Error fetching spreadsheet:', error);
      return NextResponse.json({ error: 'Failed to fetch spreadsheet data. Please check your credentials and permissions.' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error authenticating:', error)
    return NextResponse.json({ error: 'Authentication failed', details: (error as Error).message }, { status: 500 })
  }
}

