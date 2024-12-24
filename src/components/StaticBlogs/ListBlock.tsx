import React from 'react';
import { ListContent, ListFormat, ListItem } from './types/blogs';

type ListBlockProps = {
  content: ListContent;
  level?: number;
};

const ListBlock: React.FC<ListBlockProps> = ({ content, level = 0 }) => {
  const { format, items } = content;

  const getListStyle = (format: ListFormat, level: number) => {
    // Handle nested list styles
    if (format === 'number') return 'list-decimal';
    if (level === 2) return 'list-square';
    return 'list-disc';
  };

  const getIndentClass = (level: number) => {
    const baseIndent = 'pl-8';
    const nestedIndent = level > 0 ? 'pl-10' : '';
    return `${baseIndent} ${nestedIndent}`;
  };

  const renderListItem = (item: string | ListItem, index: number) => {
    if (typeof item === 'string') {
      return <li key={index} className="mb-2">{item}</li>;
    } else {
      return (
        <li key={index} className="mb-2">
          {item.text}
          {item.subItems && (
            <ListBlock 
              content={item.subItems} 
              level={level + 1}
            />
          )}
        </li>
      );
    }
  };

  return (
    <ul className={`${getListStyle(format, level)} ${getIndentClass(level)} mb-2`}>
      {items.map((item, index) => renderListItem(item, index))}
    </ul>
  );
};

export default ListBlock;

