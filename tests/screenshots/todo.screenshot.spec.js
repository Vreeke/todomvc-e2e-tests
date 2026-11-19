const { test, expect } = require('@playwright/test');

test('Screenshot 1: Візуальна перевірка головної сторінки TodoMVC', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('todo-main-page.png', { fullPage: true });
});

test('Screenshot 2: Візуальна перевірка компонента форми додавання завдань', async ({ page }) => {
  await page.goto('/');
  const formBlock = page.locator('.todoapp');
  await expect(formBlock).toHaveScreenshot('todo-widget-component.png');
});
