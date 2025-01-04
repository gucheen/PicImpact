-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "image_sorting" SMALLINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "exif_data_time" TIMESTAMP;
