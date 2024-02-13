import { test } from '@playwright/test';
import fs from 'fs';
const { login } = require('../helpers/login.js');
const { extractNameFromRow } = require('../helpers/name');
const { processRows } = require('../helpers/processRows');
const { extractEmailFromButton, extractEmailFromIcon, removeEmailOverlay } = require('../helpers/extractEmail');
const { waitForRowProcessing, navigateToNextPage } = require('../helpers/navigation');

test('Access email buttons functionality', async ({ page }) => {
  await page.goto('https://app.apollo.io/#/people?finderViewId=5b8050d050a3893c382e9360&page=1&personLocations[]=Ireland&contactEmailStatus[]=verified&organizationNumEmployeesRanges[]=201%2C500&organizationNumEmployeesRanges[]=501%2C1000&organizationIndustryTagIds[]=55718f947369642142b84a12&organizationIndustryTagIds[]=5567cdd97369645624020000&qPersonName=John%20Doherty');
  await login(page);

  let totalPagesNavigated = 0;
  const emailList = [];

  while (totalPagesNavigated < 5) {
    await page.waitForSelector('.zp_RFed0', { visible: true });
    const rows = await page.$$('.zp_RFed0 tr');

    await processRows(page, rows, emailList, extractEmailFromButton, extractEmailFromIcon, removeEmailOverlay, extractNameFromRow, waitForRowProcessing);

    const hasNextPage = await navigateToNextPage(page);
    if (!hasNextPage) {
      console.log("No more pages to navigate to.");
      break; // No more pages to navigate to
    }
    
    totalPagesNavigated++;
  }

  // Write email list to CSV
  const csvData = emailList.join('\n');
  fs.appendFileSync('email_list.csv', csvData + '\n');
});
