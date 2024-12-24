import LandingPage from "@/components/PinkCity/LandingPage"
import dynamic from 'next/dynamic'
const SecondPage = dynamic(() => import("@/components/PinkCity/SecondPage"));
const Bluepage = dynamic(() => import("@/components/PinkCity/Bluepage"));
const PinkPage = dynamic(() => import("@/components/PinkCity/PinkPage"));
const Photocolag = dynamic(() => import("@/components/PinkCity/Photocolag"));
import { PinkCityData } from "./types/constant"

interface MainLayoutProps{
    pinkcityData:PinkCityData
}

export default function MainLayout ({pinkcityData}:MainLayoutProps) {

    return (
        <main className="bg-gray-100 lg:overflow-hidden md:overflow-hidden overflow-hidden ">
       <LandingPage pinkcityData={pinkcityData}/>
        <SecondPage  pinkcityData={pinkcityData}/>
         
       <Bluepage pinkcityData={pinkcityData}/>
   
      <PinkPage pinkcityData={pinkcityData}/>
          
      <Photocolag pinkcityData={pinkcityData}/>
        </main>
    )

}
