import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import NavLayout from "@/components/Navbar/NavLayout";

import dynamic from "next/dynamic";
import { locales, validCountryISOs } from "@/i18n";
import { FormProvider } from "./context/FormContext";
import ContactIcons from "@/components/Contact/ContactIcon";
import { getBaseUrl } from "@/app/api/environment";
import { EnquiryCartProvider } from "./context/EnquiryContext";
import heroData from "@/dictionary/hero.json";
import {
  CountryCode,
  countryNames,
} from "@/components/constants/Navbar/config";

const FooterLayout = dynamic(() => import("@/components/Footer/FooterLayout"));

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--poppins",
  weight: ["400", "500", "600", "700"],
});

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";

async function fetchHeroData(locale: string) {
  try {
    const heroRes = await fetch(`${apiUrl}${locale}/hero.json`);
    if (!heroRes.ok)
      throw new Error(`Primary API fetch failed for locale: ${locale}`);
    return await heroRes.json();
  } catch (error) {
    console.error(`Primary fetch failed for locale: ${locale}`, error);
    try {
      const fallbackRes = await fetch(`${apiUrl}en/hero.json`, {
        cache: "no-store",
      });
      if (!fallbackRes.ok) throw new Error("Fallback API fetch failed");
      return await fallbackRes.json();
    } catch (fallbackError) {
      console.error("Fallback fetch failed", fallbackError);
      console.warn("Using local JSON data as last resort");
      return heroData;
    }
  }
}

export async function generateMetadata({
  params: { country, locale },
}: {
  params: { country: CountryCode; locale: string };
}) {
  const countryName = countryNames[country] || "Country";
  const heroData = await fetchHeroData(locale);
  const metaTitle = heroData?.home?.[0]?.homeSeoData?.title || "Default Title";
  const metaDescription =
    heroData?.home?.[0]?.homeSeoData?.description || "Default Description";
  return {
    title: `${metaTitle} - ${countryName}`,
    description: `${metaDescription} (${countryName})`,
  };
}

const generateHreflangLinks = (locale: string) => {
  const supportedLocales = validCountryISOs;
  const baseUrl = getBaseUrl();
  const urlParts = new URL(baseUrl);
  const pathSegments = urlParts.pathname.split("/");
  if (pathSegments.length >= 3) {
    pathSegments[1] = "{country}";
  }
  const dynamicPath = pathSegments.join("/");
  const baseDomain = `${urlParts.origin}${dynamicPath}`;

  const hreflangLinks = supportedLocales.map((country) => {
    const url = baseDomain.replace("{country}", country.toLowerCase());
    return (
      <link
        key={country}
        rel="alternate"
        hrefLang={`${locale}-${country.toUpperCase()}`}
        href={url}
      />
    );
  });

  hreflangLinks.push(
    <link key="x-default" rel="alternate" hrefLang="x-default" href={baseUrl} />
  );

  return hreflangLinks;
};

export default async function RootLayout({
  children,
  params: { country, locale },
}: {
  children: React.ReactNode;
  params: { country: CountryCode; locale: string };
}) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  locale = locales.includes(locale as any) ? locale : "en";

  return (
    <html lang={`${locale}-${country.toUpperCase()}`}>
      <head>{generateHreflangLinks(locale)}</head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <FormProvider>
          <EnquiryCartProvider>
            <NavLayout params={{ locale }} />
            <ContactIcons />
            {children}
            <div>
              <FooterLayout params={{ locale }} />
            </div>
          </EnquiryCartProvider>
        </FormProvider>
        <Script
          src="https://cdn.pagesense.io/js/nesscoindia/ff3c25fdacd845338fcb5edd343fcde6.js"
          strategy="lazyOnload"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16529601205"
        ></Script>
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16529601205');
          `}
        </Script>
        <Script id="zsiqchat" strategy="lazyOnload">
          {`
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              widgetcode: "siq57ecdd6785594ae3a0a956b5169f571c3e9a79d85694cb61eae8437cb511a908",
              values: {},
              ready: function() {}
            };
            var d = document;
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zohopublic.com/widget";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
          `}
        </Script>
      </body>
    </html>
  );
}
