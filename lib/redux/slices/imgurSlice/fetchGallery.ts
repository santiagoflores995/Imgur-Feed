import { ImgurGallery } from '@/app/api/imgur/route'

export const fetchGallery = async (
  id: string,
  isAlbum: boolean
): Promise<{ data: ImgurGallery }> => {
  const url = `/api/details?galleryHash=${id}&isAlbum=${isAlbum}`
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()
  return result
}
