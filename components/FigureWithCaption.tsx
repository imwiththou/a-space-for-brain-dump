import React from 'react';

interface FigureWithCaptionProps {
  src: string;
  alt: string;
  caption: string;
}

const FigureWithCaption: React.FC<FigureWithCaptionProps> = ({ src, alt, caption }) => {
  return (
    <div className="md:container md:mx-auto box-border p-8 border-0 bg-transparent dark:bg-transparent">
      <figure className="rounded-md bg-transparent dark:bg-transparent">
        <img className="rounded-md shadow-2xl" src={src} alt={alt} />
        <figcaption className="pt-1 text-left text-xs w-full bg-transparent dark:bg-transparent">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
};

export default FigureWithCaption;