import { FeedGallery } from '@/lib/redux/slices/imgurSlice'

export const fetchImages = async (
  window: string,
  page: number,
  section: string,
  sort: string,
  showViral: boolean
): Promise<{ data: FeedGallery[] }> => {
  const url = `/api/imgur?window=${window}&page=${page}&section=${section}&sort=${sort}&showViral=${showViral}`
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()
  return result
}
