// TablePage.js
export class TablePage {
  constructor(page) {
    this.page = page;
  }

  async waitForTable() {
    while (true) {
      try {
        await this.page.waitForSelector('.zp_RFed0', { visible: true });
        break;
      } catch (error) {
        console.log("Table not found");
      }
    }
  }

  async getRows() {
    return await this.page.$$('.zp_RFed0 tr');
  }
}
