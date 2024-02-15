// ScrapeData.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TablePage } from '../pages/TablePage';
import { processRows } from '../helpers/processRows';
import { extractEmail } from '../helpers/extractEmail';
import { waitForRowProcessing, navigateToNextPage } from '../helpers/navigation';
import { writeToCSV } from '../helpers/csv';

test('Scrape Apollo Data', async ({ page }) => {  
  // Step 1: Login
  const loginPage = new LoginPage(page);
  await loginPage.login();

  // Step 2: Wait for table to be present
  const tablePage = new TablePage(page);
  await tablePage.waitForTable();
  
  // Step 3: Process table rows and collect email list
  const emailList = [];
  let pageNumber = 1;

  while (true) {
    // Step 4: Get rows from the table
    const rows = await tablePage.getRows(); 
    await processRows(page, rows, emailList, extractEmail, waitForRowProcessing);

    // Step 5: Append data list to CSV
    writeToCSV(emailList);
    
    // Step 6: Navigate to next page
    const nextPageExists = await navigateToNextPage(page, pageNumber);
    if (!nextPageExists) {
      console.log("No more pages to navigate to.");
      break;
    }

    pageNumber++;
  }
});
