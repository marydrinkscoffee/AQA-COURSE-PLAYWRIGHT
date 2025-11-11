import test, { expect, Locator } from '@playwright/test';
import { beforeEach } from 'node:test';

// Task-1
// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
// Требования:

// Страница регистрации:
// Username: обязательное, от 3 до 40 символов включительно, 
// запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
// Password: обязательное, от 8 до 20 символов включительно, 
// необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
// Username: обязательное
// Password: обязательное
interface ICredentials{
    username: string,
    password: string,
}

enum NOTIFICATIONS{
    REGISTER_SUCCESS = 'Successfully registered! Please, click Back to return on login page',
    INVALID_WITHOUT_USERNAME = 'Username is required',
    INVALID_WITHOUT_PASSWORD = 'Password is required',
    INVALID_WITHOUT_CREDS = 'Please, provide valid data',
    INVALID_PASSWORD_LESS_THAN_EIGHT = 'Password should contain at least 8 characters',
    INVALID_USERNAME_LESS_THAN_THREE = 'Username should contain at least 3 characters',
    INVALID_USERNAME_POSTFIX_PREFIX = 'Prefix and postfix spaces are not allowed is username',
    INVALID_CREDS_IN_USE = 'Username is in use',
}

const validCredentials: ICredentials = {
    username: 'MTuser1',
    password: 'MTpassword1',
};

const invalidCredentials: ICredentials[] = [
    {
        username: validCredentials.username,
        password: '',
    },
    {
        username: '',
        password: validCredentials.password,
    },
    {
        username: validCredentials.username,
        password: 'Passwor',
    },
    {
        username: 'MT',
        password: validCredentials.password,
    },
    {
        username: '',
        password: '',
    },
    {
        username: ' MTuser2 ',
        password: 'Password2',
    },
];

test.describe('[demo-login-form] [Form Register]', () => {
    test.beforeEach(async ({ page }) => {
        const url = 'https://anatoly-karpovich.github.io/demo-login-form';
        
        await page.goto(url);
        
        const loginPageTitle = page.locator("#loginForm");
        const submitButton = page.locator('#submit');
        await expect(loginPageTitle).toHaveText('Login');
        await expect(submitButton).toHaveText('Submit');

        const regOnLoginButton = page.locator('#registerOnLogin');
        await regOnLoginButton.click();
        
        const regPageTitle = page.locator("#registerForm");
        const regOnRegButton = page.locator('#register');
        const backButton = page.locator('#backOnRegister');
        
        await expect(regPageTitle).toHaveText('Registration');
        await expect(regOnRegButton).toHaveText('Register');
        await expect(backButton).toHaveValue('Back');
    });


    test("Should be registered", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        await usernameRegisterInput.fill(validCredentials.username);
        await passwordRegisterInput.fill(validCredentials.password);
        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Should not be registered with empty inputs", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        const { username, password } = invalidCredentials[4]!;
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_WITHOUT_CREDS);
    });

    test("Should not be registered with invalid password", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        const { username, password } = invalidCredentials[2]!;
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_PASSWORD_LESS_THAN_EIGHT);
    });

    test("Should not be registered with invalid username", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        const { username, password } = invalidCredentials[3]!;
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME_LESS_THAN_THREE);
    });

    test("Should not be registered without password", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        const { username, password } = invalidCredentials[0]!;
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_WITHOUT_PASSWORD);
    });

    test("Should not be registered without username", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        const { username, password } = invalidCredentials[1]!;
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_WITHOUT_USERNAME);
    });

    test("Should not be registered with prefix and postfix spaces in username", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');

        const { username, password } = invalidCredentials[5]!;
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_USERNAME_POSTFIX_PREFIX);
    });

    test("Should not be registered with the same creds", async ({ page }) => {
        const usernameRegisterInput = page.locator('#userNameOnRegister');
        const passwordRegisterInput = page.locator('#passwordOnRegister');
        const regOnRegButton = page.locator('#register');
        const notification = page.locator('#errorMessageOnRegister');
        const regOnLoginButton = page.locator('#registerOnLogin');
        const backButton = page.locator('#backOnRegister');


        await usernameRegisterInput.fill(validCredentials.username);
        await passwordRegisterInput.fill(validCredentials.password);

        await regOnRegButton.click();
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        
        await backButton.click();
        await regOnLoginButton.click();

        await usernameRegisterInput.fill(validCredentials.username);
        await passwordRegisterInput.fill(validCredentials.password);
        await regOnRegButton.click(); 
        await expect(notification).toContainText(NOTIFICATIONS.INVALID_CREDS_IN_USE);
    });

});


 