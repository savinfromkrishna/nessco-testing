import React from 'react';
type VideoBlockProps = {
    content: { src: string};
  };
  
  const VideoBlock: React.FC<VideoBlockProps> = ({ content }) => {
    return (
      <div className="my-8">
        <video
          src={content.src}
          controls
          width={800}
          height={400}
          className="rounded-lg shadow-md"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoBlock;
  

