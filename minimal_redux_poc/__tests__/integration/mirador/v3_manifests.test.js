/* global miradorInstance */

describe('v3 manifests', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('requests a v3 manifest', async () => {
    const v3Manifest = 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/c070934c-79ca-426c-a115-aee7d810579e.json';
    await page.evaluate(() => {
      const a = miradorInstance.actions.updateConfig({ manifestRequestVersion: 'v3' });
      miradorInstance.store.dispatch(a);
    });
    await expect(page).toFill('#manifestURL', v3Manifest);
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(2000);
    const manifest = await page.evaluate(url => (
      miradorInstance.store.getState().manifests[url].manifestation.context
    ), v3Manifest);
    await expect(manifest).toContain('http://www.w3.org/ns/anno.jsonld', 'http://iiif.io/api/presentation/3/context.json');
  });
});
