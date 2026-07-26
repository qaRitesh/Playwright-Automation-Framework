import { test, Page } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";
import {ContactCreateInfoPage} from"../Pages/ContactCreateInfoPage";
import createContact from "../VtigerData/ContactsCreateDataDriven.json";
import datafile from "../VtigerData/DataFile.json";

createContact.createNewContact.forEach((data) => {
    test(`Vtiger Create-Contract Script with parameter ${data.firstName}`, async ({page}) => {
    let homepage: HomePage = new HomePage(page);
   await homepage.homePageHit();
    await homepage.homepageValidation();
    await homepage.clickOnContactLink();
     await homepage.clickonCreateBT();
   let contactCreateInfoPage: ContactCreateInfoPage =  new ContactCreateInfoPage(page);
        await contactCreateInfoPage.fillContactInfo(data);
    })
});


//storageState:
 test(`Create-Contract with storageState${datafile.createNewContact[0].firstName}`, async ({page}) => {
    let homepage: HomePage = new HomePage(page);
    await homepage.homePageHit();
    await homepage.homepageValidation();
    await homepage.clickOnContactLink();
     await homepage.clickonCreateBT();
   let contactCreateInfoPage: ContactCreateInfoPage =  new ContactCreateInfoPage(page);
        await contactCreateInfoPage.fillContactInfo(datafile.createNewContact[0]);
    })

