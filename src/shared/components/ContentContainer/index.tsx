import React from 'react';

const ContentContainer = ({
  title,
  mainClass,
  children,
}: {
  title: string;
  mainClass: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`content ${mainClass}`}>
      <div className="content__title  text-style-title">{title}</div>
      {children}
    </div>
  );
};

export default ContentContainer;
