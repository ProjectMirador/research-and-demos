import { JSDOM } from 'jsdom'; // eslint-disable-line import/no-extraneous-dependencies
import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import Enzyme from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

const jsdom = new JSDOM('<!doctype html><html><body/></html>');
const { window } = jsdom;

/**
 * copyProps
 */
function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

window.HTMLCanvasElement.prototype.getContext = () => {};
jest.setMock('node-fetch', fetch);
global.fetch = require('jest-fetch-mock'); // eslint-disable-line import/no-extraneous-dependencies

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });
