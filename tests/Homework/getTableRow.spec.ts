// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect, Page } from "@playwright/test";
import { expectedData } from "./table.data";

async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
    const table = page.locator("#table2");
    
    const allHeaders = await table.locator("thead th").allTextContents();
    const headers = allHeaders.filter(h => h.trim() !== "Action");
    
    const row = table.locator(`tbody tr:has(td:text("${email}"))`);
    
    const rowCount = await row.count();
    if (rowCount === 0) {
        throw new Error(`No row found with email: ${email}`);
    }
    
    const allCells = await row.locator("td").allTextContents();
    
    const result: Record<string, string> = {};
    headers.forEach((header, index) => {
        result[header] = allCells[index]?.trim() || '';
    });
    
    return result;
}

test.describe("Get table row by email test", () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/tables");
    });
    
    expectedData.forEach(({ Email }) => {
         test(`Verify table row data for ${Email}`, async ({ page }) => {
            const actualData = await getTableRow(page, Email);
            const expectedRow = expectedData.find(data => data.Email === Email);
            expect(actualData).toEqual(expectedRow);
        }); 
    });
});