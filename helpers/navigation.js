// helpers/navigation.js

// Wait for a specified duration before processing the next row.
async function waitForRowProcessing(page, rows, currentIndex) {
  if (currentIndex < rows.length - 1) {
    await page.waitForTimeout(4000).catch(error => {
      console.error('Error occurred while waiting for row processing:', error);
    }); 
  }
}

// Navigate to the specified page number in the pagination.
async function navigateToNextPage(page, currentPageNumber) {
  // Calculate the next page number
  const nextPageNumber = currentPageNumber + 1;

  // Click on the page dropdown button
  await page.click('.Select-arrow');

  // Wait for the dropdown menu to appear
  await page.waitForSelector('.Select-option');

  // Find and click the option corresponding to the next page number
  const nextPageOption = await page.$(`.Select-option:nth-child(${nextPageNumber})`);
  if (nextPageOption) {
    await nextPageOption.click();
    // Wait for the rows to load
    await page.waitForSelector('.zp_RFed0 tr');
    return true; // Next page navigated successfully
  } else {
    console.log(`Page ${nextPageNumber} is not present. Ending test.`);
    return false; // Next page not found, end test
  }
}

module.exports = { waitForRowProcessing, navigateToNextPage };
