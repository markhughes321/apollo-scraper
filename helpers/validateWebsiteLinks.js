const fs = require('fs');
const path = require('path');
const axios = require('axios');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, '../csv/contacts.csv');

// Function to validate URL by making a GET request
async function validateUrl(url) {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return true; // URL is valid
        } else {
            return false; // URL is invalid
        }
    } catch (error) {
        return false; // URL is invalid
    }
}

// Read the CSV file
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
        let websiteUrl = row['Website Url'];
        // Prepend "http://www." if it's not already there
        if (!websiteUrl.startsWith('http://www.') && !websiteUrl.startsWith('https://www.')) {
            websiteUrl = `https://www.${websiteUrl}`;
        }
        const isValid = await validateUrl(websiteUrl);
        if (!isValid) {
            console.log(`Invalid URL: ${websiteUrl}`);
        }
    })
    .on('end', () => {
        console.log('Validation complete');
    });
