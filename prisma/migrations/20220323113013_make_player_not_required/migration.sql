-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mkscvids" (
    "cid" INTEGER NOT NULL,
    "time" DECIMAL NOT NULL,
    "link" TEXT NOT NULL,
    "mode" INTEGER NOT NULL,
    "player" TEXT
);
INSERT INTO "new_mkscvids" ("cid", "link", "mode", "player", "time") SELECT "cid", "link", "mode", "player", "time" FROM "mkscvids";
DROP TABLE "mkscvids";
ALTER TABLE "new_mkscvids" RENAME TO "mkscvids";
CREATE UNIQUE INDEX "mkscvids_link_key" ON "mkscvids"("link");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
