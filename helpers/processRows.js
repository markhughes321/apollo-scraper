// helpers/login.js
const RowPage = require('../pages/RowPage');

async function processRows(page, rows, emailList, extractEmail, waitForRowProcessing) {
  try {
    for (const row of rows) {
      const rowPage = new RowPage(row);

      // Get Name
      const name = await rowPage.extractName();

      // Get LinkedIn Url
      const linkedIn = await rowPage.extractLinkedIn();

      // Get Title
      const title = await rowPage.extractTitle();

      // Get Company
      const company = await rowPage.extractCompany();

      // Get Location
      const location = await rowPage.extractLocation();

      // Get Employees
      const employees = await rowPage.extractEmployees();
      
      // Get Email
      const emailIcon = await rowPage.getEmailIcon();
      const email = await extractEmail(emailIcon, page);

      // Get Industry
      const industry = await rowPage.extractIndustry();

      // Construct the row string
      const rowData = [name, linkedIn, title, company, location, employees, industry, email].join(',');
      emailList.push(rowData);

      // Wait 3 seconds before moving to the next row
      await waitForRowProcessing(page, rows, rows.indexOf(row));
      console.log(name);
    }
  } catch (error) {
    console.error('Error occurred while processing rows:', error);
    throw error;
  }
}

module.exports = { processRows };
