import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ns from '../config/css-ns';
import WindowBackground from './WindowBackground';
import WindowTopBar from './WindowTopBar';
import WindowViewer from './WindowViewer';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
  /**
   * Return style attributes
   */
  styleAttributes() {
    const { window } = this.props;
    return { width: `${window.xywh[2]}px`, height: `${window.xywh[3]}px` };
  }

  /**
   * renderViewer
   *
   * @return {String, null}
   */
  renderViewer() {
    const { manifest, window } = this.props;
    if (manifest) {
      return (
        <WindowViewer
          window={window}
          manifest={manifest}
        />
      );
    }
    return null;
  }

  /**
   * Renders things
   */
  render() {
    const { manifest, window } = this.props;
    return (
      <div className={ns('window')} style={this.styleAttributes()}>
        <WindowTopBar
          windowId={window.id}
          manifest={manifest}
        />
        <WindowBackground
          manifest={manifest}
        />
        {this.renderViewer()}
      </div>
    );
  }
}

Window.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Window.defaultProps = {
  manifest: null,
};

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ windows, manifests }, props) => {
  const window = windows.find(win => props.id === win.id);
  return {
    window,
    manifest: manifests[window.manifestId],
  };
};

export default connect(mapStateToProps)(Window);
