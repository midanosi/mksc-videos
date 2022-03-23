-- CreateTable
CREATE TABLE "mkscvids" (
    "cid" INTEGER NOT NULL,
    "time" DECIMAL NOT NULL,
    "link" TEXT NOT NULL,
    "mode" INTEGER NOT NULL,
    "player" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mkscytnames" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mkscvids_link_key" ON "mkscvids"("link");

-- CreateIndex
CREATE UNIQUE INDEX "mkscytnames_id_key" ON "mkscytnames"("id");
