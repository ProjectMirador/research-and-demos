import React from 'react';
import { shallow } from 'enzyme';
// import { store } from '../../../src/store';
import configureStore from 'redux-mock-store';
import Workspace from '../../../src/components/Workspace';

describe('Workspace', () => {
  const initialState = {
    workspace: {},
    manifests: {
      'http://example.org': { },
    },
    windows: [
      {
        id: 'foo',
        canvasIndex: 0,
        collectionIndex: 0,
        manifestIndex: 0,
        rangeId: null,
        xywh: null,
        rotation: null,
      },
      {
        id: 'bar',
        canvasIndex: 0,
        collectionIndex: 0,
        manifestIndex: 0,
        rangeId: null,
        xywh: null,
        rotation: null,
      },
    ],
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Workspace store={store} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('div.mirador-workspace').length).toBe(1);
    expect(wrapper.find('div.window').length).toBe(2);
  });
});
