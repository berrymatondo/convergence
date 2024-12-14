-- AddForeignKey
ALTER TABLE "staticInfoBond" ADD CONSTRAINT "staticInfoBond_marketOfIssueId_fkey" FOREIGN KEY ("marketOfIssueId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
