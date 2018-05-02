describe('index', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444/examples/vanilla_js/');
  });

  it('should show a form element', async () => {
    await expect(page).toMatch('input');
  });
});
