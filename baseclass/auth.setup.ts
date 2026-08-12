import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import datafile  from '../VtigerData/DataFile.json';

const authFile = 'playwright/.auth/user.json';
setup('Application Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.hitURL(datafile.login.baseUrl);
    await loginPage.waitForPageLoad();
    await loginPage.validLogin(datafile.login.username, datafile.login.password);
     expect(await loginPage.getCurrentPageTitle()).toContain('Home');
    // Save Login Session
    await page.context().storageState({ path: authFile});
});