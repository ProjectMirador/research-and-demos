import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {actions, store} from 'mirador3-core'
import { Display, ManifestForm, ManifestListItem, Workspace, ns } from 'mirador3-common'

require("./index.scss");

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
class AppComponent extends React.Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      lastRequested: '',
    };
  }

  /**
   * setLastRequested - Sets the state lastRequested
   *
   * @private
   */
  setLastRequested = (requested) => {
    this.setState({
      lastRequested: requested,
    });
  }

  /**
   * computedContent - computes the content to be displayed based on logic
   *
   * @return {type}  description
   * @private
   */
  computedContent() {
    const manifest = this.props.manifests[this.state.lastRequested];
    if (manifest) {
      if (manifest.isFetching) {
        return '☕';
      }
      if (manifest.error) {
        return manifest.error.message;
      }
      return JSON.stringify(manifest.json, 0, 2);
    }
    return 'Nothing Selected Yet';
  }

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const manifestList = Object.keys(this.props.manifests).map(manifest => (
      <ManifestListItem
        key={manifest}
        manifest={manifest}
      />
    ));
    return (
      <div className={ns('app')}>
        <Workspace />
        <div className={ns('control-panel')}>
          <ManifestForm setLastRequested={this.setLastRequested} />
          <ul>{manifestList}</ul>

          <Display
            manifest={this.props.manifests[this.state.lastRequested]}
          />
        </div>
      </div>
    );
  }
}

AppComponent.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = dispatch => ({
  fetchManifest: manifestUrl => (
    dispatch(actions.fetchManifest(manifestUrl))
  ),
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

const config = {
  "id" : "mirador",
  "plugins" : ["HelloWorld"]
}

ReactDOM.render(
  <Provider store={store}>
    <App config={config} />
  </Provider>,
  document.getElementById(config.id),
);
