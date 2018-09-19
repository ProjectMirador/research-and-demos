import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';
import throttle from 'raf-throttle';
import WindowNavBar from './WindowNavBar';

const getThumbnailForManifest = (manifest) => {
  // TODO: use manifesto or some other spec
  // compliance library to deal with this,
  // since most manifests don't have properly-formatted
  // thumbnails
  return manifest.json.thumbnail['@id']
}

const handleDragWindow = throttle((event, windowId, position, updateWindowPosition) => {
  let x = event.clientX - 400
  let y = event.clientY - 100
  console.log(x + ', ' + y);
  console.log(event)
  updateWindowPosition(windowId, [x,y])
})

/**
 * Represents a Window in the mirador workspace
 * @param {string} manifestId
 * @param {string} windowId
 * @param {array} position
 * @param {function} updateWindowPosition
 */
const Window = ({ manifest, windowId, updateWindowPosition, windows }) => {
  let window = windows.find((window)=> window.id === windowId)
  let position = window.xywh
  return (<div
      draggable="true"
      onDragStart={(event)=>{
      document.addEventListener("dragover", function(event) {

      // prevent default to allow drop
      event.preventDefault();

        }, false);
        let dragImg = new Image()
        dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        event.dataTransfer.setDragImage(dragImg, 0, 0);
      }}
      onDrag={(event)=>{
        event.persist()
        handleDragWindow(
            event,
            windowId,
            position,
            updateWindowPosition
      )}}
      className="mirador-window"
      style={{transform: 'translateX(' + position[0] +'px) translateY('+ position[1] + 'px)'}}
    >
    <img draggable="false" src={getThumbnailForManifest(manifest)}/>
          <WindowNavBar
            windowId={windowId}
          />
        </div>)
};

Window.propTypes = {
  manifest: PropTypes.object,
  windowId: PropTypes.string,
};

const mapStateToProps = state => (
  {
    windows: state.windows
  }
);

const mapDispatchToProps = dispatch =>({
  updateWindowPosition: (windowId, position) => (
    dispatch(actions.updateWindowPosition(windowId, position))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Window);
