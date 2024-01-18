-- CreateTable
CREATE TABLE "FormDataAuthors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fee_string" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authorships" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "scope" TEXT,
    "agreement" TEXT
);
