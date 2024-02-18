// helpers/extractEmail.js

// Extracts the email when Access Email button is not present
async function extractEmail(mailIconElement, page) {
  await setTimeout(() => Promise.resolve(), 1000); // 1-second delay
  await mailIconElement.waitForElementState('visible');
  
  await setTimeout(() => Promise.resolve(), 1000); // 1-second delay
  await mailIconElement.click();
  
  await setTimeout(() => Promise.resolve(), 1000); // 1-second delay
  await page.waitForSelector('.zp_YI5xm', { visible: true });
  
  await setTimeout(() => Promise.resolve(), 1000); // 1-second delay
  const emailValue = await page.$eval('.zp_t08Bv', element => element.textContent);
  
  await setTimeout(() => Promise.resolve(), 1000); // 1-second delay
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
