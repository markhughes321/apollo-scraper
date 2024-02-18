const fs = require('fs');
const readline = require('readline');

// Read the CSV file
fs.readFile('csv/contacts.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the CSV data into rows
  const rows = data.trim().split('\n'); // remove header row

  // Create a map to store rows by their content
  const rowMap = new Map();

  // Keep track of duplicate rows
  const duplicateRows = [];

  // Populate the map and find duplicates
  rows.forEach((row, index) => {
    const rowContent = row.split(',').map(item => item.trim());
    const key = rowContent.join('|');
    if (!rowMap.has(key)) {
      rowMap.set(key, index); // Store index of the first occurrence of the row
    } else {
      duplicateRows.push(index); // Mark duplicate row for deletion
    }
  });

  // Print duplicates to be deleted
  if (duplicateRows.length > 0) {
    console.log('Duplicate rows to be deleted:');
    duplicateRows.forEach(index => {
      console.log(rows[index]);
    });
    console.log('---');
  }

  // Print total duplicate count
  const totalDuplicateCount = duplicateRows.length;
  if (totalDuplicateCount > 0) {
    console.log(`Total duplicate rows: ${totalDuplicateCount}`);

    // Ask for confirmation before deletion
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Delete duplicate rows? (y/n): ', answer => {
      if (answer.toLowerCase() === 'y') {
        // Filter out the duplicate rows
        const newData = rows.filter((row, index) => !duplicateRows.includes(index)).join('\n');

        // Write the updated data back to the file
        fs.writeFile('csv/contacts.csv', newData, 'utf8', err => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Duplicate rows deleted successfully.');
          }
          rl.close();
        });
      } else {
        console.log('Duplicate rows not deleted.');
        rl.close();
      }
    });
  } else {
    console.log('No duplicate rows found.');
  }
});
