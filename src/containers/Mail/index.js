import React, { Component } from 'react';
import { connect } from 'react-redux';
import DesktopView from './desktopView';
import TabView from './tabView';

class Mail extends Component {
  render() {
    const { view, height } = this.props;
    const MailView = view === 'DesktopView' ? DesktopView : TabView;
    return <MailView height={height} view={view} />;
  }
}
export default connect(state => ({
  ...state.App,
}))(Mail);
