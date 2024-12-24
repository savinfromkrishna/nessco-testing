import { Card, CardContent } from "@/components/ui/card"
import React from "react"
import BlurImage from "../ui/BlurImage";
import { AboutItem } from "./types/constant";
interface HomeLayoutProps{
  aboutData:AboutItem;
}



const Awards:React.FC<HomeLayoutProps>=({aboutData})=> {
  const homeheadData=aboutData?.About[0]?.Awardheading
  const homeawardData=aboutData?.About[0]?.awards


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white lg:pt-10 pt-5">
      <div className=" ">
        <h2 className="lg:text-3xl text-2xl font-medium text-left font-poppins pl-10 text-[#33246e] mb-4 ">{homeheadData?.title}</h2>
        <p className="text-left text-gray-600 mb-12 max-w-5xl pl-10 font-poppins text-sm font-regular">
          {homeheadData?.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-10">
          {homeawardData?.map((award, index) => (
            <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg hover:border-indigo-300  border lg:h-[17rem] rounded-xl h-[17rem]">
              <CardContent className=" flex flex-col items-center text-center">
                <div className=" ">
                 <BlurImage
                 src={award?.image}
                 alt="certificate"
                 width={150}
                 height={150}
                 className=""
                 />
                </div>
                <h3 className="font-medium text-base font-poppins mb-2">{award?.title}</h3>
                <p className="text-sm font-poppins font-regular text-gray-500 mb-4 text-wrap h-10 p-2">{award?.description}</p>
                <div className="flex bg-indigo-50 rounded-full w-[6rem] border justify-center p-1 hover:bg-indigo-100 mb-4 lg:mb-10">
                {/* <FiAward  className=" text-indigo-600"/> */}
                <p className="text-xs font-poppins font-regular ">Certified</p>
                </div>
                 
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Awards;