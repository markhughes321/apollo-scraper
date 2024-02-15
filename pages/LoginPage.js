// LoginPage.js
require('dotenv').config();

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async login() {
    const url = process.env.URL;
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    await this.page.goto(url);
    await this.page.waitForSelector('input[name="email"]');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
};
