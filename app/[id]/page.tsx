import { Gallery } from "../components/Gallery/Gallery"

export default function Page({ params }: { params: { slug: string } }) {
  return <Gallery />
}
