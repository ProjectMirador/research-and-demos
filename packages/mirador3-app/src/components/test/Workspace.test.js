import React from 'react';
import { shallow } from 'enzyme';
import { actions, store } from '../../../src/store';
import Workspace from '../../../src/components/Workspace';
import fixture from '../../fixtures/2.json';

describe('Workspace', () => {
  let wrapper;
  beforeEach(() => {
    store.dispatch(actions.receiveManifest('foo', fixture));
    store.dispatch(actions.addWindow({ manifestId: 'foo' }));
    wrapper = shallow(<Workspace store={store} />).dive();
  });

  it('renders without an error', () => {
    const window = store.getState().windows[0];
    expect(wrapper.find('div.mirador-workspace').length).toBe(1);
    expect(wrapper.find(`#${window.id}`).length).toBe(1);
  });
});
