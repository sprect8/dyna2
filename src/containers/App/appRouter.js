import React, { Component } from 'react';
import asyncComponent from '../../helpers/AsyncFunc';
import Route from '../../components/utility/customRoute';

// get routes from the server
// returned routes will contain links
const routes = [
  {
    path: '',
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
    path: 'staff-page',
    component: asyncComponent(() => import('../MasterDetails/index.js')),
  },
  {
    path: 'inbox',
    component: asyncComponent(() => import('../Mail')),
  },
  {
    path: 'investments-page',
    component: asyncComponent(() => import('../MasterDetails/index.js')),
  },
  // reports
  {
    path: 'cost-efficiency',
    component: asyncComponent(() => import('../Reports/CostEfficiency'))
  },
  {
    path: 'inventory-optimisation-page',
    component: asyncComponent(() => import('../Reports/InventoryOptimisation'))
  },
  {
    path: 'business-waste',
    component: asyncComponent(() => import('../Reports/BusinessWasteReduction'))
  },
  {
    path: 'business-improvement-page',
    component: asyncComponent(() => import('../Reports/BusinessProcessImprovement'))
  },
  {
    path: 'customer-satisfaction-page',
    component: asyncComponent(() => import('../Reports/CustomerSatisfaction'))
  },
  {
    path: 'platform-engagement-page',
    component: asyncComponent(() => import('../Reports/PlatformEngagement'))
  },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
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
      </div>
    );
  }
}

export default AppRouter;
