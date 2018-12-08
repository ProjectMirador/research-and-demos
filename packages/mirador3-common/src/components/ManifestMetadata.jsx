import * as React from 'react';
import PropTypes from 'prop-types';
import { ns } from '../config/css-ns';

/**
 * ManifestMetadata
 * @param {object} window
 */
export class ManifestMetadata extends React.Component {
  /**
   * Renders things
   * @param {object} props
   */
  render() {
    const { manifest } = this.props;
    return (
      <div>
        <h3>
          { manifest.manifestation.getLabel().map(label => label.value)[0] }
        </h3>
        <div className={ns('description')}>
          { manifest.manifestation.getDescription().map(label => label.value) }
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
