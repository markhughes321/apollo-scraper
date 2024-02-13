async function processRows(page, rows, emailList, extractEmailFromButton, extractEmailFromIcon, removeEmailOverlay, extractNameFromRow, waitForRowProcessing) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = await extractNameFromRow(row);
    if (name) {
      console.log('Name:', name);
      emailList.push(name);
    }

    const buttonTextElement = await row.$('.zp_kxUTD[data-elem="button-label"]');
    const iconElement = await row.$('i.zp-icon.apollo-icon.apollo-colored-icon');

    if (buttonTextElement) {
      await extractEmailFromButton(buttonTextElement, page, emailList);
    } else if (iconElement) {
      await extractEmailFromIcon(iconElement, page, emailList);
    } else {
      console.log("Neither 'Access email' button nor the mail icon is found in the row.");
    }

    await waitForRowProcessing(page, rows, i);
    await removeEmailOverlay(page);
  }
}

module.exports = { processRows };
