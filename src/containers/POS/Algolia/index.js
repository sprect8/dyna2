import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import DesktopView from './desktopView';
import MobileView from './mobileView';
import actions from '../../../redux/ecommerce/actions';
import './instantSearch.css';
//injectTapEventPlugin(); // injectTapEventPlugin doesn support react 16.4
import appActions from '../../../redux/app/actions';
import { withFormik } from 'formik';

const { changeCurrent } = appActions;
const { changeView, changeViewTopbarCart } = actions;

class InstantSearch extends Component {
	state = {
		collapsed: true,
	};
	componentWillUnmount = () => {
		this.props.changeViewTopbarCart(false);
	}
	changeView = algoliaView => {
		this.props.changeView(algoliaView);
	};	
	changeCollapsed = isCollapsed => {
		this.setState({ collapsed: isCollapsed });
	};
	render() {		
		const { view, algoliaView, changeView, viewTopbarCart } = this.props;
		if (viewTopbarCart) {
			this.props.changeCurrent({"cart-page" : true})
			this.props.history.push("/dashboard/cart-page");
		}
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
export default withRouter(connect(
	state => ({
		view: state.App.view,
		algoliaView: state.Ecommerce.view,
		viewTopbarCart: state.Ecommerce.viewTopbarCart
	}),
	{changeView, changeCurrent, changeViewTopbarCart}
)(InstantSearch));
