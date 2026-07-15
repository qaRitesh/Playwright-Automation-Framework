import { Page } from "playwright";
import { GenericFile } from "../baseclass/genericfile";

export class LoginPage extends GenericFile {
  readonly usernameInput;
  readonly passwordInput;
  readonly colorTheme;
  readonly loginButton;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('//input[@name="user_name"]');
    this.passwordInput = page.locator('//input[@name="user_password"]');
    this.colorTheme = page.locator('//select[@name="login_theme"]');
    this.loginButton = page.locator('//input[@name="Login"]');
  }

  async validLogin(username: string, password: string): Promise<void> {        
    await this.setValue(this.usernameInput, username);
    await this.getInputValue(this.usernameInput);
    await this.setValue(this.passwordInput, password);
    await this.selectByLabel(this.colorTheme, 'bluelagoon');
    await this.click(this.loginButton);
  }



}
