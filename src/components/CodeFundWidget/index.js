/*
 * Ethical ad from CodeFund.
 */

import React, { Component } from "react";
import { browserHistory } from "react-router";
import injectSheet from "react-jss";
import theme from "../../theme";

const styles = {
  container: {
    minHeight: 145
  },
  [theme.media.sm]: {
    container: {
      display: "none"
    }
  }
};

class CodeFundWidget extends Component {
  static propTypes = {
    classes: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.unlisten = browserHistory.listen(location => {
      if (location.action === "PUSH") {
        this.node.innerHTML = "";
        // eslint-disable-next-line no-underscore-dangle
        window._codefund.serve();
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onRef = node => {
    this.node = node;
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        ref={this.onRef}
        id="codefund_ad"
        // SeedAndDew class
        // "Since our subscribers provide revenue, we require that projects provide an ad-free experience for them"
        className={`snd-ad ${classes.container}`}
      />
    );
  }
}

export default injectSheet(styles)(CodeFundWidget);
