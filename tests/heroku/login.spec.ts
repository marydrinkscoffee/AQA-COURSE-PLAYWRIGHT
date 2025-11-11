import test, { expect, Locator } from '@playwright/test';
import { beforeEach } from 'node:test';

interface ICredentials{
    username: string,
    password: string,
}

enum NOTIFICATIONS{
    LOGIN_SUCCESS = 'You logged into a secure area!',
    LOGOUT_SUCCESS = 'You logged out of the secure area!',
    INVALID_USERNAME = 'Your username is invalid!',
    INVALID_PASSWORD = 'Your password is invalid!',
}

test.describe('[Heroku App] [Form Authentication]', () => {
     const validCredentials: ICredentials = {
        username: 'tomsmith',
        password: 'SuperSecretPassword!',
    };

    const invalidCredentials: ICredentials[] = [
    {
        username: 'Vasia Pupkin',
        password: validCredentials.password,
    },
    {
        username: validCredentials.username,
        password: 'sjhfjhfjhuqhgquhujrh!',
    },
    {
        username: 'Vasia Pupkin',
        password: 'jfshjagehwjtb!',
    },
    {
        username: '',
        password: validCredentials.password,
    },
    {
        username: validCredentials.username,
        password: '',
    },
    {
        username: '',
        password: '',
    },
    ]

    
    test.beforeEach(async ({ page }) => {
        const url = 'https://the-internet.herokuapp.com/';
        const loginLink = page.locator('a[href="/login"]');
        await page.goto(url);
        await loginLink.click();
    });

    test("Should login with valid credentials", async ({ page }) => {
       //open site
       //navigate to login page
       //enter login
       //enter password
       /*click login button*/
       //assert
       //===
       //AAA
       //Arrange
       //Act
       //Assert
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const loginButton = page.locator('button[type="submit"]');
        const notification = page.locator('#flash');
        const securePageTitle = page.locator('h2');
        //tomsmith
        //SuperSecretPassword!

       // await page.pause();
        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await loginButton.click();
        // await page.waitForTimeout(1000);
        // const taksSebeFlashText = "\n You logged into a secure area!\n ×\n";
        // await expect(notification).toBeVisible();
        //const actualNotification = (await notification.innerText()).replace("×", "").trim();
        //expect(actualNotification).toBe(taksSebeFlashText.trim());
        await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS);
        await expect(securePageTitle).toHaveText('Secure Area');
    });

    test("Should logout", async ({ page }) => {
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const loginButton = page.locator('button[type="submit"]');
        const notification = page.locator('#flash');
        const logoutButton = page.locator('a[href="/logout"]');
        const pageTitle = page.locator('h2');
        //preconditions
        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await loginButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.LOGIN_SUCCESS);
        //act
        await logoutButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.LOGOUT_SUCCESS);
        await expect(pageTitle).toHaveText('Login Page');
    });

    test("Should NOT login with invalid username", async ({ page }) => {
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const loginButton = page.locator('button[type="submit"]');
        const notification = page.locator('#flash');
        const logoutButton = page.locator('a[href="/logout"]');
        const pageTitle = page.locator('h2');
        //preconditions
        const { username, password } = invalidCredentials[0];
        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await loginButton.click();

        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME);
    });

    test("Should NOT login with invalid password", async ({ page }) => {
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const loginButton = page.locator('button[type="submit"]');
        const notification = page.locator('#flash');
        const logoutButton = page.locator('a[href="/logout"]');
        const pageTitle = page.locator('h2');
        //preconditions
        const { username, password } = invalidCredentials[1]!;
        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await loginButton.click();

        await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD);
        // await page.goBack();
    });
});
