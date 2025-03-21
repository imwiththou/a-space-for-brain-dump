import React from 'react';

interface FigureWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
}

const FigureWithCaption: React.FC<FigureWithCaptionProps> = ({ src, alt, caption }) => {
  return (
    <div className="figure-container">
      <figure className="rounded-md bg-transparent dark:bg-transparent">
        <img className="rounded-md shadow-xl" src={src} alt={alt} />
        <figcaption
          className="pt-1 text-left text-xs w-full bg-transparent dark:bg-transparent"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      </figure>
    </div>
  );
};

export default FigureWithCaption;