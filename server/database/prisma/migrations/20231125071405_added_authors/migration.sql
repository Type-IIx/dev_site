/*
  Warnings:

  - You are about to drop the column `scope` on the `FormDataAuthors` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormDataAuthors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fee_string" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authorships" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "subject" TEXT,
    "agreement" TEXT
);
INSERT INTO "new_FormDataAuthors" ("agreement", "authorships", "email", "fee_string", "id", "intent", "website") SELECT "agreement", "authorships", "email", "fee_string", "id", "intent", "website" FROM "FormDataAuthors";
DROP TABLE "FormDataAuthors";
ALTER TABLE "new_FormDataAuthors" RENAME TO "FormDataAuthors";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
