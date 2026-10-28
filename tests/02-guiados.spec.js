const { test, expect } = require('@playwright/test');

test('R01 - Rechaza credenciales incorrectas', async ({page})=>{
    await page.goto('/');

    await page.locator('#user').fill('usuarioIncorrecto');
    await page.locator('#password').fill('contrasenaIncorrecta');
    await page.locator('#login').click();

    await expect(page.locator('#login-result')).toHaveText('Credenciales incorrectas');
});

test('R02 - Filtra productos por búsqueda', async ({page})=>{
    await page.goto('/');

    await page.locator('#search').fill('Pizza');

    await expect(page.locator('#products')).toContainText('Pizza');
    await expect(page.locator('#products')).not.toContainText('Tacos');
});

test('R03 - Actualiza contador del carrito', async ({page})=>{
    await page.goto('/');

    await page.locator('[data-product="Pizza"]').click();
    await page.locator('[data-product="Tacos"]').click();

    await expect(page.locator('#cart-count')).toHaveText('2');
});

test('R04 - Impide pedido sin productos', async ({page})=>{
    await page.goto('/');

    await page.locator('#checkout').click();

    await expect(page.locator('#message')).toContainText('Agregue productos al carrito');
});