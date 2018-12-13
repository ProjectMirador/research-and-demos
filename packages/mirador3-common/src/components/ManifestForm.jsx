import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'mirador3-core';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 * @prop {Function} setLastRequested
 */
class ManifestFormComponent extends React.Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
    };
  }

  /**
   * handleInputChange - sets state based on input change.
   * @param  {Event} event
   * @private
   */
  handleInputChange = (event) => {
    const that = this;
    event.preventDefault();
    that.setState({
      formValue: event.target.value,
    });
  }

  /**
   * formSubmit - triggers manifest update and sets lastRequested
   * @param  {Event} event
   * @private
   */
  formSubmit = (event) => {
    event.preventDefault();
    const { fetchManifest, setLastRequested } = this.props;
    const { formValue } = this.state;
    fetchManifest(formValue);
    setLastRequested(formValue);
  }

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { formValue } = this.state;
    return (
      <form onSubmit={this.formSubmit}>
        <input
          value={formValue}
          id="manifestURL"
          type="text"
          onChange={this.handleInputChange}
        />
        <button id="fetchBtn" type="submit">FetchManifest</button>
      </form>
    );
  }
}

ManifestFormComponent.propTypes = {
  fetchManifest: PropTypes.func.isRequired,
  setLastRequested: PropTypes.func.isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof ManifestForm
 * @private
 */
const mapStateToProps = () => (
  {}
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = dispatch => ({
  fetchManifest: manifestUrl => (
    dispatch(actions.fetchManifest(manifestUrl))
  ),
});

export const ManifestForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManifestFormComponent);
