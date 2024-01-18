-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "ImageFilename" TEXT NOT NULL DEFAULT '',
    "ImagephysicalPath" TEXT NOT NULL DEFAULT '',
    "ImageUrl" TEXT NOT NULL DEFAULT '',
    "BookFilename" TEXT NOT NULL DEFAULT '',
    "BookphysicalPath" TEXT NOT NULL DEFAULT '',
    "BookUrl" TEXT NOT NULL DEFAULT '',
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Book" ("BookFilename", "BookUrl", "BookphysicalPath", "ImageFilename", "ImageUrl", "ImagephysicalPath", "created", "id", "price", "title") SELECT "BookFilename", "BookUrl", "BookphysicalPath", "ImageFilename", "ImageUrl", "ImagephysicalPath", "created", "id", "price", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
