"use client"

import { useEffect, useMemo, useState } from "react"

const SINGAPORE_TIME_ZONE = "Asia/Singapore"
const SINGAPORE_UTC_OFFSET_HOURS = 8

function getReaderOffsetHours() {
  return -new Date().getTimezoneOffset() / 60
}

function formatHourDifference(hours: number) {
  const absoluteHours = Math.abs(hours)

  if (Number.isInteger(absoluteHours)) {
    return absoluteHours.toString()
  }

  return absoluteHours.toFixed(1)
}

function getOffsetCopy(readerOffsetHours: number) {
  const hourDifference = readerOffsetHours - SINGAPORE_UTC_OFFSET_HOURS

  if (hourDifference === 0) {
    return "you are in the same timezone with me"
  }

  const direction = hourDifference > 0 ? "ahead of" : "behind"
  const hourLabel = Math.abs(hourDifference) === 1 ? "hour" : "hours"

  return `you are ${formatHourDifference(hourDifference)} ${hourLabel} ${direction} me`
}

export default function SingaporeTime() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const singaporeTime = useMemo(() => {
    if (!now) {
      return "--:--:--"
    }

    return new Intl.DateTimeFormat("en-SG", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: SINGAPORE_TIME_ZONE,
      timeZoneName: "short",
    }).format(now)
  }, [now])

  const readerOffsetCopy = useMemo(() => {
    if (!now) {
      return "calculating how far you are from me"
    }

    return getOffsetCopy(getReaderOffsetHours())
  }, [now])

  return (
    <section className="not-prose my-10 border-y border-zinc-200 py-6 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100">
      <p className="m-0 text-sm uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
        Singapore time
      </p>
      <p className="mt-3 mb-2 font-mono text-3xl font-semibold leading-tight">
        {singaporeTime}
      </p>
      <p className="m-0 text-base text-zinc-600 dark:text-zinc-300">
        {readerOffsetCopy}
      </p>
    </section>
  )
}
