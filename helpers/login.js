// helpers/login.js
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');

test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
});
