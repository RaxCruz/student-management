/*
  Warnings:

  - Added the required column `img_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "phone_1" TEXT NOT NULL,
    "phone_2" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "emergency_phone" TEXT NOT NULL,
    "emergency_contact" TEXT NOT NULL,
    "residence_addr" TEXT NOT NULL,
    "mailing_addr" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "emergency_contact", "emergency_phone", "id", "mailing_addr", "mobile", "person_id", "phone_1", "phone_2", "residence_addr", "student_id") SELECT "email", "emergency_contact", "emergency_phone", "id", "mailing_addr", "mobile", "person_id", "phone_1", "phone_2", "residence_addr", "student_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
