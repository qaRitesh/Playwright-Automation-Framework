import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('Application Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.hitURL('http://localhost:8888/');
    await loginPage.validLogin('admin','admin');
     expect(await loginPage.getCurrentPageTitle()).toContain('Home');
    // Save Login Session
    await page.context().storageState({ path: authFile});
});