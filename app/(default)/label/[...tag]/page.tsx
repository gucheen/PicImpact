import Masonry from '~/components/Masonry'
import { fetchClientImagesListByTag, fetchClientImagesPageTotalByTag } from '~/server/db/query'
import { ImageHandleProps } from '~/types'

export default function Label({ params }: { params: { tag: string } }) {
  const getData = async (pageNum: number, tag: string) => {
    'use server'
    return await fetchClientImagesListByTag(pageNum, tag)
  }

  const getPageTotal = async (tag: string) => {
    'use server'
    return await fetchClientImagesPageTotalByTag(tag)
  }

  const props: ImageHandleProps = {
    handle: getData,
    args: `getImages-client-label`,
    album: `${decodeURIComponent(params.tag)}`,
    totalHandle: getPageTotal
  }

  return (
    <Masonry {...props} />
  )
}