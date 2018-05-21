describe('index', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444/ui_prototypes/vanilla_js/');
  });

  it('should show a form element', async () => {
    await expect(page).toMatch('input');
  });
});
