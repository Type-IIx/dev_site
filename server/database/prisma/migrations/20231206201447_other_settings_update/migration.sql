-- CreateTable
CREATE TABLE "Forum" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OtherSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "call" TEXT NOT NULL,
    "coaching" TEXT NOT NULL DEFAULT '',
    "authors" TEXT NOT NULL DEFAULT '',
    "consultancy" TEXT NOT NULL DEFAULT ''
);
