import fetch from 'node-fetch';

/**
 * ManifestFetcher
 */
export default class ManifestFetcher {
  /**
   * constructor - description
   *
   * @param  {String} version = 'v2' manifest version request
   * @return {ManifestFetcher}
   */
  constructor(version = 'v2') {
    this.version = version;
  }

  /**
   * fetch - fetches a manifest and parses it as json
   *
   * @param  {String} manifestUri
   * @return {Promise}
   */
  fetch(manifestUri) {
    return fetch(manifestUri, {
      headers: this.headers(),
    })
      .then(response => response.json());
  }

  /**
   * headers - provides headers for fetch request
   *
   * @return {Object}
   */
  headers() {
    switch (this.version) {
      case 'v3':
        return {
          Accept: 'application/ld+json;profile="http://iiif.io/api/presentation/3/context.json"',
        };
      default:
        return {};
    }
  }
}
