import { NextResponse } from "next/server";
import { sheets } from "@/lib/googlesheet";
import axios from "axios";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "12jgmYS5nV1YlwusAGMA6hN6F-6CHOHdtqeIeU6T-ziI";
const RANGE = "Sheet1!A1";
const ZOHO_API_URL = process.env.ZOHO_API_URL || "https://www.zohoapis.com/crm/v2/functions/website_form/actions/execute";
const ZOHO_API_KEY = process.env.ZOHO_API_KEY || "1003.54049d87e2be729c5864458c7468a3e9.32e930cd0544f7d0098b658853f82a78";
const ZOHO_OAUTH_TOKEN = process.env.ZOHO_OAUTH_TOKEN || "YOUR_NEW_OAUTH_TOKEN";

interface CartItem {
  id: string;
  name: string;
  image: string;
}

interface InventoryItem {
  title: string;
  categoryType: string;
  description: string;
  img: string;
  code: string;
  information: string;
}

interface SubmissionData {
  fullname: string;
  email: string;
  mobilenumber: string;
  message?: string;
  formId: string;
  cartItems?: CartItem[];
  inventoryItems?: InventoryItem[];
  Language: string;
  Os_Name: string;
  Device_Type: string;
  Browser_Name: string;
  Current_Page: string;
  Visitor_First_Page: string;
  Landing_page: string;
  Visit_Count: string;
  Lead_Source: string;
  Ad_Medium: string | null;
  Ad_CampaignName: string | null;
  Ad_Campaign: string | null;
  Ad_AdGroup: string | null;
  Ad_Adcopy: string | null;
  Ad_Keyword: string | null;
  Ad_Matchtype: string | null;
  Ad_Device: string | null;
  Ad_Gclid: string | null;
  Ad_Source: string | null;
  Referrer: string | null;
  IP_Address: string;
  Country: string;
  City: string;
  Web_Region: string;
  Latitude: number;
  Longitude: number;
  Zip_Code: string;
}

export async function POST(request: Request) {
  try {
    const data: SubmissionData = await request.json();
    console.log("Received data:", data);

    let sheetsResult;

    // Check if the formId is "User Guide" or "Inventory"
    if (data.formId === "User Guide" || data.formId === "Inventory") {
      // Prepare data for Google Sheets
      const sheetData: (string | number)[] = [
        data.fullname,
        data.email,
        data.mobilenumber,
        data.message || "",
        data.formId,
        new Date().toISOString(),
        // Handle cartItems if they exist
        ...(Array.isArray(data.cartItems)
          ? data.cartItems.flatMap((item) => [item.id, item.name, item.image])
          : []),
        // Handle inventoryItems if they exist
        ...(Array.isArray(data.inventoryItems)
          ? data.inventoryItems.flatMap((item) => [
              item.title,
              item.categoryType,
              item.description,
              item.img,
              item.code,
              item.information,
            ])
          : []),
        data.IP_Address,
        data.Country,
        data.City,
        data.Web_Region,
        data.Latitude,
        data.Longitude,
        data.Zip_Code,
        data.Language,
        data.Os_Name,
        data.Device_Type,
        data.Browser_Name,
        data.Current_Page,
        data.Visitor_First_Page,
        data.Landing_page,
        data.Visit_Count,
        data.Lead_Source,
        data.Referrer || "",
        data.Ad_Medium || "",
        data.Ad_CampaignName || "",
        data.Ad_Campaign || "",
        data.Ad_AdGroup || "",
        data.Ad_Adcopy || "",
        data.Ad_Keyword || "",
        data.Ad_Matchtype || "",
        data.Ad_Device || "",
        data.Ad_Gclid || "",
        data.Ad_Source || "",
      ];

      // Append data to Google Sheets
      sheetsResult = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [sheetData],
        },
      });
      console.log("Google Sheets result:", sheetsResult.data);
    }

    // Prepare data for Zoho CRM (for all form submissions)
    const zohoData = {
      ...data,
      cartItems: JSON.stringify(data.cartItems || []),
      inventoryItems: JSON.stringify(data.inventoryItems || []),
    };

    // Submit data to Zoho CRM
    const zohoResponse = await axios.post(
      `${ZOHO_API_URL}?auth_type=apikey&zapikey=${ZOHO_API_KEY}`,
      zohoData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ZOHO_OAUTH_TOKEN}`,
        },
      }
    );

    const zohoResult = zohoResponse.data;

    if (zohoResponse.status !== 200) {
      throw new Error("Zoho CRM submission failed");
    }

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        sheetsResult: sheetsResult?.data,
        zohoResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Error submitting form", error: (error as Error).message },
      { status: 500 }
    );
  }
}

