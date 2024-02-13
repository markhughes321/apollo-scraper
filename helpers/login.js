require('dotenv').config();

async function login(page) {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
}

module.exports = { login };
