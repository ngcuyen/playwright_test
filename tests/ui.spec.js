import { test, expect } from '@playwright/test';

test.describe('Kiểm thử UI đăng nhập', () => {
	// Kiểm tra trang có hiển thị form đăng nhập
	test('Hiển thị form đăng nhập', async ({ page }) => {
		await page.goto('http://localhost:5161/Identity/Account/Login'); // Điều hướng tới trang đăng nhập

		// Kiểm tra tiêu đề trang
		await expect(page).toHaveTitle(/Đăng nhập/);

		// Kiểm tra xem form đăng nhập có tồn tại
		const usernameField = page.locator('input[name="Input.Email"]');
		const passwordField = page.locator('input[name="Input.Password"]');
		await expect(page.locator('button:has-text("Đăng Nhập")')).toBeVisible();

		// Kiểm tra các trường input có xuất hiện
		await expect(usernameField).toBeVisible();
		await expect(passwordField).toBeVisible();
	});
});
