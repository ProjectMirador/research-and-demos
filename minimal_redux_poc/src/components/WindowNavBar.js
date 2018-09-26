import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';

const handleNextCanvas = (event, windowId, nextCanvas) => {
  nextCanvas(windowId)
}
const handlePreviousCanvas = (event, windowId, previousCanvas) => {
  previousCanvas(windowId)
}
/**
 * Represents a control bar for navigating
 * the Mirador window content
 *
 * @param {string} windowId
 * @param {function} nextCanvas
 */
const WindowNavBar = ({ windowId, nextCanvas, previousCanvas, windows }) => {
  let window = windows.find((window)=> window.id === windowId)

  return (
      <div className="window-controls">
      <button
        onClick={(event)=>previousCanvas(windowId)}
        className="previous-button"
        type="button">
          Previous
      </button>
      <button
        onClick={(event)=>nextCanvas(windowId)}
        className="next-button"
        type="button">
          Next
      </button>
      </div>
  )
};

WindowNavBar.propTypes = {
  windowId: PropTypes.string,
};

const mapStateToProps = state => (
  {
    windows: state.windows
  }
);

const mapDispatchToProps = dispatch =>({
  nextCanvas: (windowId, position) => (
    dispatch(actions.nextCanvas(windowId))
  ),
  previousCanvas: (windowId, position) => (
    dispatch(actions.previousCanvas(windowId))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WindowNavBar);
