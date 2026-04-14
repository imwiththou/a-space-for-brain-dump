import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import FigureWithCaption from "./FigureWithCaption"

const components = {
  Image,
  FigureWithCaption,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx-content">
      <Component components={components} />
    </div>
  )
}
