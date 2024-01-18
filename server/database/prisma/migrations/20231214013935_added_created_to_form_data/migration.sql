-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormDataConsultancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fee_string" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "forum" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "referal" TEXT,
    "agreement" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FormDataConsultancy" ("agreement", "duration", "email", "fee_string", "forum", "id", "referal", "username") SELECT "agreement", "duration", "email", "fee_string", "forum", "id", "referal", "username" FROM "FormDataConsultancy";
DROP TABLE "FormDataConsultancy";
ALTER TABLE "new_FormDataConsultancy" RENAME TO "FormDataConsultancy";
CREATE TABLE "new_FormDataAuthors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fee_string" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authorships" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "subject" TEXT,
    "agreement" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FormDataAuthors" ("agreement", "authorships", "email", "fee_string", "id", "intent", "subject", "website") SELECT "agreement", "authorships", "email", "fee_string", "id", "intent", "subject", "website" FROM "FormDataAuthors";
DROP TABLE "FormDataAuthors";
ALTER TABLE "new_FormDataAuthors" RENAME TO "FormDataAuthors";
CREATE TABLE "new_FormDataSupport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FormDataSupport" ("email", "id", "message", "name", "subject") SELECT "email", "id", "message", "name", "subject" FROM "FormDataSupport";
DROP TABLE "FormDataSupport";
ALTER TABLE "new_FormDataSupport" RENAME TO "FormDataSupport";
CREATE TABLE "new_FormDataCoaching" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fee_string" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "forum" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "referal" TEXT,
    "agreement" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FormDataCoaching" ("agreement", "duration", "email", "fee_string", "forum", "id", "referal", "username") SELECT "agreement", "duration", "email", "fee_string", "forum", "id", "referal", "username" FROM "FormDataCoaching";
DROP TABLE "FormDataCoaching";
ALTER TABLE "new_FormDataCoaching" RENAME TO "FormDataCoaching";
CREATE TABLE "new_FormDataCheckout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "copy" TEXT NOT NULL DEFAULT 'physical',
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FormDataCheckout" ("address", "copy", "country", "email", "id", "name", "price", "state", "surname", "title", "zip") SELECT "address", "copy", "country", "email", "id", "name", "price", "state", "surname", "title", "zip" FROM "FormDataCheckout";
DROP TABLE "FormDataCheckout";
ALTER TABLE "new_FormDataCheckout" RENAME TO "FormDataCheckout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
