import React from "react";
import { TechnicalSpecificationComponentDataType } from "./types/constant";
interface TechnicalSpecificationProps{
  technicalSpecification:TechnicalSpecificationComponentDataType
}
const SpecificationTable: React.FC<TechnicalSpecificationProps> = ({technicalSpecification}) => {
  return (
    <div className="w-[50%] flex justify-center items-center font-poppins">
      <table className="w-full rounded-2xl overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-[#483d73] text-white">
            <th className="p-1 border-r border-white text-base font-semibold text-center">{technicalSpecification?.tableHeadLeft}</th>
            <th className="p-1 text-base font-semibold text-center">{technicalSpecification?.tableHeadRight}</th>
          </tr>
        </thead>
        <tbody>
          {technicalSpecification?.TableData?.map((row, key) => (
            <tr key={key} className="group">
              {/* Left column (Feature) with a specific background color */}
              <td className="border-t border-gray-300 p-1 text-sm font-normal text-center bg-[#efecf8] group-hover:bg-[#bfb9d6] ">
                {row?.feature}
              </td>
              {/* Right column (Specification) with a different background color */}
              <td className="border-t p-1 text-sm font-regular text-center bg-white group-hover:bg-[#bfb9d6]">
                {row?.spec}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SpecificationTable;
