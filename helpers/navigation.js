async function waitForRowProcessing(page, rows, currentIndex) {
  // Wait for 10 seconds before processing the next row
  if (currentIndex < rows.length - 1) {
    await page.waitForTimeout(10000); // 10 seconds
  }
}

async function navigateToNextPage(page) {
  // Click on the page dropdown button
  await page.click('.Select-arrow');

  // Wait for the dropdown menu to appear
  await page.waitForSelector('.Select-option');

  let nextPageFound = false;

  // Iterate through the page options
  const pageOptions = await page.$$('.Select-option');
  for (const option of pageOptions) {
    const pageNumber = await option.innerText();
    if (pageNumber === '5') { // If the fifth page is found
      nextPageFound = true;
      await option.click();
      break;
    }
  }

  // If the fifth page is found, wait for the rows to load
  if (nextPageFound) {
    await page.waitForSelector('.zp_RFed0 tr');
    return true; // Next page navigated successfully
  } else {
    return false; // No more pages to navigate to
  }
}

module.exports = { waitForRowProcessing, navigateToNextPage };
