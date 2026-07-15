import { test, Page } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";
import{ContactCreateInfoPage} from"../Pages/ContactCreateInfoPage";
import {commonData} from "../VtigerData/commonData";


test('Vtiger Create-Contract Script with parameter', async ({page}) => {
    let loginPage: LoginPage = new LoginPage(page);
    await loginPage.hitURL(commonData.login.baseUrl);
    await loginPage.validLogin(commonData.login.username,commonData.login.password);
    let homepage: HomePage = new HomePage(page);
    await homepage.clickOnContactLink();
     await homepage.clickonCreateBT();
   let contactCreateInfoPage: ContactCreateInfoPage =  new ContactCreateInfoPage(page);
    //await contactCreateInfoPage.fillContactInfo(commonData.createNewContact.salutation, commonData.createNewContact.firstName, commonData.createNewContact.lastName, commonData.createNewContact.leadSource, commonData.createNewContact.fax,commonData.createNewContact.mobile, commonData.createNewContact.email,commonData.createNewContact.selectAccoounts.url,commonData.createNewContact.selectAccoounts.accountName);
        await contactCreateInfoPage.fillContactInfo(commonData.createNewContact);

    // await homepage.clickOnContactLink();
    })

    
