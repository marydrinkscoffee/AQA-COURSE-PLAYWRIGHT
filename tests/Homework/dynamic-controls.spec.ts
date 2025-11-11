// https://anatoly-karpovich.github.io/test-automation-sandbox/, страница - Dynamic Loading
// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from '@playwright/test';

test.describe('[Heroku App] [Dynamic Controls]', () => {
    test('Task-1', async ({ page }) => {
        const url = 'https://the-internet.herokuapp.com';
        const dynamicControlLink = page.getByRole('link', { name: 'Dynamic Controls' });
        const removeButton = page.getByRole('button', { name: 'Remove' });
        const addButton = page.getByRole('button', { name: 'Add' });
        const header = page.locator('.example').getByRole('heading', { level: 4, name: 'Dynamic Controls' }); //getByRole('heading', { name: 'Dynamic Controls' });
        const description = page.locator('.example p');
        const checkbox = page.locator('#checkbox-example').getByRole('checkbox');
        const goneMessage = page.locator('#checkbox-example').getByText(`It's gone!`);
        const backMessage = page.locator('#checkbox-example').getByText(`It's back!`);

        //открыть https://the-internet.herokuapp.com/
        await page.goto(url);

        // перейти на страницу Dynamic Controls
        await dynamicControlLink.click();

        // Дождаться появления кнопки Remove
        await removeButton.waitFor({ state: 'visible' });

        // Завалидировать текста в заголовке страницы
        await expect(header).toHaveText('Dynamic Controls');
        await expect(description).toContainText('This example demonstrates');

        // Чекнуть чекбокс
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // Кликнуть по кнопке Remove
        await removeButton.click();

        // Дождаться исчезновения чекбокса
        await checkbox.waitFor({ state: 'detached' });

        // Проверить наличие кнопки Add
        await expect(addButton).toBeVisible();

        // Завалидировать текст It's gone!
        await expect(goneMessage).toHaveText(`It's gone!`);

        // Кликнуть на кнопку Add
        await addButton.click();

        // Дождаться появления чекбокса
        await checkbox.check(); 
        await expect(checkbox).toBeChecked();

        // Завалидировать текст It's back!
        await expect(backMessage).toHaveText(`It's back!`);
    });
});