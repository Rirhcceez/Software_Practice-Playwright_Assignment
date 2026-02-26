import { expect } from "@playwright/test";

export async function performDeposit(page, amount, method) {

      const amountNumber = parseFloat(amount.replace(/[^0-9.]/g, ''));
      const rawCurrentBalance = await page.locator('div').filter({ hasText: 'ยอดเงินคงเหลือปัจจุบัน฿' }).nth(4).textContent();  
      const cleanNumberString = rawCurrentBalance.replace(/[^0-9.]/g, ''); // "50000.00"
      const currentBalanceNumber = parseFloat(cleanNumberString); // 50000
      const expectedBalanceNumber = currentBalanceNumber + amountNumber; // 50001
      const expectedBalanceText = expectedBalanceNumber.toLocaleString('en-US', { minimumFractionDigits: 2 });

      if (method === 'fill') {
            await page.getByPlaceholder('0').fill(amountNumber.toString());
      } else if (method === 'quick_button') {
            await page.getByRole('button', { name: amount }).click();
      }
      await page.getByRole('button', { name: 'ฝากเงิน ฿' }).click();

      const balanceLocator = page.locator('div').filter({ hasText: 'ยอดเงินคงเหลือปัจจุบัน฿' }).nth(4);
      await expect(balanceLocator).toContainText(expectedBalanceText);
      console.log("Current Balance: ", currentBalanceNumber);
      console.log("New Balance: ", expectedBalanceNumber);
};

export async function performWithdrawal(page, amount, method) {

      const amountNumber = parseFloat(amount.replace(/[^0-9.]/g, ''));
      const rawCurrentBalance = await page.locator('div').filter({ hasText: 'ยอดเงินคงเหลือปัจจุบัน฿' }).nth(4).textContent();  
      const cleanNumberString = rawCurrentBalance.replace(/[^0-9.]/g, ''); // "50000.00"
      const currentBalanceNumber = parseFloat(cleanNumberString); // 50000
      const expectedBalanceNumber = currentBalanceNumber - amountNumber; // 50001
      const expectedBalanceText = expectedBalanceNumber.toLocaleString('en-US', { minimumFractionDigits: 2 });

      if (method === 'fill') {
            await page.getByPlaceholder('0').fill(amountNumber.toString());
      } else if (method === 'quick_button') {
            await page.getByRole('button', { name: amount }).click();
      }
      await page.getByRole('button', { name: 'ถอนเงิน ฿' }).click();

      const balanceLocator = page.locator('div').filter({ hasText: 'ยอดเงินคงเหลือปัจจุบัน฿' }).nth(4);
      await expect(balanceLocator).toContainText(expectedBalanceText);
      console.log("Current Balance: ", currentBalanceNumber);
      console.log("New Balance: ", expectedBalanceNumber);
};

export async function performTransfer(page, amount, method, username) {

      const amountNumber = parseFloat(amount.replace(/[^0-9.]/g, ''));

      const rawCurrentBalance = await page.locator('div').filter({ hasText: 'ยอดเงินคงเหลือปัจจุบัน฿' }).nth(4).textContent();  
      const cleanNumberString = rawCurrentBalance.replace(/[^0-9.]/g, ''); // "50000.00"
      const currentBalanceNumber = parseFloat(cleanNumberString); // 50000
      const expectedBalanceNumber = currentBalanceNumber - amountNumber; // 50001
      const expectedBalanceText = expectedBalanceNumber.toLocaleString('en-US', { minimumFractionDigits: 2 });
      
      await page.getByRole('textbox', { name: 'กรอกหมายเลขบัญชี 6 หลัก' }).fill(username.toString());

      if (method === 'fill') {
            await page.getByPlaceholder('0').click();
            await page.getByPlaceholder('0').fill(amountNumber.toString());
      } else if (method === 'quick_button') {
            await page.getByRole('button', { name: amount }).click();
      }
      
      await page.getByRole('textbox', { name: 'เช่น เงินค่าอาหาร, ค่าเช่าบ้าน' }).fill('Example Note');
      await page.getByRole('button', { name: 'โอนเงิน ฿' }).click();

      const balanceLocator = await page.getByText('ยอดเงินคงเหลือปัจจุบัน฿');
      await expect(balanceLocator).toContainText(expectedBalanceText);
      console.log("Current Balance: ", currentBalanceNumber);
      console.log("New Balance: ", expectedBalanceNumber);
};