"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { KnowledgeCenterItem } from "./types/constant";

interface KnowledgeCenterProps {
  knowledgeCenterData: KnowledgeCenterItem;
}

const SubSection: React.FC<KnowledgeCenterProps> = ({
  knowledgeCenterData,
}) => {
  const SubSection = knowledgeCenterData?.knowledgeCenter[0]?.SubSection;
  return (
    <div className="h-full w-full">
      <LampContainer>
        <motion.h1 className="lg:mt-8 py-4 text-white text-center text-2xl font-semibold tracking-tight md:text-5xl font-poppins">
          {SubSection?.title}
        </motion.h1>
        <p className="text-[1rem] font-normal text-center lg:w-2/3 text-white font-poppins">
          {SubSection?.description}
        </p>
      </LampContainer>
    </div>
  );
};
export default SubSection;
