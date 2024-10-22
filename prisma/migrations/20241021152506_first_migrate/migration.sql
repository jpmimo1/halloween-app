-- CreateTable
CREATE TABLE "guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "photo_costume_url" TEXT NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "costume" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costume_promp" TEXT NOT NULL,
    "background_promp" TEXT NOT NULL,
    "additional_promp" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "costume_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "costume" ADD CONSTRAINT "costume_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
