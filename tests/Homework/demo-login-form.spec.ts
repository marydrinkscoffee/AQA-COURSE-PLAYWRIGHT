// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное


import test, { expect } from "@playwright/test";
// import fs from "fs";
// import path from "path";
import { invalidTestData, invalidLoginData, NOTIFICATIONS }from "./invalid-register.data";

// const file = path.resolve(`${process.cwd()}/tests/Homework/invalid-userdata.json`);
// const userData = JSON.parse(fs.readFileSync(file, "utf-8"));

// Страница регистрации
test.describe("[Demo Login Form] DDT - Registration", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  for (const { title, credentials, message } of invalidTestData) {
    test(title, async ({ page }) => {
      await page.goto(url);
      const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();
      const registerForm = page.locator(".registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();
      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator(`input[type='submit']`);
      const invalidMessageLabel = registerForm.locator("#errorMessageOnRegister");
      const { username, password } = credentials;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(invalidMessageLabel).toHaveText(message);
    });
  }

// Страница логина
for (const { credentials, loginCredentials, message, title } of invalidLoginData) {
        test(title, async ({page}) => {
        const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');
        const usernameRegisterInput = page.locator("#userNameOnRegister");
        const passwordRegisterInput = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const backButtonOnRegister = page.locator("#backOnRegister");
        const usernameLoginInput = page.locator("#userName");
        const passwordLoginInput = page.locator("#password");
        const submitButton = page.locator("#submit");
        const registerMessage = page.locator("#errorMessageOnRegister");
        const loginErrorMessage = page.locator("#errorMessage");
        const {username, password} = credentials;
        await page.goto(url);
        await registerOnLoginButton.click();
        await usernameRegisterInput.fill(username);
        await passwordRegisterInput.fill(password);
        await registerButton.click();
        await expect(registerMessage).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
        await backButtonOnRegister.click();
       
        await usernameLoginInput.fill(loginCredentials!.username);
        await passwordLoginInput.fill(loginCredentials!.password);
        await submitButton.click();
        await expect(loginErrorMessage).toHaveText(message);
    });
}
});