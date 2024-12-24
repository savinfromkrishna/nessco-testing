import React from "react";
import HeroSection from "@/components/knowledge-center/HeroSection";
const SubSection = dynamic(
  () => import("@/components/knowledge-center/SubSection")
);
const SectionComponent = dynamic(
  () => import("@/components/knowledge-center/Section")
);
import dynamic from 'next/dynamic'
import { KnowledgeCenterItem } from "@/components/knowledge-center/types/constant";

interface KnowledgeCenterProps {
  knowledgeCenterData: KnowledgeCenterItem;
}

const Pages: React.FC<KnowledgeCenterProps> = ({ knowledgeCenterData }) => {
  const Section = knowledgeCenterData?.knowledgeCenter[0]?.Section;

  return (
    <div>
      <div className="h-full bg-black w-full overflow-hidden">
        <HeroSection knowledgeCenterData={knowledgeCenterData} />
        <SubSection knowledgeCenterData={knowledgeCenterData} />{" "}
        <div className="h-full flex flex-col items-center mb-10">
          {" "}
          <div className="w-[94%] z-20">
            {" "}
            {Section.sections.map((item, idx) => (
              <SectionComponent
                key={idx}
                number={item?.number}
                title={item?.title}
                description={item?.description}
                img={item?.img}
                button={Section?.button}
                link={item?.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
