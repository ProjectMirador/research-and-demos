import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'mirador3-core';
import { ns } from '../config/css-ns';


/**
 * WindowTopBar
 */
class WindowTopBarComponent extends React.Component {
  /**
   * render - description
   * @return {type}  description
   */
  render() {
    return (
      <div className={ns('window-top-bar')}>
        <h3>{this.props.manifest.manifestation.getLabel().map(label => label.value)[0]}</h3>
        <button
          type="button"
          className={ns('window-close')}
          aria-label="Close Window"
          onClick={() => this.props.removeWindow(this.props.windowId)}
        >
          &times;
        </button>
      </div>
    );
  }
}

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
*/
const mapStateToProps = ({ windows, manifests }, props) => {
  const window = windows.find(win => props.windowId === win.id);
  return {
    window,
    manifest: manifests[window.manifestId],
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = dispatch => ({
  removeWindow: windowId => (
    dispatch(actions.removeWindow(windowId))
  ),
});

WindowTopBarComponent.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowTopBarComponent.defaultProps = {
  manifest: null,
};


export const WindowTopBar = connect(mapStateToProps, mapDispatchToProps)(WindowTopBarComponent);
