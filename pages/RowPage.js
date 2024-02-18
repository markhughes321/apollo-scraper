// RowPage.js
class RowPage {
  constructor(rowElement) {
    this.rowElement = rowElement;
  }

  // Name
  async extractName() {
    const fullNameElement = await this.rowElement.$('.zp_xVJ20 a');
    if (!fullNameElement) return null;

    const fullName = await fullNameElement.innerText();
    if (typeof fullName !== 'string') return null; // Check if fullName is a string

    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return { firstName, lastName };
  }

  // Extract LinkedIn URL
  async extractLinkedIn() {
    return (await this.rowElement.$('.zp_I1ps2 a'))?.getAttribute('href') ?? null;
  }

// Extract Website URL
async extractWebsite() {
  const websiteElement = await this.rowElement.$('td.zp_aBhrx:nth-child(3) a.zp-link');
  if (websiteElement) {
    const websiteUrl = await websiteElement.getAttribute('href');
    // Remove "http://www." from the URL
    const cleanedUrl = websiteUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    // Capitalize the first letter of the domain
    const capitalizedUrl = cleanedUrl.charAt(0).toUpperCase() + cleanedUrl.slice(1);
    // Enclose the URL in double quotes
    const formattedUrl = `"${capitalizedUrl}"`;
    return formattedUrl;
  } else {
    return null;
  }
}


  // Title
  async extractTitle() {
    const titleElement = await this.rowElement.$('.zp_Y6y8d');
    if (titleElement) {
      const titleText = await titleElement.innerText();
      return `"${titleText}"`;
    } else {
      return null;
    }
  }

  // Company Name
  async extractCompany() {
    const companyElement = await this.rowElement.$('.zp_J1j17 a');
    if (companyElement) {
      const companyText = await companyElement.innerText();
      return `"${companyText}"`;
    } else {
      return null;
    }
  }

  // Location
  async extractLocation() {
    const locationElement = (await this.rowElement.$$('.zp_Y6y8d'))[1];
    if (locationElement) {
      const locationText = await locationElement.innerText();
      return `"${locationText}"`;
    } else {
      return null;
    }
  }

  // Employees
  async extractEmployees() {
    const employeeElement = (await this.rowElement.$$('.zp_Y6y8d'))[2];
    if (employeeElement) {
      const employeeText = await employeeElement.innerText();
      return `"${employeeText}"`;
    } else {
      return null;
    }
  }

  // Industry
  async extractIndustry() {
    const industryElement = await this.rowElement.$('.zp_PHqgZ');
    if (industryElement) {
      let industryText = await industryElement.innerText();
      // Remove trailing comma and whitespace
      industryText = industryText.replace(/,\s*$/, '');
      return `"${industryText}"`;
    } else {
      return null;
    }
  }
  
  // Gets Email
  async getEmailIcon() {
    return await this.rowElement.$('i.zp-icon.apollo-icon.apollo-colored-icon');
  }

  // Extract Phone Number
  async extractPhoneNumber() {
    const phoneNumberElement = await this.rowElement.$('.zp_aBhrx:nth-child(7) a');
    if (!phoneNumberElement) return 'null';
    let phoneNumber = await phoneNumberElement.innerText();
    return phoneNumber === 'Request Mobile Number' ? 'null' : `"${phoneNumber.trim()}"`;
  }

}

module.exports = RowPage;