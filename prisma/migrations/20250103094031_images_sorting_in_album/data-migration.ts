import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async (tx) => {
    const images = await tx.images.findMany()
    for (const image of images) {
      if (image?.exif?.data_time) {
        await tx.images.update({
          where: { id: image.id },
          data: {
            exif_data_time: dayjs(image.exif.data_time, 'YYYY:MM:DD HH:mm:ss').toDate(),
          },
        })
      }
    }
  })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
