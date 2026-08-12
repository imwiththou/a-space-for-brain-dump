"use client"

import { useEffect, useState } from "react"

export function PageSize() {
  const [size, setSize] = useState<string | null>(null)

  useEffect(() => {
    const htmlSize = new TextEncoder().encode(document.documentElement.outerHTML).length
    const sizeInKiB = (htmlSize / 1024).toFixed(2)
    setSize(sizeInKiB)
  }, [])

  if (!size) return null

  return (
    <span>
      {" ♻"}Page size: {size} KiB
    </span>
  )
}
