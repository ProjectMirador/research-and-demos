import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';

/**
 * ManifestMetadata
 * @param {object} window
 */
export default class ManifestMetadata extends Component {
  /**
   * Renders things
   * @param {object} props
   */
  render() {
    return (
      <div>
        <h3>
          {this.props.manifest.manifestation.getLabel().map(label => label.value)[0]}
        </h3>
        <div className={ns('description')}>
          {this.props.manifest.manifestation.getDescription().map(label => label.value)}
        </div>
      </div>
    );
  }
}

ManifestMetadata.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ManifestMetadata.defaultProps = {
  manifest: null,
};
