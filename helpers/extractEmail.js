
// Extracts the email when Access Email is present
async function extractEmailFromButton(buttonElement, page, emailList) {
  // Add null check
  if (!buttonElement) {
    console.log("Button element not found.");
    return;
  }

  const buttonText = await page.evaluate(el => el.textContent.trim(), buttonElement);
  if (buttonText === "Access email") {
    await buttonElement.click();
    await page.waitForSelector('.zp_YI5xm', { visible: true });
    const emailValue = await page.$eval('.zp_t08Bv', element => element.textContent);
    console.log('Email Value:', emailValue);
    emailList.push(emailValue);
    await removeEmailOverlay(page); // Remove the overlay after extracting email
  }
}

// Extracts the email when Access Email button is not present
async function extractEmailFromIcon(iconElement, page, emailList) {
  await iconElement.click();
  await page.waitForSelector('.zp_YI5xm', { visible: true });
  const emailValue = await page.$eval('.zp_t08Bv', element => element.textContent);
  console.log('Email Value:', emailValue);
  emailList.push(emailValue);
  await removeEmailOverlay(page); // Remove the overlay after extracting email
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

module.exports = { extractEmailFromButton, extractEmailFromIcon, removeEmailOverlay };
