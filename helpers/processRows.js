// helpers/login.js
const RowPage = require('../pages/RowPage');

async function processRows(page, rows, contacts, extractEmail, waitForRowProcessing, writeToCSV) {
  try {
    for (const row of rows) {
      const rowPage = new RowPage(row);

      // Set Name
      const { firstName, lastName } = await rowPage.extractName();

      // Set LinkedIn Url
      const linkedIn = await rowPage.extractLinkedIn();

      // Set Website Url
      const websiteUrl = await rowPage.extractWebsite();

      // Set Title
      const title = await rowPage.extractTitle();

      // Set Company
      const company = await rowPage.extractCompany();

      // Set Location
      const location = await rowPage.extractLocation();

      // Set Employees
      const employees = await rowPage.extractEmployees();
      
      // Set Email
      const emailIcon = await rowPage.getEmailIcon();
      const email = await extractEmail(emailIcon, page);

      // Set Industry
      const industry = await rowPage.extractIndustry();

      // Set Phone Number
      const phoneNumber = await rowPage.extractPhoneNumber();
      
      // Set Emailed
      const emailed = 'FALSE';

      // Set Replied
      const replied = 'FALSE';

      // Construct the row string
      const rowData = [firstName, lastName, linkedIn, websiteUrl, title, company, location, employees, industry, email, phoneNumber, emailed, replied].join(',');
      contacts.push(rowData);
      
      // Wait 3 seconds before moving to the next row
      await waitForRowProcessing(page, rows, rows.indexOf(row));
      
      console.log(rowData)
    }

    // Write all contacts to CSV after processing all rows
    writeToCSV(contacts);
    
  } catch (error) {
    console.error('Error occurred while processing rows:', error);
    throw error;
  }
}

module.exports = { processRows };