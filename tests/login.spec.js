import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";

// ====== Login with invalid credentials ======

const records = parse(fs.readFileSync(path.join(__dirname, "../utils/valid_users.csv")), {
  columns: true,
  skip_empty_lines: true,
});


for (const record of records) {
    test(`Login ${record.id}`, async ({ page }) => {
        await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
        console.log(record.id, record.username, record.password);
        await page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
        await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill(record.username);
        await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
        await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill(record.password);
        await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
        await expect(page.getByRole("heading", { name: "ยอดเงินคงเหลือ" })).toBeVisible();
        await page.getByRole("button", { name: "ออกจากระบบ" }).click();
    });
}


// ====== Login with invalid credentials ======

test("Login with invalid username", async ({ page }) => {
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("invalid_user");
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByText("ข้อมูลไม่ถูกต้อง", { exact: true })).toBeVisible();
});

test("Login with not existed username", async ({ page }) => {
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("000000");
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByText("ข้อมูลไม่ถูกต้อง", { exact: true })).toBeVisible();
});

test("Login with wrong password", async ({ page }) => {
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("123456");
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).click();
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1233");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByText("ข้อมูลไม่ถูกต้อง", { exact: true })).toBeVisible();
});
