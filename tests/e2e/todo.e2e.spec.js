const { test, expect } = require('@playwright/test');

test('E2E 1: Відображення заголовка та початкового стану лічильника TodoMVC', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/TodoMVC/);
  await expect(page.locator('#app-title')).toHaveText('todos');
  await expect(page.locator('#items-left')).toHaveText('0 items left');
});

test('E2E 2: Додавання нового завдання та оновлення лічильника', async ({ page }) => {
  await page.goto('/');
  await page.fill('#new-todo', 'Підготувати звіт з ЛР №6');
  await page.click('#add-btn');

  await expect(page.locator('#todo-list li')).toHaveCount(1);
  await expect(page.locator('#todo-list li').first()).toContainText('Підготувати звіт з ЛР №6');
  await expect(page.locator('#items-left')).toHaveText('1 items left');
});

test('E2E 3: Позначення завдання виконаним та фільтрація Active / Completed', async ({ page }) => {
  await page.goto('/');
  await page.fill('#new-todo', 'Завдання 1');
  await page.click('#add-btn');
  await page.fill('#new-todo', 'Завдання 2');
  await page.click('#add-btn');

  await page.locator('#todo-list li input[type="checkbox"]').first().check();
  await expect(page.locator('#items-left')).toHaveText('1 items left');

  await page.click('button[data-filter="completed"]');
  await expect(page.locator('#todo-list li')).toHaveCount(1);
  await expect(page.locator('#todo-list li').first()).toContainText('Завдання 1');
});

test('E2E 4: Навігація на сторінку «Про додаток TodoMVC»', async ({ page }) => {
  await page.goto('/');
  await page.click('#about-link');
  await expect(page).toHaveURL(/about\.html/);
  await expect(page.locator('h1')).toHaveText('Інформація про TodoMVC');
});
