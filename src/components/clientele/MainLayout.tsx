import React from "react";
import { ClienteleItem } from "./types/constant";
import dynamic from 'next/dynamic'
const Grid = dynamic(() => import("./Grid"));
import Clientele from "./Clientele";

interface MainLayoutProps {
  clienteleData: ClienteleItem;
}

const MainLayout: React.FC<MainLayoutProps> = ({ clienteleData }) => {
  return (
    <main className="bg-black overflow-hidden">
      <Clientele clienteleData={clienteleData} />
      <div className="lg:mt-12 -mt-4 my-4 px-2">
        <Grid clienteleData={clienteleData} />
      </div>
    </main>
  );
};

export default MainLayout;
