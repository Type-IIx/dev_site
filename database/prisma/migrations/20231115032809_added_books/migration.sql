-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL DEFAULT 0,
    "ImageFilename" TEXT NOT NULL DEFAULT '',
    "ImagephysicalPath" TEXT NOT NULL DEFAULT '',
    "ImageUrl" TEXT NOT NULL DEFAULT '',
    "BookFilename" TEXT NOT NULL DEFAULT '',
    "BookphysicalPath" TEXT NOT NULL DEFAULT '',
    "BookUrl" TEXT NOT NULL DEFAULT '',
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
