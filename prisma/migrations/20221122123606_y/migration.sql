/*
  Warnings:

  - You are about to drop the column `playerId` on the `PlayerTeam` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "Image" TEXT NOT NULL,
    "Rareity" TEXT NOT NULL,
    "statsId" TEXT NOT NULL,
    "playerTeamId" TEXT,
    CONSTRAINT "Player_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_playerTeamId_fkey" FOREIGN KEY ("playerTeamId") REFERENCES "PlayerTeam" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("Image", "Rareity", "id", "name", "price", "statsId") SELECT "Image", "Rareity", "id", "name", "price", "statsId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_PlayerTeam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "rolePoints" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "PlayerTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlayerTeam" ("id", "points", "rolePoints", "teamName", "userId") SELECT "id", "points", "rolePoints", "teamName", "userId" FROM "PlayerTeam";
DROP TABLE "PlayerTeam";
ALTER TABLE "new_PlayerTeam" RENAME TO "PlayerTeam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
