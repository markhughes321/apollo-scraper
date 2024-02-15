import fs from 'fs';
import path from 'path';

function writeToCSV(data) {
  // Specify the path to the csv folder
  const csvFolderPath = path.join(__dirname, '..', 'csv');
  const filename = 'contacts.csv';
  const filePath = path.join(csvFolderPath, filename);

  // Add headers if file doesn't exist
  if (!fs.existsSync(filePath)) {
    const headers = ['Name', 'LinkedIn', 'Title', 'Company', 'Location', 'Employees', 'Industry', 'Email'].join(',');
    fs.writeFileSync(filePath, headers + '\n');
  }

  // Append data to the CSV file
  const csvData = data.join('\n') + '\n';
  fs.appendFileSync(filePath, csvData);
  
  return filePath;
}

export { writeToCSV };
