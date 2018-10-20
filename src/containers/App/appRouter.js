import React, { Component } from 'react';
import asyncComponent from '../../helpers/AsyncFunc';
import Route from '../../components/utility/customRoute';
import MasterDetailView from '../MasterDetails';
import ReportView from '../Reports/reportview';
import { data, data2, data3 } from '../Viz/Transactions/config';
// the side views and their configuration

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
		{"name":"inv_bar_code", "display": "Barcode", "type":"barcode", "mandatory":false},
		
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
        {"name":"prod_picture", "display":"Picture", "type":"picture"},
		{"name":"prod_supl_id", "display":"Supplier", "type":"number", "mandatory":true, "ref":"Supplier"},
		{"name":"prod_cate_id", "display":"Category", "type":"number", "mandatory":true, "ref":"Product_Category"},
		{"name":"prod_units_on_order", "display":"Units on Order", "type":"number", "mandatory":true},		
		{"name":"prod_discontinued", "display":"Discontinued", "type":"text", "mandatory":true, "lov":["Discontinued", "In Stock", "Active", "Phase Out"]},        
        {"name":"prod_sku", "display":"SKU", "type":"text"},
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
        {"name":"sale_inv_id", "display":"Inventory", "type":"number", "ref":"Inventory"},
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

 const tableConfiguration = [
   {"path":"staff-page", "table":staff},  
   {"path":"inventory-page", "table":inventory},
   {"path":"products-page", "table":products},
   {"path":"sales-page", "table":sales},
   {"path":"suppliers-page", "table":suppliers},
   {"path":"deliveries-page", "table":deliveries},
   {"path":"investments-page", "table":investments}
 ]

 const businessProcess = {
  "title": "Business Process Improvement",
  "description": "Measure your Business Process",
  "rows": [
      [
          {
              "title": "Malls In Malaysia",
              "description": "A list of malls in Malaysia with target opportunities",
              "type": "MAP",
              "options": {},
              "datasource": "",
              "layout": "twothird"
          },
          {
              "title": "Business Process Improvement Score",
              "description": "A rating of your overall Business Process Improvement initiatives",
              "type": "TRANSACTIONS",
              "options": {},
              "data": [
                  {"title":"Presence Score", "duration":"Jun 24 - Jul 23", "amount":"2.01", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Opportunity Score", "duration":"Jun 24 - Jul 23", "amount":"3.51", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Product Sales Score", "duration":"Jun 24 - Jul 23", "amount":"4.71", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Product Backlog Score", "duration":"Jun 24 - Jul 23", "amount":"4.21", "currency":"d", "data": data2, "direction":"upward"}
              ],
              "datasource": "",
              "layout": "onethird"
          }
      ],
      [
          {
              "title": "Top Products by Revenue",
              "description": "These are your top performing products",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Opportunity Analysis",
              "description": "Customer Requesting similar product groups",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Products in Progress",
              "description": "Products stuck in different manufacturing process steps",
              "type": "PIE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Sales Generated per Location",
              "description": "Location Analysis of different sales and opportunities",
              "type": "LINE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
  ]
}

function getRow(color) {
  return {
      labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "",
          backgroundColor: color,
          borderWidth: 0,
          data: [65, 59, 80, 81, 56, 55, 40, 88, 58, 19, 22, 60, 40, 85, 22, 21]
        }
      ]
    };
  }
  const datax = [
    {
      widgets: [
        { title: "Worker Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("rgba(72,166,242,1)")},
        { title: "Supplier Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("orange")}
      ]
    },
    {
      widgets: [
        { title: "Sales Agent Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction:"downward" , data:getRow("purple")},
        { title: "Investment Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("darkgreen") }
      ]
    }
  ]

const costEfficiency = {
  "title": "Cost Efficiency Matrix",
  "description": "Measure your Business Process",
  "rows": [
      [
          {
              "title": "Cost Efficiency Score",
              "description": "Your Cost Efficiency Score over time",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Cost Efficiency Matrix",
              "description": "Your Cost Efficiency Score for different scores",
              "type": "BREAKDOWN",
              "options": {},
              "data": datax,
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Sales Agent Profitability",
              "description": "Your Sales Staff and the revenue they bring in",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Supplier Score",
              "description": "A rating of your suppliers and how well they perform",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Investments",
              "description": "These are records of investments you made (Last Month: 3,214 RM Total: 92,321 RM)",
              "type": "HISTORY",
              "options": {},
              "datasource": "",
              "data": [
                { "type": "work", "date": "2011 - Present", "title": "Laptop Computer", "subtitle": "HP Spectre", "description": "text mother father" },
                { "type": "work", "date": "2011 - Present", "title": "Laser Printer", "subtitle": "HP LaserJet", "description": "text mother father" },
                { "type": "work", "date": "2011 - Present", "title": "Color Ink Jet Printer", "subtitle": "HP InkJet", "description": "text mother father" },
                { "type": "education", "date": "2011 - Present", "title": "Digital Camera", "subtitle": "Canon 7D", "description": "text mother father" },
                { "type": "education", "date": "2011 - Present", "title": "Scanner", "subtitle": "HP Flatbed Scanner", "description": "text mother father" },
                { "type": "work", "date": "2011 - Present", "title": "Fridge", "subtitle": "Samsung Smart Fridge", "description": "text mother father" },
                { "type": "work", "date": "2011 - Present", "title": "Cake Mixer", "subtitle": "Kitchen mate Express Mixer", "description": "text mother father" },
              ],
              "layout": "fullcolumn"
          }
      ],
  ]
}


const businessWaste = {
  "title": "Business Waste Index",
  "description": "How well are you managing revenue leakage on items, staff and suppliers",
  "rows": [
      [
          {
              "title": "Business Waste Index",
              "description": "How well you are managing revenue leakage on items, staff and suppliers",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Business Waste Score",
              "description": "A rating of your overall Business Waste Management initiatives",
              "type": "BREAKDOWN",
              "options": {},
              "data": [
                  {"widgets":[{"title":"Overproduction Score", "progress":40, "duration":"Jun 24 - Jul 23", "amount":"2.01", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Overspending Score", "progress":70, "duration":"Jun 24 - Jul 23", "amount":"3.51", "currency":"d", "data": data2, "direction":"upward"}]},
                  {"widgets":[{"title":"Productivity Score", "progress":94, "duration":"Jun 24 - Jul 23", "amount":"4.71", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Process Issue Score", "progress":84, "duration":"Jun 24 - Jul 23", "amount":"4.21", "currency":"d", "data": data2, "direction":"upward"}]}
              ],
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],//Process Time aBaseline of each time and its impact on item deliveryes
      [
          {
              "title": "Overproduced unprofitable products",
              "description": "Items that are not profitable and over-produced",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Overspending on unnecessary expenses",
              "description": "Expenses you are currently paying for (cost per month)",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Worker Productivity Score",
              "description": "Worker activities and their profitability",
              "type": "PIE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Process Time and baselines",
              "description": "Baseline of each time and its impact on item delivery",
              "type": "LINE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
  ]
}

const customerSatisfaction = {
  "title": "Business Process Improvement",
  "description": "Measure your Business Process",
  "rows": [
      [
          {
              "title": "Malls In Malaysia",
              "description": "A list of malls in Malaysia with target opportunities",
              "type": "MAP",
              "options": {},
              "datasource": "",
              "layout": "twothird"
          },
          {
              "title": "Business Process Improvement Score",
              "description": "A rating of your overall Business Process Improvement initiatives",
              "type": "TRANSACTIONS",
              "options": {},
              "data": [
                  {"title":"Presence Score", "duration":"Jun 24 - Jul 23", "amount":"2.01", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Opportunity Score", "duration":"Jun 24 - Jul 23", "amount":"3.51", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Product Sales Score", "duration":"Jun 24 - Jul 23", "amount":"4.71", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Product Backlog Score", "duration":"Jun 24 - Jul 23", "amount":"4.21", "currency":"d", "data": data2, "direction":"upward"}
              ],
              "datasource": "",
              "layout": "onethird"
          }
      ],
      [
          {
              "title": "Top Products by Revenue",
              "description": "These are your top performing products",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Opportunity Analysis",
              "description": "Customer Requesting similar product groups",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Products in Progress",
              "description": "Products stuck in different manufacturing process steps",
              "type": "PIE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Sales Generated per Location",
              "description": "Location Analysis of different sales and opportunities",
              "type": "LINE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
  ]
}

function getRowX(color) {
  return {
      labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [
        {
          label: "",
          backgroundColor: color,
          borderWidth: 0,
          data: [65, 59, 80, 81, 56, 55, 40, 88, 58, 19, 22, 60, 40, 85, 22, 21]
        }
      ]
    };
  }
  const datainv = [
    {
      widgets: [
        { title: "Stock Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRowX("rgba(72,166,242,1)")},
        { title: "Inventory Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRowX("orange")}
      ]
    },
    {
      widgets: [
        { title: "Inventory Health Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction:"downward" , data:getRowX("purple")},
        { title: "Expiration Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction:"upward", data:getRowX("darkgreen") }
      ]
    }
  ]

const inventoryOptimisation = {
  "title": "Inventory Optimisations",
  "description": "Measure how well you manage your Inventory",
  "rows": [
      [
          {
              "title": "Inventory Optimisation Score",
              "description": "How well are you managing your Inventory?",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Inventory Optimisation Matrix",
              "description": "Rating for each category we are evaluating",
              "type": "TXNBREAKDOWN",
              "options": {},
              "data": datainv,
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Inventory Stock Monitoring",
              "description": "These are your top performing products",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Inventory Trend Analysis",
              "description": "Customer Requesting similar product groups",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Inventory Count Sheet",
              "description": "Products stuck in different manufacturing process steps",
              "type": "PIE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Item Expiry",
              "description": "Location Analysis of different sales and opportunities",
              "type": "LINE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
        {
            "title": "Supplier Cost Comparisons",
            "description": "Compare how much you pay vs price online",
            "type": "PIE",
            "options": {},
            "datasource": "",
            "layout": "fullcolumn"
        }
    ],
  ]
}

const platformEngagement = {
  "title": "Business Process Improvement",
  "description": "Measure your Business Process",
  "rows": [
      [
          {
              "title": "Malls In Malaysia",
              "description": "A list of malls in Malaysia with target opportunities",
              "type": "MAP",
              "options": {},
              "datasource": "",
              "layout": "twothird"
          },
          {
              "title": "Business Process Improvement Score",
              "description": "A rating of your overall Business Process Improvement initiatives",
              "type": "TRANSACTIONS",
              "options": {},
              "data": [
                  {"title":"Presence Score", "duration":"Jun 24 - Jul 23", "amount":"2.01", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Opportunity Score", "duration":"Jun 24 - Jul 23", "amount":"3.51", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Product Sales Score", "duration":"Jun 24 - Jul 23", "amount":"4.71", "currency":"d", "data": data2, "direction":"upward"},
                  {"title":"Product Backlog Score", "duration":"Jun 24 - Jul 23", "amount":"4.21", "currency":"d", "data": data2, "direction":"upward"}
              ],
              "datasource": "",
              "layout": "onethird"
          }
      ],
      [
          {
              "title": "Top Products by Revenue",
              "description": "These are your top performing products",
              "type": "AREA",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Opportunity Analysis",
              "description": "Customer Requesting similar product groups",
              "type": "STACKEDBAR",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
      [
          {
              "title": "Products in Progress",
              "description": "Products stuck in different manufacturing process steps",
              "type": "PIE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          },
          {
              "title": "Sales Generated per Location",
              "description": "Location Analysis of different sales and opportunities",
              "type": "LINE",
              "options": {},
              "datasource": "",
              "layout": "halfcolumn"
          }
      ],
  ]
}

const reportConfiguration = [
  {"path":"business-improvement-page", "config":businessProcess},
  {"path":"business-waste-page", "config":businessWaste},
  {"path":"platform-engagement-page", "config":platformEngagement},
  {"path":"customer-satisfaction-page", "config":customerSatisfaction},
  {"path":"inventory-optimisation-page", "config":inventoryOptimisation},
  {"path":"cost-efficiency", "config":costEfficiency},
];
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
  /*{
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
  },*/
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
        {
          reportConfiguration.map(x=>{
            return (<PropsRoute key={x.path} path={`${url}/${x.path}`} component={ReportView} config={x.config}/>)
          })
        }
        {
          tableConfiguration.map(x=>{
            return (<PropsRoute key={x.path} path={`${url}/${x.path}`} component={MasterDetailView} config={x.table}/>)
          })
        }

      </div>
    );
  }
}

export default AppRouter;
