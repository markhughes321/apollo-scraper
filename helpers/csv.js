import fs from 'fs';
import path from 'path';

function writeToCSV(data) {
  // Specify the path to the csv folder and filename
  const csvFolderPath = path.join(__dirname, '..', 'csv');
  const filename = 'contactss.csv';
  // Combine the csv folder path and filename to get the full file path
  const filePath = path.join(csvFolderPath, filename);

  // Check if the file does not exist
  if (!fs.existsSync(filePath)) {
    // If the file does not exist, create it and add headers
    // Concatenate header fields with a comma separator
    const headers = ['First Name', 'Last Name', 'LinkedIn', 'Website Url', 'Title', 'Company', 'Location', 'Employees', 'Industry', 'Email'].join(',');
    // Write the headers to the file along with a newline character
    fs.writeFileSync(filePath, headers + '\n');
  }

  // Append data to the existing CSV file
  // Join the 'data' array elements with newline characters
  const csvData = data.join('\n') + '\n';
  // Append the data to the file
  fs.appendFileSync(filePath, csvData);
  
  // Return the file path
  return filePath;
}

// Export the 'writeToCSV' function to make it accessible from other modules
export { writeToCSV };
