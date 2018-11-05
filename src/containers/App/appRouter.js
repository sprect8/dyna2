import React, { Component } from 'react';
import asyncComponent from '../../helpers/AsyncFunc';
import Route from '../../components/utility/customRoute';
import MasterDetailView from '../MasterDetails';
import ReportView from '../Reports/reportview';
import appActions from '../../redux/app/actions';
import { connect } from 'react-redux';

const { loadConfigInput, loadConfigReports } = appActions;

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
}

// get routes from the server
// returned routes will contain links
const routes = [
    {
        path: '',
        component: asyncComponent(() => import('../Dashboard.js')),
    },
    {
        path: 'home',
        component: asyncComponent(() => import('../Dashboard.js')),
    },
    {
        path: 'blank-page',
        component: asyncComponent(() => import('../BlankPage.js')),
    },
    {
        path: 'private-page',
        component: asyncComponent(() => import('../CustomApp.js')),
    },
    {
        path: 'inbox',
        component: asyncComponent(() => import('../Mail')),
    },
    {
        path: 'shop-page',
        component: asyncComponent(() => import('../POS/Algolia')),
    },
    {
        path: 'cart-page',
        component: asyncComponent(() => import('../POS/Cart/')),
    },
    {
        path: 'checkout-page',
        component: asyncComponent(() => import('../POS/Checkout/')),
    },
];

class AppRouter extends Component {
    componentWillMount() {
        const { loadConfigInput, loadConfigReports } = this.props;
        loadConfigInput();
        loadConfigReports();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
    render() {
        const { url, style, configInput, configReports } = this.props;
        let reportConfiguration = configReports || [];
        let tableConfiguration = configInput || [];
        return (
            <div style={style}>
                {routes.map(singleRoute => {
                    const { path, exact, ...otherProps } = singleRoute;
                    return (
                        <Route
                            exact={exact === false ? false : true}
                            key={singleRoute.path}
                            path={`${url}/${singleRoute.path}`}
                            {...otherProps}
                        />
                    );
                })}
                {
                    reportConfiguration.map(x => {
                        return (<PropsRoute key={x.path} path={`${url}/${x.path}`} component={ReportView} config={x.config} />)
                    })
                }
                {
                    tableConfiguration.map(x => {
                        return (<PropsRoute key={x.path} path={`${url}/${x.path}`} component={MasterDetailView} config={x.table} />)
                    })
                }

            </div>
        );
    }
}

//export default AppRouter;
export default connect(
    state => ({
        ...state.App
    }),
    { loadConfigInput, loadConfigReports }
)(AppRouter);