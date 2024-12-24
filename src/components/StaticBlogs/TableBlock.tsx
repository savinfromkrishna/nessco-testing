import React from 'react';

type CompactElegantTableProps = {
  content: string[][];
};

const CompactElegantTable: React.FC<CompactElegantTableProps> = ({ content }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 bg-white text-sm">
        <thead>
          <tr className="bg-gray-100">
            {content[0].map((header, index) => (
              <th 
                key={index} 
                className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className="border border-gray-300 px-3 py-2 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompactElegantTable;

