import { Locator, Page } from "playwright";
import { GenericFile } from "../baseclass/genericfile";
import { expect } from "playwright/test";

export class ContactCreateInfoPage extends GenericFile {
  readonly selectSalutationOnFirstName: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly selectAccountNameBT:Locator;

  readonly validateAccountHearder :Locator;

  readonly leadSourceDropdown: Locator;
  readonly faxInput: Locator;
  readonly assignedToUserRadioBT: Locator;
  readonly assignedToGroupRadioBT: Locator;
  readonly mobileInput: Locator;
  readonly emailInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.selectSalutationOnFirstName = page.locator('//select[@name="salutationtype"]');
    this.firstNameInput = page.locator('//input[@name="firstname"]');
    this.lastNameInput = page.locator('//input[@name="lastname"]');
    this.selectAccountNameBT=page.locator("//input[@name='account_name']/following-sibling::img[@title='Select']");
    
    this.validateAccountHearder=page.locator("//td[@class='moduleName' and text()='Accounts']");
    
    this.leadSourceDropdown = page.locator('//select[@name="leadsource"]');
    this.faxInput = page.locator('//input[@name="fax"]');
    this.assignedToUserRadioBT = page.locator('//input[@value="U"]');
    this.assignedToGroupRadioBT = page.locator('//input[@value="T"]');
    this.mobileInput = page.locator('//input[@name="mobile"]');
    this.emailInput = page.locator('//input[@name="email"]');
    this.saveButton = page.locator('//input[@title="Save [Alt+S]"]').first();
  }

  // more parameter:
//   async fillContactInfo(salutation: string, firstName: string, lastName: string, leadSource: string, fax: string, mobile: string, email: string,selectAccountUrl:string,selectAccountName:string): Promise<void> {
//    await this.page.waitForLoadState();
//     await this.selectByLabel(this.selectSalutationOnFirstName, salutation);
//     await this.setValue(this.firstNameInput, firstName);
//     await this.setValue(this.lastNameInput, lastName);
//    // await this.click(this.selectAccountNameBT);
//   const switchAccountName= await this.openNewPage(this.selectAccountNameBT);
//  const accountPage =new ContactCreateInfoPage(switchAccountName);
//  await expect(switchAccountName).toHaveTitle("");
// await expect(switchAccountName).toHaveURL(selectAccountUrl);
// await expect(accountPage.validateAccountHearder).toHaveText("Accounts");
// await accountPage.accountNameSelect(selectAccountName,switchAccountName);

//     await this.selectByLabel(this.leadSourceDropdown, leadSource);
//     await this.setValue(this.faxInput, fax);
//     await this.click(this.assignedToGroupRadioBT);
//     await this.setValue(this.mobileInput, mobile);
//     await this.setValue(this.emailInput, email);
//    // await this.click(this.saveButton);
//   }

//whitout more perameter:
  async fillContactInfo(contactData:any): Promise<void> {
   await this.page.waitForLoadState();
    await this.selectByLabel(this.selectSalutationOnFirstName,contactData.salutation);
    await this.setValue(this.firstNameInput, contactData.firstName);
    await this.setValue(this.lastNameInput,contactData.lastName);
// await this.click(this.selectAccountNameBT);
//  const switchAccountName= await this.switchToIndexbase(1);
  const switchAccountName= await this.openNewPage(this.selectAccountNameBT);
 const accountPage =new ContactCreateInfoPage(switchAccountName);
await expect(accountPage.validateAccountHearder).toBeVisible();

 await expect(switchAccountName).toHaveTitle("");
await expect(switchAccountName).toHaveURL(contactData.selectAccounts.url);
await expect(accountPage.validateAccountHearder).toHaveText("Accounts");
await accountPage.accountNameSelect(contactData.selectAccounts.accountName,switchAccountName);

    await this.selectByLabel(this.leadSourceDropdown, contactData.leadSource);
    await this.setValue(this.faxInput, contactData.fax);
    await this.click(this.assignedToGroupRadioBT);
    await this.setValue(this.mobileInput, contactData.mobile);
    await this.setValue(this.emailInput, contactData.email);
    // await this.click(this.saveButton);
  }

  async accountNameSelect(accuntName:string,page:Page){
    let selectAccount:Locator=await page.locator(`//table[@cellspacing='1']//td[1]/a[text()='${accuntName}']`)
   // await selectAccount.waitFor({ state: 'visible' });
    await selectAccount.click();
  }


}
