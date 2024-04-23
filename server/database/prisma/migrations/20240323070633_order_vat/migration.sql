-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormDataCheckout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "vat" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL DEFAULT 0,
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
INSERT INTO "new_FormDataCheckout" ("address", "copy", "country", "created", "email", "id", "name", "price", "state", "surname", "title", "zip") SELECT "address", "copy", "country", "created", "email", "id", "name", "price", "state", "surname", "title", "zip" FROM "FormDataCheckout";
DROP TABLE "FormDataCheckout";
ALTER TABLE "new_FormDataCheckout" RENAME TO "FormDataCheckout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
