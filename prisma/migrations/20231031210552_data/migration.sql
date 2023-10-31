-- CreateTable
CREATE TABLE "Data" (
    "userEmail" STRING NOT NULL,
    "main" JSONB,
    "event" STRING,
    "research" STRING,
    "fleet" STRING
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_userEmail_key" ON "Data"("userEmail");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
