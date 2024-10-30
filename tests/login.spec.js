import { test, expect } from '@playwright/test';

test.describe('Login test', () => {
	test('Đăng nhập thành công với thông tin hợp lệ', async ({ page }) => {
		// Mở trang đăng nhập
		await page.goto('http://localhost:5161/Identity/Account/Login');

		// Điền tên đăng nhập và mật khẩu
		await page.fill('#Input_Email', 'ngocuyenlepham@gmail.com');
		await page.fill('#Input_Password', 'Leuyen@03');

		// Click vào nút đăng nhập
		await page.click('button[type="submit"]');

		// Kiểm tra xem đăng nhập có thành công không (bằng cách kiểm tra sự xuất hiện của một phần tử sau khi đăng nhập)
		await expect(page.locator('#logout')).toBeVisible();
	});
	test('Đăng nhập thất bại khi để trống email', async ({ page }) => {
		await page.goto('http://localhost:5161/Identity/Account/Login');
		await page.fill('#Input_Password', 'Leuyen@03');
		await page.click('button[type="submit"]');
		await expect(page.locator('text=Email là bắt buộc')).toBeVisible(); // Kiểm tra thông báo lỗi
	});

	test('Đăng nhập thất bại với mật khẩu sai', async ({ page }) => {
		await page.goto('http://localhost:5161/Identity/Account/Login');
		await page.fill('#Input_Email', 'ngocuyenlepham@gmail.com');
		await page.fill('#Input_Password', 'saimatkhau');
		await page.click('button[type="submit"]');
		await expect(page.locator('#logout')).not.toBeVisible(); // Kiểm tra nút logout không xuất hiện
		await expect(page.locator('text=Mật khẩu không đúng')).toBeVisible(); // Kiểm tra thông báo lỗi
	});
});

test.describe('Register test', () => {
	test('Đăng ký thành công với thông tin hợp lệ', async ({ page }) => {
		// Mở trang đăng ký
		await page.goto('http://localhost:5161/Identity/Account/Register');

		await page.fill('#Input_FullName', 'ngocuyenlepham@gmail.com');
		await page.fill('#Input_Email', 'ngocuyenlepham@gmail.com');
		await page.fill('#Input_PhoneNumber', 'ngocuyenlepham@gmail.com');
		await page.fill('#Input_Password', 'Leuyen@03');
		await page.fill('#Input_ConfirmPassword', 'Leuyen03');

		// Click vào nút đăng nhập
		await page.click('button[type="submit"]');

		// Kiểm tra xem đăng ký có thành công không (bằng cách kiểm tra sự xuất hiện của một phần tử sau khi đăng ký)
		await expect(page.locator('#logout')).toBeVisible();
	});
});

test('Luồng đăng nhập và điều hướng đến dashboard bằng E2E Testing', async ({
	page,
}) => {
	// Mở trang đăng nhập và thực hiện đăng nhập
	await page.goto('http://localhost:5161/Identity/Account/Login');
	await page.fill('#Input_Email', 'ngocuyenlepham@gmail.com');
	await page.fill('#Input_Password', 'Leuyen@03');
	await page.click('button[type="submit"]');

	// Kiểm tra xem đã đăng nhập thành công
	await expect(page.locator('#logout')).toBeVisible();

	// Điều hướng đến trang tour sau khi đăng nhập
	await page.goto('http://localhost:5161/Tour');
	// await expect(page.locator('text=Chào mừng bạn đến dashboard')).toBeVisible();
});
