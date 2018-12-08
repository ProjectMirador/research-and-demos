import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Window } from './Window';
import { ns } from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
const WorkspaceComponent = ({ windows }) => (
  <div className={ns('workspace')}>
    {
      windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
        />
      ))
    }
  </div>
);

WorkspaceComponent.propTypes = {
  windows: PropTypes.instanceOf(Array).isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
  }
);

export const Workspace = connect(mapStateToProps)(WorkspaceComponent);
