-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Image" TEXT NOT NULL,
    "Rareity" TEXT NOT NULL,
    "statsId" TEXT NOT NULL,
    CONSTRAINT "Player_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hltv" TEXT NOT NULL,
    "faceitElo" INTEGER NOT NULL,
    "HS" INTEGER NOT NULL,
    "EntryRounds" INTEGER NOT NULL,
    "ClutchRounds" INTEGER NOT NULL,
    "link" TEXT NOT NULL
);
