import React from 'react';
import { Tag } from './types/blogs';

type TagListProps = {
  tags: Tag[];
};

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <span
          key={tag.id}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
        >
          {tag?.name}
        </span>
      ))}
    </div>
  );
};

export default TagList;

