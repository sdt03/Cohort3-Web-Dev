-- CreateTable
CREATE TABLE "Travel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "destinaitonCountry" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
