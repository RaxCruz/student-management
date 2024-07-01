-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
