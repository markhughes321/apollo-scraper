// async function extractEmailFromButton(buttonElement, page, emailList) {
//   // Add null check
//   if (!buttonElement) {
//     console.log("Button element not found.");
//     return;
//   }

//   const buttonText = await page.evaluate(el => el.textContent.trim(), buttonElement);
//   if (buttonText === "Access email") {
//     await buttonElement.click();
//     await page.waitForSelector('.zp_YI5xm', { visible: true });
//     const emailValue = await page.$eval('.zp_t08Bv', element => element.textContent);
//     console.log('Email Value:', emailValue);
//     emailList.push(emailValue);
//     await removeEmailOverlay(page); // Remove the overlay after extracting email
//   }
// }

// async function extractEmailFromIcon(iconElement, page, emailList) {
//   await iconElement.click();
//   await page.waitForSelector('.zp_YI5xm', { visible: true });
//   const emailValue = await page.$eval('.zp_t08Bv', element => element.textContent);
//   console.log('Email Value:', emailValue);
//   emailList.push(emailValue);
//   await removeEmailOverlay(page); // Remove the overlay after extracting email
// }

// async function removeEmailOverlay(page) {
//   await page.evaluate(() => {
//     const overlay = document.querySelector('.zp_YI5xm');
//     if (overlay) {
//       overlay.remove();
//     } else {
//       console.log("Overlay element not found.");
//     }
//   });
// }

// async function waitForRowProcessing(page, rows, currentIndex) {
//   // Wait for 10 seconds before processing the next row
//   if (currentIndex < rows.length - 1) {
//     await page.waitForTimeout(10000); // 10 seconds
//   }
// }

// async function navigateToNextPage(page) {
//   const nextPageButton = await page.$('button[aria-label="right-arrow"]');
//   if (nextPageButton) {
//     await nextPageButton.click();
//     await page.waitForSelector('.zp_RFed0 tr');
//     return true; // Next page navigated successfully
//   } else {
//     return false; // No more pages to navigate to
//   }
// }

// // Function to extract name from the row
// async function extractNameFromRow(row) {
//   const nameElement = await row.$('.zp_xVJ20 a');
//   if (nameElement) {
//     return await nameElement.innerText();
//   }
//   return null;
// }

// // Function to process rows and extract email data
// async function processRows(page, rows, emailList, extractEmailFromButton, extractEmailFromIcon, waitForRowProcessing) {
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i];
//     const name = await extractNameFromRow(row);
//     if (name) {
//       console.log('Name:', name);
//       emailList.push(name);
//     }

//     const buttonTextElement = await row.$('.zp_kxUTD[data-elem="button-label"]');
//     const iconElement = await row.$('i.zp-icon.apollo-icon.apollo-colored-icon');

//     if (buttonTextElement) {
//       await extractEmailFromButton(buttonTextElement, page, emailList);
//     } else if (iconElement) {
//       await extractEmailFromIcon(iconElement, page, emailList);
//     } else {
//       console.log("Neither 'Access email' button nor the mail icon is found in the row.");
//     }

//     await waitForRowProcessing(page, rows, i);
//   }
// }

// module.exports = {
//   extractEmailFromButton,
//   extractEmailFromIcon,
//   waitForRowProcessing,
//   navigateToNextPage,
//   processRows,
//   extractNameFromRow
// };
