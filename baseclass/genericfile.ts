import { Locator, Page, BrowserContext, Frame, expect } from "@playwright/test";

export class GenericFile {
  readonly page: Page;
  readonly createBT:Locator;
  
  constructor(page: Page) {
    this.page = page;
this.createBT = page.locator('//img[@title="Create Contact..."]');

  }

  //========================< Browser Methods >========================<>
  //
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async refreshPage(): Promise<void> {
    await this.page.reload();
  }
  async navigateBack(): Promise<void> {
    await this.page.goBack();
  }
  async navigateForward(): Promise<void> {
    await this.page.goForward();
  }

  async hitURL(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getCurrentPageUrl(): Promise<string> {
    return this.page.url();
  }
  async getCurrentPageTitle(): Promise<string> {
    return this.page.title();
  }

  // Get the full page source HTML
  async getSourceCode(): Promise<string> {
    return this.page.content();
  }
  //========================< Click Actions >========================<>
  // Perform a normal click on a locator
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  // Perform a force click even if the element is not immediately interactable
  async forceClick(locator: Locator): Promise<void> {
    await locator.click({ force: true });
  }

  // Perform a double-click on a locator
  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  // Perform a right-click (context click) on a locator
  async rightClick(locator: Locator): Promise<void> {
    await locator.click({ button: "right" });
  }

  //========================< Text Input Actions >========================<>
  // Clear an input field
  async clearValue(locator: Locator): Promise<void> {
    await locator.fill("");
  }
  // Fill an input field with text (clears existing content first)
  async setValue(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  //========================< Keyboard Actions >========================<>
  // Press a specific key (e.g., Enter, Tab) on the locator
  async press(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  // Press the Enter key on the locator
  async pressEnter(locator: Locator): Promise<void> {
    await locator.press("Enter");
  }

  // Press the Tab key on the locator
  async pressTab(locator: Locator): Promise<void> {
    await locator.press("Tab");
  }

  //========================< Element INFO >========================<>
  // Get the text content of an element
  async getText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  // Get the visible inner text of an element
  async getInnerText(locator: Locator): Promise<string | null> {
    return await locator.innerText();
  }

  // Get the value of an input field
  async getInputValue(locator: Locator) {
    return await locator.inputValue();
  }

  // Get all text contents from multiple matched elements
  async getAllTexts(locator: Locator): Promise<string[]> {
    return await locator.allTextContents();
  }
  async getAllInnerLines(locator: Locator): Promise<string[]> {
    return await locator.allInnerTexts();
  }
  async getAttribute(
    locator: Locator,
    attributeName: string,
  ): Promise<string | null> {
    return await locator.getAttribute(attributeName);
  }

  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  //========================< DropDown >========================<>
  // Select an option by value attribute
  async selectByValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ value });
  }

  // Select an option by visible label text
  async selectByLabel(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }

  // Select an option by index position
  async selectByIndex(locator: Locator, index: number): Promise<void> {
    await locator.selectOption({ index });
  }

  // Get the currently selected labels from the dropdown
  async getSelectedLabels(locator: Locator): Promise<string[]> {
    return await locator.locator("option:checked").allTextContents();
  }

  // Deselect all options in a multi-select dropdown
  async deselectAll(locator: Locator): Promise<void> {
    if (await this.isMultiSelect(locator)) {
      await locator.selectOption([]);
    }
  }

  // Check whether the dropdown allows multiple selections
  async isMultiSelect(locator: Locator): Promise<boolean> {
    return (await locator.getAttribute("multiple")) !== null;
  }

  // Get all option texts from the dropdown
  async getAllDropdownTexts(locator: Locator): Promise<string[]> {
    return await locator.locator("option").allTextContents();
  }

  //=========================< CheckBox & Radio >========================<>

  async check(locator: Locator) {
    await locator.check();
  }

  async uncheck(locator: Locator) {
    await locator.uncheck();
  }

  //========================< Mouse Actions >========================<>
  async hover(locator: Locator) {
    await locator.hover();
  }

  async dragAndDrop(source: Locator, target: Locator) {
    await source.dragTo(target);
  }
  //========================< Window & Tab >========================<>

