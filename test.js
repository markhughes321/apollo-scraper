// Extracting name
const name = $0.querySelector('.zp_xVJ20 a').textContent.trim();

// Extracting LinkedIn URL
const linkedinURL = $0.querySelector('.zp_I1ps2 a').href;

// Extracting job title
const jobTitle = $0.querySelector('.zp_Y6y8d').textContent.trim();

// Extracting company name
const companyName = $0.querySelector('.zp_J1j17 a').textContent.trim();

// Extracting company website URL
const companyWebsiteURL = $0.querySelector('.zp_TvTJg a').href || $0.querySelector('.zp_TvTJg .zp_OotKe').href;

// Extracting location information
const locationInfo = $0.querySelectorAll('.zp_Y6y8d')[1].textContent.trim();

// Extracting employees
const contactNumber = $0.querySelectorAll('.zp_Y6y8d')[2].textContent.trim();

// Extracting category
const category = $0.querySelector('.zp_PHqgZ').textContent.trim();

console.log("Name:", name);
console.log("LinkedIn URL:", linkedinURL);
console.log("Job Title:", jobTitle);
console.log("Company Name:", companyName);
console.log("Company Website URL:", companyWebsiteURL);
console.log("Location:", locationInfo);
console.log("Employees:", contactNumber);
console.log("Category:", category);
