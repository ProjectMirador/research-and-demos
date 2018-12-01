import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import OpenSeaDragon from 'openseadragon';
import ns from '../config/css-ns';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
class Window extends Component {
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
   * @param {object} props (from react/redux)
   */
  render() {
    const { manifest, window } = this.props;
    if (manifest.manifestation) {
      return (
        <div className={ns('window')} style={this.styleAttributes()}>
          <div className={ns('window-heading')}>
            <h3>{manifest.manifestation.getLabel().map(label => label.value)[0]}</h3>
          </div>
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
