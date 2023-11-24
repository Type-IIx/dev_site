/*
  Warnings:

  - You are about to drop the column `agreemment` on the `FormDataCoaching` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormDataCoaching" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fee_string" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "forum" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "referal" TEXT,
    "agreement" TEXT
);
INSERT INTO "new_FormDataCoaching" ("duration", "email", "fee_string", "forum", "id", "referal", "username") SELECT "duration", "email", "fee_string", "forum", "id", "referal", "username" FROM "FormDataCoaching";
DROP TABLE "FormDataCoaching";
ALTER TABLE "new_FormDataCoaching" RENAME TO "FormDataCoaching";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
