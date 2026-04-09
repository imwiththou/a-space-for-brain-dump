"use client"

import { useEffect, useState } from "react"

export function PageSize() {
  const [size, setSize] = useState<string | null>(null)

  useEffect(() => {
    // Calculate the size of the current HTML document
    const htmlSize = new Blob([document.documentElement.outerHTML]).size
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
