interface FigureWithCaptionProps {
  src: string
  alt: string
  caption: string
}

export default function FigureWithCaption({ src, alt, caption }: FigureWithCaptionProps) {
  return (
    <div className="figure-container">
      <figure className="rounded-md bg-transparent dark:bg-transparent">
        <img
          className="rounded-md shadow-xl"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption
          className="pt-1 pb-4 text-left text-xs w-full bg-transparent dark:bg-transparent"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      </figure>
    </div>
  )
}
