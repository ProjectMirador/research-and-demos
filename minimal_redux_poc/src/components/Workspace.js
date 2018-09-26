import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';
import Window from './Window';

/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */
const Workspace = ({ windows, manifests }) => (
    <div className="mirador-workspace">
    {
      windows.map(window => (
        <Window
          key={window.id}
          windowId={window.id}
          manifest={manifests[window.manifestId]}
        />
      ))
    }
  </div>
);

Workspace.propTypes = {
  windows: PropTypes.instanceOf(Array),
};

const mapStateToProps = state => (
  {
    windows: state.windows,
    manifests: state.manifests
  }
);

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);
