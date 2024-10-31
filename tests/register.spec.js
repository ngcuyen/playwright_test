import test, { expect } from '@playwright/test';

test.describe('Register test', () => {
	test('Đăng ký thành công với thông tin hợp lệ', async ({ page }) => {
		// Mở trang đăng ký
		await page.goto('http://localhost:5161/Identity/Account/Register');

		await page.fill('#Input_FullName', 'ngocuyenlepham');
		await page.fill('#Input_Email', 'ngocuyen@gmail.com');
		await page.fill('#Input_PhoneNumber', '0335346267');
		await page.fill('#Input_Password', 'Leuyen@03');
		await page.fill('#Input_ConfirmPassword', 'Leuyen@03');

		// Click vào nút đăng nhập
		await page.click('button[type="submit"]');

		// Kiểm tra xem đăng ký có thành công không (bằng cách kiểm tra sự xuất hiện của một phần tử sau khi đăng ký)
		await expect(page.locator('#logout')).toBeVisible();
	});
	test('Đăng ký không thành công với mật khẩu sai định dạng', async ({
		page,
	}) => {
		// Mở trang đăng ký
		await page.goto('http://localhost:5161/Identity/Account/Register');

		await page.fill('#Input_FullName', 'ngocuyenlepham');
		await page.fill('#Input_Email', 'ngocuyenlepham@gmail.com');
		await page.fill('#Input_PhoneNumber', '0335346268');
		await page.fill('#Input_Password', 'Leuyen03');
		await page.fill('#Input_ConfirmPassword', 'Leuyen03');

		// Click vào nút đăng nhập
		await page.click('button[type="submit"]');

		// Kiểm tra xem đăng ký có thành công không (bằng cách kiểm tra sự xuất hiện của một phần tử sau khi đăng ký)
		await expect(page.locator('#logout')).not.toBeVisible();
	});
});
