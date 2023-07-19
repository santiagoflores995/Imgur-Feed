/* Core */
import { NextResponse } from 'next/server'
const baseUrl = "https://api.imgur.com"
const clientId = "56ed96c90e028bd"

export interface GalleryResponse {
  data: ImgurGallery[]
}

export interface ImgurGallery {
  id: string,
  title: string,
  description: string
  ups: number,
  downs: number,
  score: number,
  link: string,
  is_album: boolean,
  width?: number,
  height?: number,
  type?: string
  images?: [
    {
      id: string,
      title: string, 
      description: string
      width: number,
      height: number,
      link: string,
      animated: boolean
      type: string
    }
  ]
}

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams

  const window = query.get("window") || "day"
  const section = query.get("section") || "hot"
  const sort = query.get("sort") || "top"
  const page = query.get("page") || 1
  const showViral = query.get("showViral") || "true"
  
  const url = `${baseUrl}/3/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${clientId}`,
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json() as Promise<GalleryResponse>)
  const slice = response.data.filter((gallery) => gallery.images !== undefined)
  const result = slice.map((gallery) => {
    const cover = gallery.images == undefined
      ? {
        link: gallery.link,
        height: gallery.height,
        width: gallery.width,
        type: gallery.type,
      }
    : {
      link: gallery.images[0].link,
      height: gallery.images[0].height,
      width: gallery.images[0].width,
      type: gallery.images[0].type
    }
    return {
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      redirectLink: gallery.link,
      isAlbum: gallery.is_album,
      cover,
    }
  })

  return NextResponse.json({data: result})
}
