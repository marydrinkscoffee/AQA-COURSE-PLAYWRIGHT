import { test, expect } from '@playwright/test';

// Task-2
// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

interface IRegistrationData {
    firstName: string,
    lastName: string,
    address: string,
    emailAddress: string,
    phone: string,
    country: string,
    language: string,
    skills: string,
    year: string,
    month: string,
    day: string
    password: string,
    confirmPassword: string
}

test.describe("[Anatoly Karpovich] [demo-registration-form]", () => {
    const registrationData: IRegistrationData = {
        firstName: 'Ewa',
        lastName: 'Marchewka',
        address: 'ul. Kwiatowa 15, 00-000 Warszawa',
        emailAddress: 'ewamarchewka@gmail.com',
        phone: '+48123456789',
        country: 'UK',
        language: 'Polish',
        skills: 'JavaScript',
        year: '1990',
        month: 'May',
        day: '15',
        password: 'Password123',
        confirmPassword: 'Password123' 
    };

    test.beforeEach(async ({ page }) => {
        const url = 'https://anatoly-karpovich.github.io/demo-registration-form';
        await page.goto(url);
    });

    test("Should be registered with valid data", async ({ page }) => {
        //1st page - filling registration form
        const firstNameField = page.locator('#firstName');
        const lastNameField = page.locator('#lastName');

        const addressField = page.locator('#address');
        const emailAddressField = page.locator('#email');
        const phoneField = page.locator('#phone');
        const countryDropdown = page.locator('#country');

        const femailGender = page.locator('input[name="gender"][value="female"]');

        const sportsHobbies = page.locator('input.hobby[value="Sports"]');

        const languageField = page.locator('#language');

        const skillsDropdown = page.locator('#skills');

        const yearDropdown = page.locator('#year');
        const monthDropdown = page.locator('#month');
        const dayDropdown = page.locator('#day');

        const passwordField = page.locator('#password');
        const confirmPasswordField = page.locator('#password-confirm');

        const submitButton = page.locator('.btn.btn-primary');

        //2d page - assertions
        const regDetailsTitle = page.locator('//h2[contains(text(), "Registration Details")]');
        const regDetailsFullName = page.locator('#fullName');
        const regDetailsAddress = page.locator('#address');
        const regDetailsEmailAddress = page.locator('#email');
        const regDetailsPhone = page.locator('#phone');
        const regDetailsCountry = page.locator('#country');
        const regDetailsGender = page.locator('#gender');
        const regDetailsLanguage = page.locator('#language');
        const regDetailsSkills = page.locator('#skills');
        const regDetailsHobbies = page.locator('#hobbies');
        const regDetailsDateOfBirth = page.locator('#dateOfBirth');
        const backToFormButton = page.locator('.btn.btn-primary');


        //1st page 
        await firstNameField.fill(registrationData.firstName);
        await lastNameField.fill(registrationData.lastName);
        await addressField.fill(registrationData.address);
        await emailAddressField.fill(registrationData.emailAddress);
        await phoneField.fill(registrationData.phone);
        await countryDropdown.selectOption(registrationData.country);
        await expect(countryDropdown).toHaveValue(registrationData.country);

        await femailGender.check();
        await expect(femailGender).toBeChecked();

        await sportsHobbies.check();
        await expect(sportsHobbies).toBeChecked();

        await languageField.fill(registrationData.language);
        await skillsDropdown.selectOption(registrationData.skills);
        await expect(skillsDropdown).toHaveValue(registrationData.skills);

        await yearDropdown.selectOption(registrationData.year);
        await expect(yearDropdown).toHaveValue(registrationData.year);
        await monthDropdown.selectOption(registrationData.month);
        await expect(monthDropdown).toHaveValue(registrationData.month);
        await dayDropdown.selectOption(registrationData.day);
        await expect(dayDropdown).toHaveValue(registrationData.day);

        await passwordField.fill(registrationData.password);
        await confirmPasswordField.fill(registrationData.confirmPassword);
        
        await submitButton.click();

        //2d page
        await expect(regDetailsTitle).toHaveText('Registration Details');
        await expect(regDetailsFullName).toHaveText(`${registrationData.firstName} ${registrationData.lastName}`);

        await expect(regDetailsAddress).toHaveText(registrationData.address);
        await expect(regDetailsEmailAddress).toHaveText(registrationData.emailAddress);
        await expect(regDetailsPhone).toHaveText(registrationData.phone);
        await expect(regDetailsCountry).toHaveText(registrationData.country);
        await expect(regDetailsGender).toHaveText('female');
        await expect(regDetailsLanguage).toHaveText(registrationData.language);
        await expect(regDetailsSkills).toHaveText(registrationData.skills);
        await expect(regDetailsHobbies).toHaveText('Sports');
        await expect(regDetailsDateOfBirth).toHaveText(`${registrationData.day} ${registrationData.month} ${registrationData.year}`);
        await expect(backToFormButton).toHaveText('Back to Form');
    });
});