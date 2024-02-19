const fs = require('fs');
const readline = require('readline');

// Function to read exclude.csv and return a Set of URLs to exclude
function readExcludeFile(excludeFile) {
    const excludeSet = new Set();
    const excludeData = fs.readFileSync(excludeFile, 'utf8').split('\n').slice(1); // Read data skipping header
    excludeData.forEach(row => {
        if (row.trim() !== '') {
            excludeSet.add(row.trim().toLowerCase()); // Lowercasing URLs for case-insensitive comparison
        }
    });
    return excludeSet;
}

// Function to read contacts.csv, filter out rows with URLs to exclude, and prompt for deletion
function filterContacts(excludeSet, contactsFile) {
    const excludedRows = [];
    let excludedCount = 0;
    const contactsData = fs.readFileSync(contactsFile, 'utf8').split('\n').slice(1); // Read data skipping header
    contactsData.forEach(row => {
        if (row.trim() !== '') {
            const rowData = row.split(',');
            const url = rowData[3].trim().toLowerCase(); // Lowercasing URLs for case-insensitive comparison
            if (excludeSet.has(url)) {
                excludedRows.push(rowData);
                excludedCount++;
            }
        }
    });
    console.log(`Total ${excludedCount} rows will be excluded.`);
    return excludedRows;
}

// Function to prompt for deletion
function promptDeletion(excludedRows) {
    return new Promise((resolve, reject) => {
        if (excludedRows.length > 0) {
            console.log("Rows to be excluded:");
            excludedRows.forEach(row => console.log(row.join(','))); // Print rows to console
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("Do you want to delete these rows? (y/n): ", (answer) => {
                rl.close();
                if (answer.toLowerCase() === 'y') {
                    resolve(true);
                } else if (answer.toLowerCase() === 'n') {
                    resolve(false);
                } else {
                    console.log("Invalid choice. Please enter 'y' or 'n'.");
                    resolve(promptDeletion(excludedRows));
                }
            });
        } else {
            console.log("No rows to exclude.");
            resolve(false);
        }
    });
}

// Function to delete excluded rows
function deleteRows(contactsFile, excludedRows) {
    if (excludedRows.length > 0) {
        const contactsData = fs.readFileSync(contactsFile, 'utf8').split('\n');
        const newData = contactsData.filter(row => {
            if (row.trim() !== '') {
                const rowData = row.split(',');
                return !excludedRows.some(excludedRow => excludedRow.join(',') === rowData.join(','));
            }
            return true;
        });
        fs.writeFileSync(contactsFile, newData.join('\n'));
        console.log("Excluded rows deleted successfully.");
    } else {
        console.log("No rows to delete.");
    }
}

async function main() {
    const excludeFile = 'csv/exclude.csv';
    const contactsFile = 'csv/contacts.csv';

    // Read URLs to exclude
    const excludeSet = readExcludeFile(excludeFile);

    // Filter out rows to be excluded
    const excludedRows = filterContacts(excludeSet, contactsFile);

    // Prompt for deletion
    const deleteDecision = await promptDeletion(excludedRows);

    // Delete rows if user confirms
    if (deleteDecision) {
        deleteRows(contactsFile, excludedRows);
    }
}

main();
