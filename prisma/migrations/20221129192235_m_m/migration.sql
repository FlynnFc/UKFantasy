/*
  Warnings:

  - You are about to drop the column `playerTeamId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PlayerTeam` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayerToPlayerTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PlayerToPlayerTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlayerToPlayerTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerTeam" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Image" TEXT NOT NULL,
    "Rareity" TEXT NOT NULL,
    "statsId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    CONSTRAINT "Player_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("Image", "Rareity", "id", "name", "price", "statsId") SELECT "Image", "Rareity", "id", "name", "price", "statsId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_PlayerTeam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "rolePoints" TEXT NOT NULL
);
INSERT INTO "new_PlayerTeam" ("id", "points", "rolePoints", "teamName") SELECT "id", "points", "rolePoints", "teamName" FROM "PlayerTeam";
DROP TABLE "PlayerTeam";
ALTER TABLE "new_PlayerTeam" RENAME TO "PlayerTeam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToPlayerTeam_AB_unique" ON "_PlayerToPlayerTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToPlayerTeam_B_index" ON "_PlayerToPlayerTeam"("B");
