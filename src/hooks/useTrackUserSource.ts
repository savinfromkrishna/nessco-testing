import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import axios from "axios"

export interface VisitData {
  Language: string
  Os_Name: string
  Device_Type: string
  Browser_Name: string
  Current_Page: string
  Visitor_First_Page: string | null
  Landing_page: string | null
  Visit_Count: string | null
  Lead_Source: string
  Ad_Medium: string | null
  Ad_CampaignName: string | null
  Ad_Campaign: string | null
  Ad_AdGroup: string | null
  Ad_Adcopy: string | null
  Ad_Keyword: string | null
  Ad_Matchtype: string | null
  Ad_Device: string | null
  Ad_Gclid: string | null
  Ad_Source: string | null
  Referrer: string | null
  IP_Address: string | null
  Country: string | null
  City: string | null
  Web_Region: string | null
  Latitude: number | null
  Longitude: number | null
  Zip_Code: string | null
}

export function useTrackUserSource(): VisitData | null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visitData, setVisitData] = useState<VisitData | null>(null)

  useEffect(() => {
    const initializeVisitData = async () => {
      const sessionStartTime = localStorage.getItem("session_start_time")
      const currentUrl = window.location.href

      if(!sessionStartTime) {
        localStorage.setItem("session_start_time", new Date().toISOString())
        localStorage.setItem("first_entry_page", currentUrl)
        localStorage.setItem("session_page_visit_count", "1")
        localStorage.setItem("total_visit_count", "1")
      } else {
        const sessionPageVisitCount =
          parseInt(localStorage.getItem("session_page_visit_count") || "0") + 1
        const totalVisitCount =
          parseInt(localStorage.getItem("total_visit_count") || "0") + 1
        localStorage.setItem(
          "session_page_visit_count",
          sessionPageVisitCount.toString()
        )
        localStorage.setItem("total_visit_count", totalVisitCount.toString())
      }

      if (!sessionStorage.getItem("Landing_page")) {
        sessionStorage.setItem("Landing_page", currentUrl)
      }

      const userAgent = navigator.userAgent
      const language = navigator.language

      let browserName = "Unknown Browser"
      let osName = "Unknown OS"
      let deviceType = "Desktop"

      // Determine OS and device type
      if (/android/i.test(userAgent)) {
        osName = "Android"
        deviceType = "Mobile"
      } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        osName = "iOS"
        deviceType = "Mobile"
      } else if (/windows/i.test(userAgent)) {
        osName = "Windows"
      } else if (/mac/i.test(userAgent)) {
        osName = "MacOS"
      } else if (/linux/i.test(userAgent)) {
        osName = "Linux"
      }

      // Determine browser
      if (/edg/i.test(userAgent)) {
        browserName = "Edge"
      } else if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
        browserName = "Chrome"
      } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
        browserName = "Safari"
      } else if (/firefox/i.test(userAgent)) {
        browserName = "Firefox"
      } else if (/msie|trident/i.test(userAgent)) {
        browserName = "Internet Explorer"
      }

      let leadSource = sessionStorage.getItem("Lead_Source") || ""

      const getSessionOrUrlParam = (paramName: string): string | null => {
        if (sessionStorage.getItem(paramName)) {
          return sessionStorage.getItem(paramName)
        }
        const paramValue = searchParams.get(paramName)
        if (paramValue) {
          sessionStorage.setItem(paramName, paramValue)
        }
        return paramValue
      }

      const adParams = {
        Ad_Medium: getSessionOrUrlParam("medium"),
        Ad_CampaignName: getSessionOrUrlParam("campaignname"),
        Ad_Campaign: getSessionOrUrlParam("campaignid"),
        Ad_AdGroup: getSessionOrUrlParam("adgroupid"),
        Ad_Adcopy: getSessionOrUrlParam("creative"),
        Ad_Keyword: getSessionOrUrlParam("keyword"),
        Ad_Matchtype: getSessionOrUrlParam("matchtype"),
        Ad_Device: getSessionOrUrlParam("device"),
        Ad_Gclid: getSessionOrUrlParam("gclid"),
        Ad_Source: getSessionOrUrlParam("source"),
      }

      if (Object.values(adParams).some((param) => param)) {
        if (adParams.Ad_Source) {
          if (adParams.Ad_Source.includes("Facebook_Ads")) {
            leadSource = "Facebook Ads"
          } else if (adParams.Ad_Source.includes("Google_Ads")) {
            leadSource = "Google Ads"
          } else if (adParams.Ad_Source.includes("Instagram_Ads")) {
            leadSource = "Instagram Ads"
          } else if (adParams.Ad_Source.includes("Twitter_Ads")) {
            leadSource = "Twitter Ads"
          } else {
            leadSource = "Other Ads"
          }
        } else {
          leadSource = "Ads"
        }
      } else if (document.referrer) {
        if (document.referrer.includes("google.com"))
          leadSource = "Google Search"
        else if (document.referrer.includes("bing.com"))
          leadSource = "Bing Search"
        else if (document.referrer.includes("yahoo.com"))
          leadSource = "Yahoo Search"
        else if (document.referrer.includes("duckduckgo.com"))
          leadSource = "DuckDuckGo Search"
        else if (document.referrer.includes("baidu.com"))
          leadSource = "Baidu Search"
        else if (document.referrer.includes("yandex.com"))
          leadSource = "Yandex Search"
        else leadSource = "Reference"
      } else {
        leadSource = document.referrer === "" ? "WebSite Visit" : "Others"
      }

      const fetchIPData = async () => {
        try {
          // First attempt: fetch data from ipinfo.io
          const response = await axios.get("https://ipinfo.io/json/")
          const data = response.data

          // Fetch additional location data from ipwho.is
          const response1 = await axios.get(`http://ipwho.is/${data.ip}`)
          const data1 = response1.data

          return {
            IP_Address: data.ip,
            Country: data1.country,
            City: data1.city,
            Web_Region: data1.region,
            Latitude: data1.latitude,
            Longitude: data1.longitude,
            Zip_Code: data1.postal,
          }
        } catch (error) {
          console.error(
            "Error fetching data from ipinfo.io, trying ipapi.co ...",
            error
          )

          try {
            // Second attempt: Try ipapi.co
            const response = await axios.get("https://ipapi.co/json/")
            const data = response.data

            return {
              IP_Address: data.ip,
              Country: data.country_name,
              City: data.city,
              Web_Region: data.region,
              Latitude: data.latitude,
              Longitude: data.longitude,
              Zip_Code: data.postal,
            }
          } catch (error) {
            console.error(
              "Error fetching data from ipapi.co, trying api.ipify.org ...",
              error
            )

            try {
              // Third attempt: Try ipify.org + ipwho.is combination
              const ipifyResponse = await axios.get("https://api.ipify.org/?format=json")
              const ipifyData = ipifyResponse.data

              try {
                // Try ipwho.is with ipify IP
                const ipwhoResponse = await axios.get(`http://ipwho.is/${ipifyData.ip}`)
                const ipwhoData = ipwhoResponse.data

                return {
                  IP_Address: ipifyData.ip,
                  Country: ipwhoData.country,
                  City: ipwhoData.city,
                  Web_Region: ipwhoData.region,
                  Latitude: ipwhoData.latitude,
                  Longitude: ipwhoData.longitude,
                  Zip_Code: ipwhoData.postal,
                }
              } catch (error) {
                console.error("Error fetching data from ipwho.is, trying db-ip.com ...", error)

                // Fourth attempt: Try db-ip.com
                try {
                  const dbipResponse = await axios.get(`https://api.db-ip.com/v2/free/${ipifyData.ip}`)
                  const dbipData = dbipResponse.data

                  return {
                    IP_Address: ipifyData.ip,
                    Country: dbipData.countryName,
                    City: dbipData.city,
                    Web_Region: dbipData.stateProv,
                    Latitude: null, // db-ip free API doesn't provide coordinates
                    Longitude: null,
                    Zip_Code: null, // db-ip free API doesn't provide postal code
                  }
                } catch (error) {
                  console.error("Error fetching data from db-ip.com", error)
                  throw error
                }
              }
            } catch (error) {
              console.error("All IP lookup services failed", error)
              return {
                IP_Address: null,
                Country: null,
                City: null,
                Web_Region: null,
                Latitude: null,
                Longitude: null,
                Zip_Code: null,
              }
            }
          }
        }
      }

      const ipData = await fetchIPData()

      const visitDetails: VisitData = {
        Language: language,
        Os_Name: osName,
        Device_Type: deviceType,
        Browser_Name: browserName,
        Current_Page: currentUrl,
        Visitor_First_Page: localStorage.getItem("first_entry_page"),
        Landing_page: sessionStorage.getItem("Landing_page"),
        Visit_Count: localStorage.getItem("total_visit_count"),
        Lead_Source: leadSource,
        ...adParams,
        Referrer: document.referrer || null,
        ...ipData,
      }

      setVisitData(visitDetails)
      console.log("Visit data updated:", visitDetails)
    }

    initializeVisitData()
  }, [pathname, searchParams])

  return visitData
}

