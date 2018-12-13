import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'mirador3-core';
import {
  Display, ManifestForm, ManifestListItem, Workspace, ns,
} from 'mirador3-common';

require('../styles/index.scss');

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
  };

  /**
   *
   * @returns {*}
   */
  computedContent() {
    const { manifests } = this.props;
    const { lastRequested } = this.state;
    const manifest = manifests[lastRequested];
    if (manifest) {
      if (manifest.isFetching) {
        return '☕';
      }
      if (manifest.error) {
        return manifest.error.message;
      }
      return JSON.stringify(manifest.json, [], 2);
    }
    return 'Nothing Selected Yet';
  }

  /**
   *
   * @returns {*[]}
   */
  buildManifestList() {
    const { manifests } = this.props;
    return Object.keys(manifests).map(manifest => (
      <ManifestListItem key={manifest} manifest={manifest} />));
  }

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { manifests } = this.props;
    const { lastRequested } = this.state;
    const manifestList = Object.keys(manifests).map(manifest => (
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
            manifest={manifests[lastRequested]}
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
