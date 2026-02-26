import { test, expect } from "@playwright/test";
import { performDeposit, performTransfer } from "../utils/atmHelper";

// ======= SETUP =======

test.beforeEach(async ({ page }) => {
    //login
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456"); 
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234"); 
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByRole("heading", { name: "ยอดเงินคงเหลือ" })).toBeVisible();

    await page.getByRole('heading', { name: 'โอนเงิน' }).click();
});

// ===== valid transfer amount ======    

// edge case (lower boundary)
test("transfer with valid amount (1 Baht)", async ({ page }) => {
    await performTransfer(page, '1', 'fill', '789012');
});

// edge case (upper boundary)
test("transfer with valid amount (200,000 Baht)", async ({ page }) => {
    // Deposit 200,000 Baht first to ensure sufficient balance for transfer
    await page.getByRole('button', { name: 'กลับ' }).click();
    await page.getByRole('heading', { name: 'ฝากเงิน' }).click();
    await performDeposit(page, '100,000', 'fill');
    await performDeposit(page, '100,000', 'fill');

    // Navigate to Tansfer page and perform transfer
    await page.getByRole('button', { name: 'กลับ' }).click();
    await page.getByRole('heading', { name: 'โอนเงิน' }).click();
    await performTransfer(page, '200,000', 'fill', '789012');
});

// test quick transfer button
test("transfer with valid amount (1,000 Baht)", async ({ page }) => {
    await performTransfer(page, '1,000', 'quick_button', '789012');
});

test("transfer with valid amount (2,000 Baht)", async ({ page }) => {
    await performTransfer(page, '2,000', 'quick_button', '789012');
});

test("transfer with valid amount (5,000 Baht)", async ({ page }) => {
    await performTransfer(page, '5,000', 'quick_button', '789012');
});

test("transfer with valid amount (10,000 Baht)", async ({ page }) => {
    await performTransfer(page, '10,000', 'quick_button', '789012');
});

test("transfer with valid amount (20,000 Baht)", async ({ page }) => {
    await performTransfer(page, '20,000', 'quick_button', '789012');
});

test("transfer with valid amount (50,000 Baht)", async ({ page }) => {
    await performTransfer(page, '50,000', 'quick_button', '789012');
});

// ====== invalid transfer amount ======

test("transfer with invalid amount (0.1 Baht)", async ({ page }) => {
    await page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' }).fill('789012');
    await page.getByPlaceholder('0').fill('0.1');
    await page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' }).fill('Example Note');
    await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be greater than or equal to 1.');
});

test("transfer with invalid amount (200,001 Baht)", async ({ page }) => {
    // Deposit 200,000 Baht first to ensure sufficient balance for transfer
    await page.getByRole('button', { name: 'กลับ' }).click();
    await page.getByRole('heading', { name: 'ฝากเงิน' }).click();
    await performDeposit(page, '100,000', 'fill');
    await performDeposit(page, '100,000', 'fill');

    // Navigate to Tansfer page and perform transfer
    await page.getByRole('button', { name: 'กลับ' }).click();
    await page.getByRole('heading', { name: 'โอนเงิน' }).click();
    await page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' }).fill('789012');
    await page.getByPlaceholder('0').fill('200001');
    await page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' }).fill('Example Note');
    await expect(page.getByPlaceholder('0')).toHaveJSProperty('validationMessage', 'Value must be less than or equal to 200000.');
});

test("transfer with invalid amount (0 Baht)", async ({ page }) => {
    await page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' }).fill('789012');
    await page.getByPlaceholder('0').fill('0');
    await page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' }).fill('Example Note');
    await expect(page.getByRole('button', { name: 'โอนเงิน ฿' })).toBeDisabled();
});

test("transfer with exceed current balance (50,001 Baht)", async ({ page }) => {
    await page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' }).fill('789012');
    await page.getByPlaceholder('0').fill('50001');
    await page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' }).fill('Example Note');
    await expect(page.getByRole('button', { name: 'โอนเงิน ฿' })).toBeDisabled();
});

// ===== invalid recipient account number ======

test("transfer with exceed current balance (50,001 Baht)", async ({ page }) => {
    await page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' }).fill('111111');
    await page.getByPlaceholder('0').fill('50001');
    await page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' }).fill('Example Note');
    await expect(page.getByRole('button', { name: 'โอนเงิน ฿' })).toBeDisabled();
});