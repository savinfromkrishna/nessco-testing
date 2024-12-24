import Resources from "./Resources";
import { resourceItem } from "./types/constant";

interface MainLayoutProps{
    resourceData:resourceItem;
  }
  
  export default function MainLayout({resourceData}:MainLayoutProps) {
    return (
      <main className="bg-black  ">
       <Resources resourceData={resourceData} />
      </main>
    );
  }