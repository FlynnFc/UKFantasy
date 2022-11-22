/*
  Warnings:

  - You are about to drop the `_PlayerToPlayerTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_PlayerToPlayerTeam_B_index";

-- DropIndex
DROP INDEX "_PlayerToPlayerTeam_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlayerToPlayerTeam";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerTeam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    "points" TEXT NOT NULL,
    "rolePoints" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playerId" TEXT,
    CONSTRAINT "PlayerTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlayerTeam" ("id", "points", "rolePoints", "teamName", "userId") SELECT "id", "points", "rolePoints", "teamName", "userId" FROM "PlayerTeam";
DROP TABLE "PlayerTeam";
ALTER TABLE "new_PlayerTeam" RENAME TO "PlayerTeam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
