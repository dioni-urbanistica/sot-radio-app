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

useEffect(() => {
audioRef.current = new Audio(
"https://a5.asurahosting.com:8450/radio.mp3"
)
}, [])

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
    setLoading(false)
  } catch (err) {
    console.log(err)
  }
}

fetchNews()
const interval = setInterval(() => {
fetchNews()
}, 60000)

return () => clearInterval(interval)



}, [])

const toggleRadio = async () => {
if (!audioRef.current) return


try {
  if (playing) {
    audioRef.current.pause()
    setPlaying(false)
  } else {
    await audioRef.current.play()
    setPlaying(true)
  }
} catch (err) {
  console.log(err)
}


}

return (
<main
className={`${exo.className} min-h-screen bg-[#333333] text-white flex justify-center`}
> <div className="w-full max-w-[420px] px-5 pt-6 pb-24">


    <div className="rounded-[40px] bg-[#2f2f2f] border border-white/10 shadow-2xl px-6 py-8">

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
              : "bg-[#4a4a4a] text-zinc-300"
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

                  <div className="flex justify-between items-center mt-3">
                    <div className="h-4 rounded bg-white/10 w-24" />
                    <div className="h-4 rounded bg-white/10 w-16" />
                  </div>
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
            className="flex gap-4 hover:opacity-80 transition-all border-b border-white/5 pb-5"
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

                  <span className="text-zinc-400 text-xs font-medium">
                    SOT Post
                  </span>

                </div>

              </div>

            </div>

          </a>

        ))}

      </div>

      <div className="mt-10 flex items-center justify-center gap-5">

        <a
          href="https://www.instagram.com/sot_post"
          target="_blank"
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-all"
        >
          <img
            src="/instagram.png"
            alt="Instagram"
            className="w-6 h-6"
          />
        </a>

        <a
          href="https://www.facebook.com/people/SOT-Post/61580409317113/"
          target="_blank"
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-all"
        >
          <img
            src="/facebook.png"
            alt="Facebook"
            className="w-6 h-6"
          />
        </a>

        <a
          href="https://www.tiktok.com/@sotpost_"
          target="_blank"
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-all"
        >
          <img
            src="/tiktok.png"
            alt="TikTok"
            className="w-6 h-6"
          />
        </a>

        <a
          href="https://www.youtube.com/@sotpost"
          target="_blank"
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition-all"
        >
          <img
            src="/youtube.png"
            alt="YouTube"
            className="w-6 h-6"
          />
        </a>

      </div>

    </div>
  </div>
</main>


)
}
