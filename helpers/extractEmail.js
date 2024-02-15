// helpers/extractEmail.js

// Extracts the email when Access Email button is not present
async function extractEmail(iconElement, page) {
  await iconElement.waitForElementState('visible');
  await iconElement.click();
  await page.waitForSelector('.zp_YI5xm', { visible: true });
  const emailValue = await page.$eval('.zp_t08Bv', element => element.textContent);
  await removeEmailOverlay(page);
  return emailValue;
}


// Removes the overlay
async function removeEmailOverlay(page) {
  await page.evaluate(() => {
    const overlay = document.querySelector('.zp_YI5xm');
    if (overlay) {
      overlay.remove();
    } else {
      console.log("Overlay element not found.");
    }
  });
}

module.exports = { extractEmail, removeEmailOverlay };
