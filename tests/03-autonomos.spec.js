const { test, expect } = require('@playwright/test');
test('R05 - No permite confirmar sin nombre de entrega',async ({page})=>{
  await page.goto('/');
  // Precondición: un producto en el carrito y nombre de entrega vacío
  await page.locator('[data-product="Hamburguesa"]').click();
  await expect(page.locator('#cart-count')).toHaveText('1');
  await expect(page.locator('#customer')).toHaveValue('');
  // Acción: intentar confirmar el pedido sin nombre
  await page.getByRole('button',{name:'Confirmar pedido'}).click();
  // Verificación (regla de negocio): el pedido NO debe confirmarse sin nombre
  await expect(page.locator('#message')).not.toContainText('Pedido confirmado');
});
test('R06 - Búsqueda sin coincidencias',async ({page})=>{
  await page.goto('/');
  // Precondición: sin filtro se muestran los 4 productos
  await expect(page.locator('#products .add')).toHaveCount(4);
  // Acción: buscar un producto inexistente
  await page.getByRole('textbox',{name:'Buscar producto'}).fill('Sushi');
  // Verificación: no queda ninguna opción para agregar
  await expect(page.locator('#products .add')).toHaveCount(0);
  await expect(page.locator('#products')).toBeEmpty();
});