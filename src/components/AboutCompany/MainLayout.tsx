import dynamic from 'next/dynamic'
const Grid = dynamic(() => import("@/components/AboutCompany/Grid"));
const Founders = dynamic(() => import("@/components/AboutCompany/OurFounder"));
const SustainableD = dynamic(() => import("@/components/AboutCompany/SustainableD"));
const OurStoryD = dynamic(() => import("@/components/AboutCompany/OurstoryD"));
const Timeline = dynamic(() => import("@/components/ui/timeline"));
import AboutOurcompany from "@/components/AboutCompany/AboutOurcompany";
import { OurCompanyItem } from "./types/constant";

interface MainLayoutProps {
  companyData: OurCompanyItem;
}

export default function MainLayout({ companyData }: MainLayoutProps) {
  return (
    <main className="bg-black  ">
      <AboutOurcompany companyData={companyData} />
      <SustainableD companyData={companyData} />
      <OurStoryD companyData={companyData} />
      <Founders companyData={companyData} />
      <Timeline companyData={companyData} />
      <Grid companyData={companyData} />
      <div className="bg-black">
      {/* <TeamPage companyData={companyData} /> */}
      </div>
    </main>
  );
}
