import React from "react";
import PropTypes from "prop-types";
import ThreeJsWrapper from "../../helpers/ThreeJsWrapper";

const wrapper = new ThreeJsWrapper();

class ThreeJsView extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  /**
   * The component should update only if the object url change
   * @param nextProps
   * @param nextState
   * @param nextContext
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.objectUrl !== this.props.objectUrl;
  }

  componentDidMount() {
    wrapper.initializeScene(this.ref.current); // Initialize the three.js scene
    if (this.props.objectUrl) wrapper.load(this.props.objectUrl); // Load the object from the url
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    wrapper.unload() // Unload the previous object
    if (this.props.objectUrl) {
      wrapper.load(this.props.objectUrl); // Load the new one
    }
  }

  componentWillUnmount() {
    wrapper.unloadAll(); // Dispose of the scene and the renderer
  }

  render() {
    return (
      <div ref={this.ref} style={{ width: "90%", height: "500px" }} />
    );
  }
}

ThreeJsView.propTypes = {
  objectUrl: PropTypes.string,
  materialUrl: PropTypes.string
};

ThreeJsView.defaultProps = {
  objectUrl: null,
  materialUrl: null
};

export default ThreeJsView;
