import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';
import throttle from 'raf-throttle';

let x = 0;
let y = 0;
let width = 200;
let height = 200;

const getThumbnailForManifest = (manifest) => {
  // TODO: use manifesto or some other spec
  // compliance library to deal with this,
  // since most manifests don't have properly-formatted
  // thumbnails
  return manifest.json.thumbnail['@id']
}

// const throttle = (func, limit) => {
//   let inThrottle
//   return function() {
//     const args = arguments
//     const context = this
//     if (!inThrottle) {
//       func.apply(context, args)
//       inThrottle = true
//       setTimeout(() => inThrottle = false, limit)
//     }
//   }
// }

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
 * @param {function} updateWindow
 */
const Window = ({ manifest, windowId, position, updateWindowPosition }) => (
    <div
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
    <div className="window-controls">
    <button
  onClick={(event)=>{
    console.log('clicked Previous')
  }}
  className="next-button" type="button">Previous</button>
    <button
  onClick={(event)=>{
    console.log('clicked Next')
  }}
  className="previous-button" type="button">Next</button>
    </div>
    </div>
);

Window.propTypes = {
  manifest: PropTypes.object,
  windowId: PropTypes.string,
};

const mapStateToProps = state => (
  {
    position: state.windows[0].xywh // find way to select passed in window
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
