import React, { Component } from 'react';
import Tab from "./Tab";
class Tabs extends Component{

  // keeps track of which tab is active, displays a list of tabs and the content for the active tab. connecting to redux?

  this.state = {
      activeTab: this.props.activeTab
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }
}
export default connect () (Tabs)
