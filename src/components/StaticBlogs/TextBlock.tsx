import React from 'react';
import { ContentBlock } from './types/blogs';

type TextBlockProps = {
  block: ContentBlock;
};

const TextBlock: React.FC<TextBlockProps> = ({ block }) => {
  if (block.type !== 'text' || typeof block.content !== 'string') {
    console.error('Invalid block type or content for TextBlock');
    return null;
  }

  return (
    <div className="mb-4">
      {block.heading && (
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{block.heading}</h3>
      )}
      {block.subheading && (
        <h4 className='text-base font-regular text-gray-700 leading-relaxed'>
          {block.subheading}
        </h4>
      )}
      <p className="text-gray-700 leading-relaxed">{block.content}</p>
    </div>
  );
};

export default TextBlock;

