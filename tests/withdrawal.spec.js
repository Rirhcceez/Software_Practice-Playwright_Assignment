import { test, expect } from "@playwright/test";
import { performWithdrawal } from "../utils/atmHelper";
import { waitForDebugger } from "inspector";
// ======= SETUP =======

test.beforeEach(async ({ page }) => {
    //login
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456"); 
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234"); 
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByRole("heading", { name: "ยอดเงินคงเหลือ" })).toBeVisible();

    //go to withdrawal page
    await page.getByRole('heading', { name: 'ถอนเงิน' }).click();
    await page.getByPlaceholder('0').click();
});


// ====== valid withdrawal amount ======

// edge case (lower boundary)
test("withdraw with valid amount (100 Baht)", async ({ page }) => {
    await performWithdrawal(page, '100', 'fill');
});

// edge case (upper boundary)
test("withdraw with valid amount (50,000 Baht)", async ({ page }) => {
    await performWithdrawal(page, '50,000', 'fill');
});

// test quick deposit button
test("withdraw with valid amount (500 Baht)", async ({ page }) => {
    await performWithdrawal(page, '500', 'quick_button');
});

test("withdraw with valid amount (1,000 Baht)", async ({ page }) => {
    await performWithdrawal(page, '1,000', 'quick_button');
});

test("withdraw with valid amount (2,000 Baht)", async ({ page }) => {
    await performWithdrawal(page, '2,000', 'quick_button');
});

test("withdraw with valid amount (5,000 Baht)", async ({ page }) => {
    await performWithdrawal(page, '500', 'quick_button');
});

test("withdraw with valid amount (10,000 Baht)", async ({ page }) => {
    await performWithdrawal(page, '10,000', 'quick_button');
});

test("withdraw with valid amount (20,000 Baht)", async ({ page }) => {
    await performWithdrawal(page, '20,000', 'quick_button');
});

// ====== invalid withdrawal amount ======

test("withdraw with invalid amount (99 Baht)", async ({ page }) => {
  await page.getByPlaceholder('0').fill('99');
  await page.getByRole('button', { name: 'ถอนเงิน ฿' }).click();
  await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be greater than or equal to 100.');
});

test("withdraw with invalid amount (99.1 Baht)", async ({ page }) => {
  await page.getByPlaceholder('0').fill('99.1');
  await page.getByRole('button', { name: 'ถอนเงิน ฿' }).click();
  await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be greater than or equal to 100.');
});

test("withdraw with invalid amount that are not multiple of 100 (every range)", async ({ page }) => {
    const invalidAmounts = [150, 250, 550, 1050, 2050, 5050, 10050, 20050];
    for (const invalidAmount of invalidAmounts) {
        const lowerValid = Math.floor(invalidAmount / 100) * 100;
        const upperValid = Math.ceil(invalidAmount / 100) * 100;
        await page.getByPlaceholder('0').fill(invalidAmount.toString());
        await page.getByRole('button', { name: 'ถอนเงิน ฿' }).click();
        await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', `Please enter a valid value. The two nearest valid values are ${lowerValid} and ${upperValid}.`);
    }
});