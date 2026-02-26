import { test, expect } from "@playwright/test";
import { performDeposit } from "../utils/atmHelper";

// ======= SETUP =======

test.beforeEach(async ({ page }) => {
    //login
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456"); 
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234"); 
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByRole("heading", { name: "ยอดเงินคงเหลือ" })).toBeVisible();

    await page.getByRole('heading', { name: 'ฝากเงิน' }).click();
    await page.getByPlaceholder('0').click();
});


// ====== valid deposit amount ======

// edge case (lower boundary)
test("deposit with valid amount (1 Baht)", async ({ page }) => {
  await performDeposit(page, '1', 'fill');
});

// edge case (upper boundary)
test("deposit with valid amount (100,000 Baht)", async ({ page }) => {
  await performDeposit(page, '100,000', 'fill');
});

// test quick deposit button
test("deposit with quick button (500 Baht)", async ({ page }) => {
  await performDeposit(page, '500', 'quick_button');
});

test("deposit with quick button (1,000 Baht)", async ({ page }) => {
  await performDeposit(page, '1,000', 'quick_button');
});

test("deposit with quick button (2,000 Baht)", async ({ page }) => {
  await performDeposit(page, '2,000', 'quick_button');
});

test("deposit with quick button (5,000 Baht)", async ({ page }) => {
  await performDeposit(page, '5,000', 'quick_button');
});

test("deposit with quick button (10,000 Baht)", async ({ page }) => {
  await performDeposit(page, '10,000', 'quick_button');
});

test("deposit with quick button (20,000 Baht)", async ({ page }) => {
  await performDeposit(page, '20,000', 'quick_button');
});

// ====== invalid deposit amount ======

test("deposit with invalid amount (0.1 Baht)", async ({ page }) => {
  await page.getByPlaceholder('0').fill('0.1');
  await page.getByRole('button', { name: 'ฝากเงิน ฿' }).click();
  await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be greater than or equal to 1.');
});

test("deposit with invalid amount (100,000.1 Baht)", async ({ page }) => {
  await page.getByPlaceholder('0').fill('100000.1');
  await page.getByRole('button', { name: 'ฝากเงิน ฿' }).click();
  await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be less than or equal to 100000.');
});

test("deposit with invalid amount (100,001 Baht)", async ({ page }) => {
  await page.getByPlaceholder('0').fill('100001');
  await page.getByRole('button', { name: 'ฝากเงิน ฿' }).click();
  await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be less than or equal to 100000.');
});


