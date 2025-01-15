const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async (tx) => {
    const images = await tx.images.findMany()
    for (const image of images) {
      const exifModel = typeof image.exif.model === 'string' ? image.exif.model.trim() : ''
      await tx.images.update({
        where: { id: image.id },
        data: {
          exif: {
            ...image.exif,
            focal_length_in_35mm_film: exifModel === 'RICOH GR III' ? '28 mm' : '',
          },
        },
      })
    }
  })
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
