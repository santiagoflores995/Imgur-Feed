/* Core */
import { NextResponse } from 'next/server'
import { ImgurGallery } from '../imgur/route'
const baseUrl = process.env.IMGUR_BASE_URL ?? 'https://api.imgur.com'
const clientId = process.env.IMGUR_CLIENT_ID ?? '56ed96c90e028bd'

interface ImgurImageResponse {
  data: ImgurGallery
}

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams

  const galleryHash = query.get('galleryHash')
  const isAlbum = query.get('isAlbum')

  if (galleryHash === null || isAlbum === null) {
    return NextResponse.redirect(new URL('/404', req.url))
  }

  const url = `${baseUrl}/3/gallery/${
    isAlbum === 'true' ? 'album' : 'image'
  }/${galleryHash}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Client-ID ${clientId}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json() as Promise<ImgurImageResponse>)

  return NextResponse.json({ data: response.data })
}
