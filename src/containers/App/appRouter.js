import React, { Component } from 'react';
import asyncComponent from '../../helpers/AsyncFunc';
import Route from '../../components/utility/customRoute';
import MasterDetailView from '../MasterDetails';

// configuration for the application
const staff = {
	"tableName": "Staff",
	"displayName": "Staff Records",
	"description": "These are your staff records, edit, add, remove and view any details",
	"columns":[
		{"name":"staff_id", "display":"Staff Id", "type":"number", "sequence":"staff_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"staff_fname", "display":"First Name", "type":"text", "mandatory":true},
		{"name":"staff_sname", "display":"Surname", "type":"text", "mandatory":true},
		{"name":"staff_uid", "display":"Identity Card", "type":"text", "mandatory":true, "unique":true},
		{"name":"staff_joined", "display":"Joined", "type":"timestamp", "mandatory":true},
		{"name":"staff_status", "display":"Status", "type":"text", "mandatory":true, "lov":["ACTIVE", "INACTIVE", "PROBATION"]},
		{"name":"staff_type", "display": "Type", "type":"text", "mandatory":true, "lov":["Full Time", "Part Time", "Sales", "Contractor"],},
		{"name":"staff_address", "display":"Address", "type":"text", "mandatory":true},
		{"name":"staff_salary", "display":"Salary (month)", "type":"number", "mandatory":true}
	]
}

const inventory = {
	"tableName": "Inventory",
	"displayName": "Inventory Records",
	"description": "These are your Inventory records, edit, add, remove and view any details. Records of what items you have (by batch)",
	"columns":[
		{"name":"inv_id", "display":"Inventory Id", "type":"number", "sequence":"inv_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"inv_prod_id", "display":"Product", "type":"text", "mandatory":true, "ref":"Product"},
		{"name":"inv_purchase_date", "display":"Purchase Date", "type":"timestamp", "mandatory":true},
		{"name":"inv_expiry_date", "display":"Expiry Date", "type":"timestamp", "mandatory":true},
		{"name":"inv_units_in_stock", "display":"Amount in Stock", "type":"number", "mandatory":true, "lov":["ACTIVE", "INACTIVE", "PROBATION"]},
		{"name":"inv_unit_price", "display": "Cost", "type":"number", "mandatory":true, "lov":["Full Time", "Part Time", "Sales", "Contractor"],},
		
	]
}

const products = {
	"tableName": "Product",
	"displayName": "Product Records",
	"description": "These are your Product records, edit, add, remove and view any details",
	"columns":[
		{"name":"prod_id", "display":"Product Id", "type":"number", "sequence":"prod_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"prod_name", "display":"Name", "type":"text", "mandatory":true, "unique":true},
		{"name":"prod_desc", "display":"Description", "type":"text"},
		{"name":"prod_supl_id", "display":"Supplier", "type":"number", "mandatory":true, "ref":"Supplier"},
		{"name":"prod_cate_id", "display":"Category", "type":"number", "mandatory":true, "ref":"Product_Category"},
		{"name":"prod_units_on_order", "display":"Units on Order", "type":"number", "mandatory":true},		
		{"name":"prod_discontinued", "display":"Discontinued", "type":"text", "mandatory":true, "lov":["Discontinued", "In Stock", "Active", "Phase Out"]},
		{"name":"prod_picture", "display":"Picture", "type":"text"}
	]
}

const productCategory = {
	"tableName": "Product_Category",
	"displayName": "Product Categories Records",
	"description": "These are your Product Category records, edit, add, remove and view any details",
	"columns":[
		{"name":"cate_id", "display":"Category Id", "type":"number", "sequence":"cate_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"cate_name", "display":"Name", "type":"text", "mandatory":true, "unique":true},
		{"name":"cate_desc", "display":"Description", "type":"text"},		
	]
}

const sales = {
	"tableName": "Sales",
	"displayName": "Sales Records",
	"description": "These are your Sales records, edit, add, remove and view any details",
	"columns":[
		{"name":"sale_id", "display":"Sales Id", "type":"number", "sequence":"sale_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"sale_staff_id", "display":"Staff", "type":"number", "mandatory":true, "unique":true, "ref":"Staff"},
		{"name":"sale_prod_id", "display":"Product", "type":"number", "ref":"Product"},
		{"name":"sale_price", "display":"Price", "type":"number", "mandatory":true},
		{"name":"sale_cost", "display":"Cost", "type":"number", "mandatory":true},
		{"name":"sale_timestamp", "display":"Sales Date", "type":"timestamp", "mandatory":true},		
		{"name":"sale_cust_id", "display":"Customer", "type":"number", "ref":"Customer"},
		{"name":"sale_status", "display":"Status", "type":"text", "lov":["SOLD", "RETURNED", "EXCHANGE", "REFUNDED"]}
	]
}

const suppliers = {
	"tableName": "Suppliers",
	"displayName": "Suppliers Records",
	"description": "These are your Supplier records, edit, add, remove and view any details",
	"columns":[
		{"name":"supl_id", "display":"Supplier Id", "type":"number", "sequence":"supl_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"supl_company", "display":"Name", "type":"text", "mandatory":true},
		{"name":"supl_contact_person", "display":"Contact Person", "type":"text", "mandatory":true},
		{"name":"supl_address", "display":"Address", "type":"text", "mandatory":true},
		{"name":"supl_phone", "display":"Phone", "type":"number", "mandatory":true},		
		{"name":"supl_mobile", "display":"Mobile", "type":"number", "mandatory":true},
		{"name":"supl_email", "display":"Email", "type":"text"},		
	]
}

const deliveries = {
	"tableName": "Deliveries",
	"displayName": "Delivery Records",
	"description": "These are your Delivery records for your suppliers, edit, add, remove and view any details",
	"columns":[
		{"name":"devy_id", "display":"Delivery Id", "type":"number", "sequence":"devy_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"devy_prod_id", "display":"Product", "type":"number", "mandatory":true, "ref":"Product"},
		{"name":"devy_supl_id", "display":"Supplier", "type":"number", "mandatory":true, "ref":"Supplier"},
		{"name":"devy_request_date", "display":"Request Date", "type":"timestamp", "mandatory":true},
		{"name":"devy_delivery_date", "display":"Delivery Date", "type":"timestamp", "mandatory":true},
		{"name":"devy_status", "display":"Status", "type":"text", "mandatory":true, "lov":["ON TIME", "LATE", "VERY LATE", "BUSINESS IMPACTING"]},		
		{"name":"devy_comment", "display":"Comment", "type":"text"}
	]
}

const investments = {
	"tableName": "Investments",
	"displayName": "Investment Records",
	"description": "These are your Investment records, edit, add, remove and view any details",
	"columns":[
		{"name":"inst_id", "display":"Investment Id", "type":"number", "sequence":"inst_id_seq", "mandatory":true, "unique":true, "key":true},		
		{"name":"inst_name", "display":"Name", "type":"text", "mandatory":true},
    {"name":"inst_desc", "display":"Description", "type":"text"},
    {"name":"inst_timestamp", "display":"Investment Made", "type":"timestamp", "mandatory":true},
		{"name":"inst_units", "display":"Total Amount", "type":"number", "mandatory":true},
		{"name":"inst_cost", "display":"Total Cost", "type":"number", "mandatory":true},
		{"name":"inst_status", "display":"Status", "type":"text", "mandatory":true, "lov":["DECOMMISSIONED", "ACTIVE", "ORDERED"]},
		{"name":"inst_comment", "display":"Comment", "type":"text"},
		{"name":"inst_comment", "display":"Picture", "type":"file"}
	]
}

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
    }}/>
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
        <PropsRoute path={`${url}/staff-page`} component={MasterDetailView} config={staff}/>
        <PropsRoute path={`${url}/inventory-page`} component={MasterDetailView} config={inventory}/>
        <PropsRoute path={`${url}/products-page`} component={MasterDetailView} config={products}/>
        <PropsRoute path={`${url}/sales-page`} component={MasterDetailView} config={sales}/>
        <PropsRoute path={`${url}/suppliers-page`} component={MasterDetailView} config={suppliers}/>
        <PropsRoute path={`${url}/deliveries-page`} component={MasterDetailView} config={deliveries}/>
        <PropsRoute path={`${url}/investments-page`} component={MasterDetailView} config={investments}/>

      </div>
    );
  }
}

export default AppRouter;
