-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Testimonials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "filename" TEXT NOT NULL DEFAULT '',
    "physicalPath" TEXT NOT NULL DEFAULT '',
    "fileUrl" TEXT NOT NULL DEFAULT '',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Testimonials" ("content", "date", "id", "name", "rating") SELECT "content", "date", "id", "name", "rating" FROM "Testimonials";
DROP TABLE "Testimonials";
ALTER TABLE "new_Testimonials" RENAME TO "Testimonials";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
