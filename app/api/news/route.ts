import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function GET() {
try {
const response = await fetch("https://sotpost.com", {
next: {
revalidate: 300,
},
})


const html = await response.text()

const $ = cheerio.load(html)

const articles: any[] = []

$("article").each((index, element) => {
  const title =
    $(element).find("h2").first().text().trim() ||
    $(element).find("h3").first().text().trim()

  const image =
    $(element).find("img").attr("src") ||
    $(element).find("img").attr("data-src") ||
    ""

  const link =
    $(element).find("a").first().attr("href") ||
    "https://sotpost.com"

  let time = ""

  const datetime =
    $(element).find("time").attr("datetime")

  if (datetime) {
    const date = new Date(datetime)

    time = date.toLocaleTimeString("sq-AL", {
      hour: "2-digit",
      minute: "2-digit",
    })
  } else {
    time =
      $(element).find(".jeg_meta_date").text().trim() ||
      $(element).find(".entry-date").text().trim() ||
      $(element).find("time").text().trim()
  }

  if (
    title &&
    image &&
    title.length > 10
  ) {
    articles.push({
      title,
      image,
      time,
      read: "1 min lexim",
      link,
    })
  }
})

return NextResponse.json(articles.slice(0, 3))


} catch (error) {
console.log(error)

return NextResponse.json([])


}
}
