import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
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

const IP_DATA_KEY = 'ip_data'
const IP_DATA_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export function useTrackUserSource(): VisitData | null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visitData, setVisitData] = useState<VisitData | null>(null)

  useEffect(() => {
    const initializeVisitData = async () => {
      const sessionStartTime = localStorage.getItem("session_start_time")
      const currentUrl = window.location.href

      if (!sessionStartTime) {
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

      const { browserName, osName, deviceType } = getBrowserAndOSInfo(userAgent)

      const leadSource = getLeadSource(document.referrer, sessionStorage)

      const adParams = getAdParams(searchParams, sessionStorage)

      const ipData = await getIPData()

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
    }

    initializeVisitData()
  }, [pathname, searchParams])

  return visitData
}

function getBrowserAndOSInfo(userAgent: string) {
  let browserName = "Unknown Browser"
  let osName = "Unknown OS"
  let deviceType = "Desktop"

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

  return { browserName, osName, deviceType }
}

function getLeadSource(referrer: string, sessionStorage: Storage) {
  let leadSource = sessionStorage.getItem("Lead_Source") || ""

  if (leadSource) return leadSource

  if (referrer) {
    if (referrer.includes("google.com")) leadSource = "Google Search"
    else if (referrer.includes("bing.com")) leadSource = "Bing Search"
    else if (referrer.includes("yahoo.com")) leadSource = "Yahoo Search"
    else if (referrer.includes("duckduckgo.com")) leadSource = "DuckDuckGo Search"
    else if (referrer.includes("baidu.com")) leadSource = "Baidu Search"
    else if (referrer.includes("yandex.com")) leadSource = "Yandex Search"
    else leadSource = "Reference"
  } else {
    leadSource = "WebSite Visit"
  }

  sessionStorage.setItem("Lead_Source", leadSource)
  return leadSource
}

function getAdParams(searchParams: URLSearchParams, sessionStorage: Storage) {
  const adParamNames = [
    "medium", "campaignname", "campaignid", "adgroupid", "creative",
    "keyword", "matchtype", "device", "gclid", "source"
  ]

  const adParams: { [key: string]: string | null } = {}

  adParamNames.forEach(param => {
    const storedValue = sessionStorage.getItem(param)
    if (storedValue) {
      adParams[`Ad_${param.charAt(0).toUpperCase() + param.slice(1)}`] = storedValue
    } else {
      const paramValue = searchParams.get(param)
      if (paramValue) {
        sessionStorage.setItem(param, paramValue)
        adParams[`Ad_${param.charAt(0).toUpperCase() + param.slice(1)}`] = paramValue
      } else {
        adParams[`Ad_${param.charAt(0).toUpperCase() + param.slice(1)}`] = null
      }
    }
  })

  return adParams
}

async function getIPData() {
  const cachedData = localStorage.getItem(IP_DATA_KEY)
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData)
    if (Date.now() - timestamp < IP_DATA_EXPIRY) {
      return data
    }
  }

  const ipDataServices = [
    { url: "https://ipinfo.io/json", handler: handleIpinfoResponse },
    { url: "https://ipapi.co/json", handler: handleIpapiResponse },
    { url: "https://api.ipify.org/?format=json", handler: handleIpifyResponse },
  ]

  for (const service of ipDataServices) {
    try {
      const response = await fetch(service.url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      const processedData = await service.handler(data)
      localStorage.setItem(IP_DATA_KEY, JSON.stringify({ data: processedData, timestamp: Date.now() }))
      return processedData
    } catch (error) {
      // Silent failure, continue to next service
    }
  }

  // If all services fail, return default data without logging
  return getDefaultIPData()
}

function handleIpinfoResponse(data: any) {
  return {
    IP_Address: data.ip,
    Country: data.country,
    City: data.city,
    Web_Region: data.region,
    Latitude: data.loc ? parseFloat(data.loc.split(',')[0]) : null,
    Longitude: data.loc ? parseFloat(data.loc.split(',')[1]) : null,
    Zip_Code: data.postal,
  }
}

function handleIpapiResponse(data: any) {
  return {
    IP_Address: data.ip,
    Country: data.country_name,
    City: data.city,
    Web_Region: data.region,
    Latitude: data.latitude,
    Longitude: data.longitude,
    Zip_Code: data.postal,
  }
}

async function handleIpifyResponse(data: any) {
  try {
    const ipwhoResponse = await fetch(`http://ipwho.is/${data.ip}`)
    if (!ipwhoResponse.ok) throw new Error(`HTTP error! status: ${ipwhoResponse.status}`)
    const ipwhoData = await ipwhoResponse.json()
    return {
      IP_Address: data.ip,
      Country: ipwhoData.country,
      City: ipwhoData.city,
      Web_Region: ipwhoData.region,
      Latitude: ipwhoData.latitude,
      Longitude: ipwhoData.longitude,
      Zip_Code: ipwhoData.postal,
    }
  } catch (error) {
    throw error
  }
}

function getDefaultIPData() {
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

