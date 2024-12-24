import React from "react";
import BlurImage from "../ui/BlurImage";

type ImageBlockProps = {
  content: { src: string; alt: string };
};

const ImageBlock: React.FC<ImageBlockProps> = ({ content }) => {
  return (
    <div className="my-8">
      <BlurImage
        src={content.src}
        alt={content.alt}
        width={800}
        height={400}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default ImageBlock;
