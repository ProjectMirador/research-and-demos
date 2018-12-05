import ManifestFetcher from '../../../src/lib/ManifestFetcher';

describe('ManifestFetcher', () => {
  let fetcher = null;
  beforeEach(() => {
    fetcher = new ManifestFetcher();
  });
  it('defaults to v2', () => {
    expect(fetcher.version).toBe('v2');
  });
  describe('headers', () => {
    it('returns Accept header for v3', () => {
      expect(new ManifestFetcher('v3').headers()).toEqual({
        Accept: 'application/ld+json;profile="http://iiif.io/api/presentation/3/context.json"',
      });
    });
  });
});
