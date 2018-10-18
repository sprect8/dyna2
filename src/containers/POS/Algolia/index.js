import React, { Component } from 'react';
import { connect } from 'react-redux';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import DesktopView from './desktopView';
import MobileView from './mobileView';
import actions from '../../../redux/ecommerce/actions';
import './instantSearch.css';
//injectTapEventPlugin(); // injectTapEventPlugin doesn support react 16.4

class InstantSearch extends Component {
	state = {
		collapsed: true,
	};
	changeView = algoliaView => {
		this.props.changeView(algoliaView);
	};
	changeCollapsed = isCollapsed => {
		this.setState({ collapsed: isCollapsed });
	};
	render() {
		const { view, algoliaView, changeView } = this.props;
		const View = view !== 'MobileView' ? DesktopView : MobileView;
		return (
			<div style={{ height: '100%' }}>
				<View
					view={algoliaView}
					collapsed={this.state.collapsed}
					changeView={changeView}
					changeCollapsed={this.changeCollapsed}
				/>
			</div>
		);
	}
}
export default connect(
	state => ({
		view: state.App.view,
		algoliaView: state.Ecommerce.view,
	}),
	actions
)(InstantSearch);
