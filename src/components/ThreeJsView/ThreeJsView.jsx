import React from "react";
import PropTypes from "prop-types";
import ThreeJsWrapper from "../../helpers/ThreeJsWrapper";

const wrapper = new ThreeJsWrapper();

class ThreeJsView extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps.objectUrl !== this.props.objectUrl)
    return nextProps.objectUrl !== this.props.objectUrl;
  }

  componentDidMount() {
    console.log("Asset name:", this.props.objectUrl)
    if (this.props.objectUrl) wrapper.load(this.ref.current, this.props.objectUrl);
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
