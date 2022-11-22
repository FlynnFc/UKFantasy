/*
  Warnings:

  - You are about to drop the column `playerId` on the `PlayerTeam` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_PlayerToPlayerTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PlayerToPlayerTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlayerToPlayerTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerTeam" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToPlayerTeam_AB_unique" ON "_PlayerToPlayerTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToPlayerTeam_B_index" ON "_PlayerToPlayerTeam"("B");
