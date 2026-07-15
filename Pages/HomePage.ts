import { expect, Page } from "@playwright/test";
import { GenericFile } from "../baseclass/genericfile";

export class HomePage extends GenericFile {
  
  constructor(page: Page) {
    super(page);  
   
  }

  async clickOnContactLink() {
    let pageTitle: String = await this.getCurrentPageTitle();
    console.log("Page Title is : " + pageTitle);
    await this.hoverOnTopModule("Marketing");
    // await this.page.w
    await this.page.waitForTimeout(3000);
    await this.marketingSubmoduleOptionClick("Contacts");

  }

  async homepageValidation(){
    // await this.page.waitForTimeout(5000);
    let pageTitle: String = await this.getCurrentPageTitle();
    await expect(pageTitle).toContain("admin - My Home Page");
  }

  async homePageHit(){
    await this.page.goto("http://localhost:8888/index.php?action=index&module=Home");
  }



}
