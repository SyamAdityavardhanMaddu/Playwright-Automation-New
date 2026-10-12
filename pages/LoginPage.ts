import {Page} from '@playwright/test';

export class LoginPage{
    constructor(private page: Page){}

    async enterUsername(username: string): Promise<void> {
        await this.page.getByRole('textbox', { name: 'username' }).fill(username);
    }

    async enterPassword(password: string): Promise<void>{
        await this.page.getByRole('textbox', { name: 'password' }).fill(password);
    }

    async clickSubmit(): Promise<void>{
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async login(username: string, password: string): Promise<void>{
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSubmit();
    }
}