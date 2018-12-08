import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import OpenSeaDragon from 'openseadragon';
import { ns } from '../config/css-ns';
import { WindowTopBar } from './WindowTopBar';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class WindowComponent extends React.Component {
  /**
   * @param {Object} props [description]
   */
  constructor(props) {
    super(props);
    this.miradorInstanceRef = React.createRef();
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    this.instantiateViewer();
    this.fetchTileSource();
    return true;
  }

  /**
   * React lifecycle event
   */
  componentDidUpdate(prevProps) {
    if (this.props.manifest.manifestation !== prevProps.manifest.manifestation) {
      this.instantiateViewer();
      this.fetchTileSource();
    }
  }

  /**
   * instantiateViewer
   */
  instantiateViewer() {
    if (this.miradorInstanceRef.current) {
      this.viewer = OpenSeaDragon({
        id: this.miradorInstanceRef.current.id,
        showNavigationControl: false,
      });
    }
  }

  /**
   * fetchTileSource
   */
  fetchTileSource() {
    const { manifest } = this.props;
    if (manifest.manifestation) {
      fetch(
        `${manifest.manifestation.getSequences()[0].getCanvases()[0].getImages()[0].getResource().getServices()[0].id}/info.json`,
      )
        .then(response => response.json())
        .then((json) => {
          this.viewer.addTiledImage({
            tileSource: json,
            success: (event) => {
              const tiledImage = event.item;

              /**
               * A callback for the tile after its drawn
               * @param  {[type]} e event object
               */
              const tileDrawnHandler = (e) => {
                if (e.tiledImage === tiledImage) {
                  this.viewer.removeHandler('tile-drawn', tileDrawnHandler);
                  this.miradorInstanceRef.current.style.display = 'block';
                }
              };
              this.viewer.addHandler('tile-drawn', tileDrawnHandler);
            },
          });
        })
        .catch(error => console.log(error));
    }
  }

  /**
   * Fetches IIIF thumbnail URL
   */
  thumbnail() {
    const thumb = this.props.manifest.manifestation.getThumbnail() || { id: 'http://placekitten.com/200/300' };
    return thumb.id;
  }

  /**
   * Return style attributes
   */
  styleAttributes() {
    return { width: `${this.props.window.xywh[2]}px`, height: `${this.props.window.xywh[3]}px` };
  }

  /**
   * Renders things
   */
  render() {
    const { manifest, window, store } = this.props;
    if (manifest.manifestation) {
      return (
        <div className={ns('window')} style={this.styleAttributes()}>
          <WindowTopBar
            windowId={window.id}
            manifest={manifest}
            store={store}
          />
          <img src={this.thumbnail()} alt="" />
          <div
            className={ns('osd-container')}
            style={{ display: 'none' }}
            id={`${window.id}-osd`}
            ref={this.miradorInstanceRef}
          />
        </div>
      );
    }
    return null;
  }
}

WindowComponent.propTypes = {
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

WindowComponent.defaultProps = {
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

export const Window = connect(mapStateToProps)(WindowComponent);
