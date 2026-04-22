"use client"

import { useEffect, useRef, useState } from "react"

interface AudioPlayerProps {
  src: string
  label?: string
}

export default function AudioPlayer({ src, label = "Audio track" }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const frameRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveform, setWaveform] = useState<number[]>(Array(12).fill(0.18))

  function stopVisualization() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    setWaveform(Array(12).fill(0.18))
  }

  async function startVisualization() {
    const audio = audioRef.current

    if (!audio) return

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    const audioContext = audioContextRef.current

    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }

    if (!analyserRef.current) {
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 64
      analyser.smoothingTimeConstant = 0.8
      analyserRef.current = analyser
    }

    if (!sourceRef.current) {
      sourceRef.current = audioContext.createMediaElementSource(audio)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContext.destination)
    }

    const analyser = analyserRef.current
    const data = new Uint8Array(analyser.frequencyBinCount)

    const updateWaveform = () => {
      analyser.getByteFrequencyData(data)

      const step = Math.max(1, Math.floor(data.length / 12))
      const nextWaveform = Array.from({ length: 12 }, (_, index) => {
        const slice = data.slice(index * step, (index + 1) * step)
        const average =
          slice.reduce((sum, value) => sum + value, 0) / Math.max(1, slice.length)

        return Math.max(0.12, average / 255)
      })

      setWaveform(nextWaveform)
      frameRef.current = requestAnimationFrame(updateWaveform)
    }

    stopVisualization()
    updateWaveform()
  }

  async function togglePlayback() {
    const audio = audioRef.current

    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
        await startVisualization()
      } catch (error) {
        console.error("Unable to start audio playback.", error)
      }
      return
    }

    audio.pause()
  }

  useEffect(() => {
    return () => {
      stopVisualization()

      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        void audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <div className="not-prose my-4 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex min-h-[40px] items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
        >
          <span aria-hidden="true" className="flex h-full w-full items-center justify-center text-sm leading-none">
            {isPlaying ? "❚❚" : "▶"}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <p className="m-0 text-sm font-medium text-black dark:text-white">{label}</p>
          <p className="m-0 text-xs text-black/65 dark:text-white/65">
            {isPlaying ? "Now playing" : "Ready to play"}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="flex h-5 w-[68px] shrink-0 items-end justify-end gap-1"
        >
          {waveform.map((bar, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-black/80 transition-[height,opacity] duration-150 dark:bg-white/80"
              style={{
                height: `${Math.max(3, Math.round(bar * 20))}px`,
                opacity: isPlaying ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          setIsPlaying(false)
          stopVisualization()
        }}
        onEnded={() => {
          setIsPlaying(false)
          stopVisualization()
        }}
      />
    </div>
  )
}
