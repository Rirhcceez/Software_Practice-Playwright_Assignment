import { test, expect } from "@playwright/test";


// ======= SETUP =======

test.beforeEach(async ({ page }) => {
    // login
    await page.goto("https://atm-buddy-lite.lovable.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExY1RVU2UzVlhZNU1ZVFV6SwEeG95HaKRUZ4S4SsfHUDDsw3FFGPEyhRh_Fn_77KciqvuNxyxd4FkEFK02O9c_aem_ycGlUd5UYRQc-LADxvwcLQ");
    await page.getByText("ATM BANKINGระบบ ATM อัตโนมัติ").click();
    await page.getByRole("textbox", { name: "ตัวอย่าง:" }).fill("User1"); 
    await page.getByRole("textbox", { name: "รหัส PIN 4 หลัก" }).fill("1234");
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await expect(page.getByRole("heading", { name: "ยอดเงินคงเหลือ" })).toBeVisible();
});

// ====== Logout ======

test("Logout Button", async ({ page }) => {
    await page.getByRole("button", { name: "ออกจากระบบ" }).click();
    await expect(page.getByRole("heading", { name: "เข้าสู่ระบบ" })).toBeVisible();
});
