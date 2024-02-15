// RowPage.js
class RowPage {
  constructor(rowElement) {
    this.rowElement = rowElement;
  }

  // Name
  async extractName() {
    return (await this.rowElement.$('.zp_xVJ20 a'))?.innerText() ?? null;
  }

  // Extract LinkedIn URL
  async extractLinkedIn() {
    return (await this.rowElement.$('.zp_I1ps2 a'))?.getAttribute('href') ?? null;
  }

  // Title
  async extractTitle() {
    return (await this.rowElement.$('.zp_Y6y8d'))?.innerText() ?? null;
  }

  // Company Name
  async extractCompany() {
    return (await this.rowElement.$('.zp_J1j17 a'))?.innerText() ?? null;
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
    return (await this.rowElement.$$('.zp_Y6y8d'))[2]?.innerText() ?? null;
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


}

module.exports = RowPage;