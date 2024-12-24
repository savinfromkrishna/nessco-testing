import { headers } from 'next/headers';

export async function InitialDataFetcher() {
  const headersList = headers();
  const ipData = headersList.get('x-ip-data');

  return (
    <script
      id="__INITIAL_IP_DATA__"
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ipData ? JSON.parse(ipData) : null)
      }}
    />
  );
}

