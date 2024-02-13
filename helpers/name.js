async function extractNameFromRow(row) {
  const nameElement = await row.$('.zp_xVJ20 a');
  if (nameElement) {
    return await nameElement.innerText();
  }
  return null;
}

module.exports = { extractNameFromRow };
