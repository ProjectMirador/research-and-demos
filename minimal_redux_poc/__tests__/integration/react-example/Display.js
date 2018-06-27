import React, { Component } from 'react';

import m3core from '../../../index.umd';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
      lastRequested: '',
      content: 'Nothing Selected Yet',
    };
    m3core.store.subscribe(() => {
      const manifest = m3core.store.getState().manifests[this.state.lastRequested];

      if (manifest) {
        if (manifest.isFetching) {
          this.setState({
            content: '☕',
          });
          return;
        } else if (manifest.error) {
          this.setState({
            content: manifest.error.message,
          });
          return;
        }

        this.setState({
          content: JSON.stringify(manifest.json, 0, 2),
        });
      }
    });
  }
  render() {
    return (
      <div className="Display">
            <img src="{ this.state.content.canvases[0].images[0].resource['@id'] }"/>
      </div>
    );
  }
}

export default Display;
