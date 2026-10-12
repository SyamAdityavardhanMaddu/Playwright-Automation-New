import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/loginData';

test.beforeEach(async({page})=>{
await page.goto('https://practicetestautomation.com/practice-test-login/');
})

test('Valid Login test', async({page})=>{

    const loginPage = new LoginPage(page);

    

    await loginPage.login(loginData.validUser.username, loginData.validUser.password);

    await expect(page).toHaveURL(/logged-in-successfully/);

});

test('Invalid Password Test', async ({ page }) => {

    const loginPage = new LoginPage(page);


    await loginPage.login(loginData.invalidPassword.username, loginData.invalidPassword.password);

    await expect(page.locator('#error')).toBeVisible();

    await expect(page.locator('#error'))
        .toContainText('Your password is invalid!');

});

test('Invalid username test', async({page})=>{
    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.invalidUsername.username, loginData.invalidUsername.password);

    await expect(page.locator('.show')).toBeVisible();

    await expect(page.locator('.show')).toContainText('Your username is invalid!');
});

test('Invalid username and password', async({page})=>{

    const loginPage = new LoginPage(page);

    await loginPage.login(loginData.invalidBoth.username,loginData.invalidBoth.password);

    await expect(page.locator('.show')).toBeVisible();

    await expect(page.locator('.show')).toContainText('Your username is invalid!');

});

    const testCases = [

    {

        testName: 'Valid credentials',

        username: 'student',

        password: 'Password123',

        expectedMessage: 'success'

    },

    {

        testName: 'Invalid username',

        username: 'qwerty',

        password: 'Password123',

        expectedMessage: 'Your username is invalid!'

    },

    {

        testName: 'Invalid password',

        username: 'student',

        password: 'WrongPassword123',

        expectedMessage: 'Your password is invalid!'

    }

];

for (const data of testCases) {

    test(data.testName, async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto(

            'https://practicetestautomation.com/practice-test-login/'

        );

        await loginPage.login(data.username, data.password);

        if (data.expectedMessage === 'success') {

            await expect(page)

                .toHaveURL(/logged-in-successfully/);

        } else {

            await expect(page.locator('#error'))

                .toBeVisible();

            await expect(page.locator('#error'))

                .toContainText(data.expectedMessage);

        }

    });

}