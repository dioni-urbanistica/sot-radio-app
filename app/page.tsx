"use client"

import { Exo } from "next/font/google"
import { useEffect, useRef, useState } from "react"

const exo = Exo({
  subsets: ["latin"],
})

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [playing, setPlaying] = useState(false)
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    audioRef.current = new Audio(
      "https://a5.asurahosting.com:8450/radio.mp3"
    )
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "light") {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)

      try {
        const res = await fetch("/api/news")
        const data = await res.json()

        const fixedNews = data.slice(0, 3).map((item: any) => ({
          title: item.title,
          image: item.image,
          link: item.link || "https://sotpost.com",
        }))

        setNews(fixedNews)
      } catch (err) {
        console.log(err)
      }

      setLoading(false)
    }

    fetchNews()

    const interval = setInterval(() => {
      fetchNews()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const toggleRadio = async () => {
    const audio = audioRef.current

    if (!audio) return

    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main
      className={`${exo.className} min-h-screen flex justify-center transition-all duration-500 ${
        darkMode
          ? "bg-[#333333] text-white"
          : "bg-[#f3f3f3] text-[#222222]"
      }`}
    >
      <div className="w-full max-w-[420px] px-5 pt-6 pb-24">

        <div className="flex justify-end mb-4">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              darkMode
                ? "bg-[#45e9b5] text-[#333333]"
                : "bg-[#222222] text-white"
            }`}
          >
            {darkMode ? "☀️ Day" : "🌙 Night"}
          </button>

        </div>

        <div
          className={`rounded-[40px] border shadow-2xl px-6 py-8 transition-all duration-500 ${
            darkMode
              ? "bg-[#2f2f2f] border-white/10"
              : "bg-white border-black/10"
          }`}
        >

          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="SOT Radio"
              className="w-[200px] object-contain"
            />
          </div>

          <div className="relative flex items-center justify-center mt-20">

            {playing && (
              <>
                <div className="absolute w-[160px] h-[160px] rounded-full border border-[#45e9b5]/40 animate-ping" />
                <div className="absolute w-[205px] h-[205px] rounded-full border border-[#45e9b5]/20 animate-pulse" />
              </>
            )}

            <div className="absolute w-[145px] h-[145px] rounded-full border border-[#45e9b5]/50" />
            <div className="absolute w-[190px] h-[190px] rounded-full border border-[#45e9b5]/30" />

            <button
              onClick={toggleRadio}
              className="relative z-10 w-[95px] h-[95px] rounded-full bg-[#45e9b5] flex items-center justify-center shadow-[0_0_40px_rgba(69,233,181,0.4)] active:scale-95 transition-all"
            >
              {playing ? (
                <div className="flex gap-3">
                  <div className="w-3 h-10 rounded-full bg-[#333333]" />
                  <div className="w-3 h-10 rounded-full bg-[#333333]" />
                </div>
              ) : (
                <div
                  className="ml-2"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "18px solid transparent",
                    borderBottom: "18px solid transparent",
                    borderLeft: "28px solid #333333",
                  }}
                />
              )}
            </button>
          </div>

          <div className="mt-20 flex justify-center">
            <div
              className={`px-8 py-2 rounded-full text-sm font-semibold tracking-wide ${
                playing
                  ? "bg-[#45e9b5] text-[#333333]"
                  : darkMode
                  ? "bg-[#4a4a4a] text-zinc-300"
                  : "bg-[#e5e5e5] text-[#222222]"
              }`}
            >
              <div className="flex items-center gap-3">

                {playing && (
                  <div className="flex items-end gap-[3px] h-5">

                    <div className="w-1 h-3 bg-[#333333] rounded animate-bounce" />

                    <div
                      className="w-1 h-5 bg-[#333333] rounded animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />

                    <div
                      className="w-1 h-2 bg-[#333333] rounded animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />

                  </div>
                )}

                <span>
                  {playing ? "ON AIR" : "OFFLINE"}
                </span>

              </div>
            </div>
          </div>

        </div>

        <div className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-[32px] font-bold">
              Lajmet e Fundit
            </h2>

            <a
              href="https://sotpost.com"
              target="_blank"
              className="bg-[#45e9b5] px-4 py-1 rounded-full text-xs text-[#333333] font-semibold hover:scale-105 transition-all"
            >
              sotpost.com
            </a>

          </div>

          <div className="space-y-5">

            {loading && (
              <>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 animate-pulse border-b border-white/5 pb-5"
                  >

                    <div className="w-[92px] h-[92px] rounded-2xl bg-white/10" />

                    <div className="flex-1 flex flex-col justify-between py-1">

                      <div className="h-5 rounded bg-white/10 w-full" />
                      <div className="h-5 rounded bg-white/10 w-[80%]" />

                    </div>

                  </div>
                ))}
              </>
            )}

            {!loading && news.map((item, index) => (

              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex gap-4 transition-all border-b pb-5 hover:opacity-80 ${
                  darkMode
                    ? "border-white/5"
                    : "border-black/10"
                }`}
              >

                <img
                  src={item.image}
                  alt=""
                  className="w-[92px] h-[92px] rounded-2xl object-cover flex-shrink-0"
                />

                <div className="flex flex-col justify-between min-h-[92px]">

                  <h3 className="text-[20px] leading-[1.15] font-semibold line-clamp-2 max-w-[230px]">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between">

                    <span className="text-[#45e9b5] text-xs font-semibold">
                      📖 Lexo lajmin
                    </span>

                    <div className="flex items-center gap-2">

                      <img
                        src="/sotpost.png"
                        alt="SOT Post"
                        className="w-5 h-5 rounded-full object-cover"
                      />

                      <span
                        className={`text-xs font-medium ${
                          darkMode
                            ? "text-zinc-400"
                            : "text-zinc-600"
                        }`}
                      >
                        SOT Post
                      </span>

                    </div>

                  </div>

                </div>

              </a>

            ))}

          </div>

          <div className="mt-10 flex items-center justify-center gap-5">

            {[
              {
                href: "https://www.instagram.com/sot_post",
                icon: "/instagram.png",
                alt: "Instagram",
              },
              {
                href: "https://www.facebook.com/people/SOT-Post/61580409317113/",
                icon: "/facebook.png",
                alt: "Facebook",
              },
              {
                href: "https://www.tiktok.com/@sotpost_",
                icon: "/tiktok.png",
                alt: "TikTok",
              },
              {
                href: "https://www.youtube.com/@sotpost",
                icon: "/youtube.png",
                alt: "YouTube",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                className={`w-12 h-12 rounded-full border flex items-center justify-center hover:scale-110 transition-all ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                }`}
              >
                <img
                  src={social.icon}
                  alt={social.alt}
                  className="w-6 h-6"
                />
              </a>
            ))}

          </div>

          <div
            className={`mt-8 text-center text-xs ${
              darkMode
                ? "text-zinc-500"
                : "text-zinc-600"
            }`}
          >
            SOT Radio v1.0
          </div>

          <div
            className={`mt-2 text-center text-[11px] ${
              darkMode
                ? "text-zinc-600"
                : "text-zinc-500"
            }`}
          >
            All rights are reserved — 2026 SOT Post
          </div>

          <div className="mt-2 text-center">
            <a
              href="https://sotpost.com/?page_id=3"
              target="_blank"
              className="text-[11px] text-[#45e9b5] hover:underline"
            >
              Privacy Policy
            </a>
          </div>

        </div>

      </div>
    </main>
  )
}