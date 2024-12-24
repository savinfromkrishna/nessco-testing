import React from "react";

const Pillar: React.FC = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="#3a2a79"
        width="30px"
        height="30px"
      >
        <rect
          x="10"
          y="10"
          width="44"
          height="8"
          rx="5"
          ry="5"
          fill="#3a2a79"
        />
        <rect x="16" y="18" width="8" height="36" fill="#3a2a79" />
        <rect x="28" y="18" width="8" height="36" fill="#3a2a79" />
        <rect x="40" y="18" width="8" height="36" fill="#3a2a79" />
      </svg>
    </div>
  );
};

export default Pillar;
