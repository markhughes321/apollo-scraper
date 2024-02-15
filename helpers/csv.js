import fs from 'fs';
import path from 'path';

function writeToCSV(data) {
  // Specify the path to the csv folder
  const csvFolderPath = path.join(__dirname, '..', 'csv');
  const filename = 'contacts.csv';
  const filePath = path.join(csvFolderPath, filename);

  // Append data to the CSV file
  const csvData = data.join('\n') + '\n';
  fs.appendFileSync(filePath, csvData);
  
  return filePath;
}

export { writeToCSV };