  async getAllPages(): Promise<Page[]> {
    let contetx: BrowserContext = this.page.context();
    let allPages: Page[] = await contetx.pages();
    return allPages;
  }
  async getTabWindowCount(): Promise<number> {
    let pageCount: number = await this.page.context().pages().length;
    return pageCount;
  }

  async switchToIndexbase(index: number): Promise<Page> {
    const pages: Page[] = await this.page.context().pages();
    let newpage: Page = pages[index];
    return newpage;
  }

 async switchToWindowByTitle(expectedTitle: string) {
    const pages: Page[] = this.page.context().pages();
    for (const p of pages) {
      await p.waitForLoadState();
      if ((await p.title()).includes(expectedTitle)) {
        await p.bringToFront();
        return p;
      }
    }
    throw new Error("Window not found");
  }

  // async  switchToWindowByUrl(expectedUrl: string) {
  //   const pagesArray: Page[] = this.page.context().pages();
  //   console.log("Total Pages : ", pagesArray.length);
  //   for (let i = 0; i <=pagesArray.length; i++) {
  //     let pg: Page = pagesArray[i];
  //     let pagrUrl: string = await pg.url();
  //     if (pagrUrl.includes(expectedUrl)) {
  //       await pg.bringToFront();
  //       return pg;
  //     }
  //   }
  // }


async switchToWindowByUrl(expectedUrl: string): Promise<Page> {

    const pages = this.page.context().pages();
    for (const pg of pages) {
        await pg.waitForLoadState();
       if (pg.url().includes(expectedUrl)) {
            await pg.bringToFront();
            return pg;
        }
    }
    throw new Error(`No window found with URL: ${expectedUrl}`);
}


async openNewPage(locator: Locator): Promise<Page> {
  await locator.waitFor({ state: 'visible' });

  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    locator.click(),
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  return newPage;
}


  async closeCurrentTabWindow(): Promise<void> {
    await this.page.close();
  }
  //========================< Alert Handling >========================<>
  async acceptAlert(): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }
  async dismissAlert(): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
  }
  async acceptPrompt(promptText: string): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept(promptText);
    });
  }
  async getalertmessage(): Promise<string> {
    this.page.on("dialog", async (dialog) => {
      return await dialog.message();
    });
    return "";
  }
  //========================<Scroolling>========================<>

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
  }

  async scrollBy(x: number, y: number): Promise<void> {
    await this.page.evaluate(
      ([scrollX, scrollY]) => {
        window.scrollBy(scrollX, scrollY);
      },
      [x, y],
    );
  }

  //========================< Frames Handling >========================<>
  // Get a frame by its `name` attribute
  async getFrameByName(name: string): Promise<Frame | null> {
    return this.page.frame({ name });
  }

  // Get a frame by index (0-based)
  async getFrameByIndex(index: number): Promise<Frame | null> {
    const frames = this.page.frames();
    return frames[index] ?? null;
  }

  // Get a Frame object from an iframe element `Locator`
  async getFrameFromLocator(locator: Locator): Promise<Frame | null> {
    const handle = await locator.elementHandle();
    if (!handle) return null;
    return await handle.contentFrame();
  }

  //========================< Screenshots >========================<>
  async takePageScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
  }
  async takeElementScreenshot(locator: Locator, path: string): Promise<void> {
    await locator.screenshot({ path });
  }

  //========================< Waits >========================<>
  async waitForElementVisible(
    locator: Locator,
    timeout: number = 5000,
  ): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
  }
 async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }
//========================< Custom/Common Methods >========================<>//common
  async hoverOnTopModule(moduleName: string): Promise<void> {
    let topModuleLocator = this.page.locator(
        `//td[contains(@onmouseover,'fnDropDown')]//a[text()='${moduleName}']`
      );
    await this.hover(topModuleLocator);
  }

  async marketingSubmoduleOptionClick(optionName: string): Promise<void> {
        let optionLocator = this.page.locator(`//div[@id="Marketing_sub"]//a[text()='${optionName}']`);
        await expect(optionLocator).toBeVisible({timeout: 1000});
        await this.click(optionLocator);
  }

  async clickonCreateBT() {
    await this.click(this.createBT);
  }


}
