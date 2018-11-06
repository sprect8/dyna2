
const express = require('express');
var cookieParser = require('cookie-parser')
const favicon = require('express-favicon');
const path = require('path');
const Sequelize = require('sequelize');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser')
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const bcrypt = require('bcrypt');

const app = express();
// parse application/json
app.use(bodyParser.json())

//
app.set('superSecret', "dyna2018"); // secret variable


app.use(favicon(__dirname + '/build/favicon.png'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});

function sidebarConfiguration() {

  const sidebarOptions = [
    {
      label: 'Home',
      key: 'home',
      leftIcon: 'home'
    },
    {
      label: 'POS System',
      key: 'pos',
      leftIcon: 'shopping_cart',
      children: [
        {
          label: 'Shop',
          key: 'shop-page',
          leftIcon: 'people'
        },
        {
          label: 'Cart',
          key: 'cart-page',
          leftIcon: 'redeem'
        },
        {
          label: 'Checkout',
          key: 'checkout-page',
          leftIcon: 'shopping_cart'
        },
      ]
    },
    {
      label: 'Inbox',
      key: 'inbox',
      leftIcon: 'inbox'
    },
    {
      label: "Data Entry",
      leftIcon: "ballot",
      key: "entrepreneur-main",
      children: [
        {
          label: 'Staff',
          key: 'staff-page',
          leftIcon: 'people'
        },
        {
          label: 'Inventory',
          key: 'inventory-page',
          leftIcon: 'redeem'
        },
        {
          label: 'Products',
          key: 'products-page',
          leftIcon: 'shopping_cart'
        },
        {
          label: 'Sales',
          key: 'sales-page',
          leftIcon: 'shop_two'
        },
        {
          label: 'Suppliers',
          key: 'suppliers-page',
          leftIcon: 'local_shipping'
        },
        {
          label: 'Deliveries',
          key: 'deliveries-page',
          leftIcon: 'departure_board'
        },
        {
          label: 'Investments',
          key: 'investments-page',
          leftIcon: 'equalizer'
        }
      ]
    },

    {
      label: "Reports",
      leftIcon: "pie_chart",
      key: "dashboard-reports",
      children: [
        {
          label: 'Cost Efficiency',
          key: 'cost-efficiency',
          leftIcon: 'monetization_on'

        },
        {
          label: 'Inventory Optimisation',
          key: 'inventory-optimisation-page',
          leftIcon: 'assignment_turned_in'
        },
        {
          label: 'Business Waste Reduction',
          key: 'business-waste-page',
          leftIcon: 'delete_forever'
        },
        {
          label: 'Business Process Improvement',
          key: 'business-improvement-page',
          leftIcon: 'extension'
        },
        {
          label: 'Customer Satisfaction',
          key: 'customer-satisfaction-page',
          leftIcon: 'face'
        },
        {
          label: 'Platform Engagement',
          key: 'platform-engagement-page',
          leftIcon: 'thumb_up'
        }
      ]
    },
  ];

  return sidebarOptions;
}

function getConfiguration() {
  const staff = {
    "tableName": "staffs",
    "displayName": "Staff Records",
    "key": "staff_id", 
    "display": ["staff_fname", "staff_lname"],
    "description": "These are your staff records, edit, add, remove and view any details",
    "columns": [
      { "name": "staff_id", "display": "Staff Id", "type": "number", "sequence": "staff_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "staff_fname", "display": "First Name", "type": "text", "mandatory": true },
      { "name": "staff_sname", "display": "Surname", "type": "text", "mandatory": true },
      { "name": "staff_uid", "display": "Identity Card", "type": "text", "mandatory": true, "unique": true },
      { "name": "staff_joined", "display": "Joined", "type": "timestamp", "mandatory": true },
      { "name": "staff_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PROBATION"] },
      { "name": "staff_type", "display": "Type", "type": "text", "mandatory": true, "lov": ["Full Time", "Part Time", "Sales", "Contractor"], },
      { "name": "staff_address", "display": "Address", "type": "text", "mandatory": true },
      { "name": "staff_salary", "display": "Salary (month)", "type": "number", "mandatory": true }
    ]
  }

  function formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const inventory = {
    "tableName": "inventories",
    "displayName": "Inventory Records",
    "key": "inv_id",        
    "display": ["inv_prod_id"],
    "description": "These are your Inventory records, edit, add, remove and view any details. Records of what items you have (by batch)",
    "columns": [
      { "name": "inv_id", "display": "Inventory Id", "type": "number", "sequence": "inv_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "inv_prod_id", "display": "Product", "type": "number", "mandatory": true, "ref": "products" },
      { "name": "inv_bar_code", "display": "Barcode", "type": "barcode", "mandatory": false },
      { "name": "inv_purchase_date", "display": "Purchase Date", "type": "timestamp", "mandatory": true, "default": formatDate() },
      { "name": "inv_expiry_date", "display": "Expiry Date", "type": "timestamp", "mandatory": true },
      { "name": "inv_units_in_stock", "display": "Amount in Stock", "type": "number", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PROBATION"] },

    ]
  }

  const products = {
    "tableName": "products",
    "displayName": "Product Records",
    "key": "prod_id",    
    "display": ["prod_name"],
    "description": "These are your Product records, edit, add, remove and view any details",
    "columns": [
      { "name": "prod_id", "display": "Product Id", "type": "number", "sequence": "prod_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "prod_name", "display": "Name", "type": "text", "mandatory": true, "unique": true },
      { "name": "prod_desc", "display": "Description", "type": "text" },
      { "name": "prod_picture", "display": "Picture", "type": "picture" },
      { "name": "prod_supl_id", "display": "Supplier", "type": "number", "mandatory": true, "ref": "suppliers" },
      { "name": "prod_cate_id", "display": "Category", "type": "number", "mandatory": true, "ref": "product_categories" },
      { "name": "prod_units_on_order", "display": "Units on Order", "type": "number", "mandatory": true },
      { "name": "prod_discontinued", "display": "Discontinued", "type": "text", "mandatory": true, "lov": ["Discontinued", "In Stock", "Active", "Phase Out"] },
      { "name": "prod_sku", "display": "SKU", "type": "text" },
      { "name": "prod_unit_price", "display": "Cost", "type": "number", "mandatory": true },

    ]
  }

  const productCategory = {
    "tableName": "product_categories",
    "displayName": "Product Categories Records",
    "key": "cate_id",    
    "display": ["cate_name"],
    "description": "These are your Product Category records, edit, add, remove and view any details",
    "columns": [
      { "name": "cate_id", "display": "Category Id", "type": "number", "sequence": "cate_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "cate_name", "display": "Name", "type": "text", "mandatory": true, "unique": true },
      { "name": "cate_desc", "display": "Description", "type": "text" },
    ]
  }

  const sales = {
    "tableName": "sales",
    "displayName": "Sales Records",
    "key": "sale_id",
    "description": "These are your Sales records, edit, add, remove and view any details",
    "columns": [
      { "name": "sale_id", "display": "Sales Id", "type": "number", "sequence": "sale_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "sale_staff_id", "display": "Staff", "type": "number", "mandatory": true, "unique": true, "ref": "staffs" },
      { "name": "sale_inv_id", "display": "Inventory", "type": "number", "ref": "inventories" },
      { "name": "sale_price", "display": "Price", "type": "number", "mandatory": true },
      { "name": "sale_cost", "display": "Cost", "type": "number", "mandatory": true },
      { "name": "sale_timestamp", "display": "Sales Date", "type": "timestamp", "mandatory": true },
      { "name": "sale_cust_id", "display": "Customer", "type": "number" },
      { "name": "sale_status", "display": "Status", "type": "text", "lov": ["SOLD", "RETURNED", "EXCHANGE", "REFUNDED"] }
    ]
  }

  const suppliers = {
    "tableName": "suppliers",
    "displayName": "Suppliers Records",
    "key": "supl_id",
    "display": ["supl_company"],
    "description": "These are your Supplier records, edit, add, remove and view any details",
    "columns": [
      { "name": "supl_id", "display": "Supplier Id", "type": "number", "sequence": "supl_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "supl_company", "display": "Name", "type": "text", "mandatory": true },
      { "name": "supl_contact_person", "display": "Contact Person", "type": "text", "mandatory": true },
      { "name": "supl_address", "display": "Address", "type": "text", "mandatory": true },
      { "name": "supl_phone", "display": "Phone", "type": "number", "mandatory": true },
      { "name": "supl_mobile", "display": "Mobile", "type": "number", "mandatory": true },
      { "name": "supl_email", "display": "Email", "type": "text" },
    ]
  }

  const deliveries = {
    "tableName": "deliveries",
    "displayName": "Delivery Records",
    "key": "devy_id",
    "description": "These are your Delivery records for your suppliers, edit, add, remove and view any details",
    "columns": [
      { "name": "devy_id", "display": "Delivery Id", "type": "number", "sequence": "devy_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "devy_prod_id", "display": "Product", "type": "number", "mandatory": true, "ref": "products" },
      { "name": "devy_supl_id", "display": "Supplier", "type": "number", "mandatory": true, "ref": "suppliers" },
      { "name": "devy_request_date", "display": "Request Date", "type": "timestamp", "mandatory": true },
      { "name": "devy_delivery_date", "display": "Delivery Date", "type": "timestamp", "mandatory": true },
      { "name": "devy_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["ON TIME", "LATE", "VERY LATE", "BUSINESS IMPACTING"] },
      { "name": "devy_comment", "display": "Comment", "type": "text" }
    ]
  }

  const investments = {
    "tableName": "investments",
    "displayName": "Investment Records",
    "key": "inst_id",
    "display": ["inst_name"],
    "description": "These are your Investment records, edit, add, remove and view any details",
    "columns": [
      { "name": "inst_id", "display": "Investment Id", "type": "number", "sequence": "inst_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "inst_name", "display": "Name", "type": "text", "mandatory": true },
      { "name": "inst_desc", "display": "Description", "type": "text" },
      { "name": "inst_timestamp", "display": "Investment Made", "type": "timestamp", "mandatory": true },
      { "name": "inst_units", "display": "Total Amount", "type": "number", "mandatory": true },
      { "name": "inst_cost", "display": "Total Cost", "type": "number", "mandatory": true },
      { "name": "inst_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["DECOMMISSIONED", "ACTIVE", "ORDERED"] },
      { "name": "inst_comment", "display": "Comment", "type": "text" },
      { "name": "inst_picture", "display": "Picture", "type": "file" }
    ]
  }

  const tableConfiguration = [
    { "path": "staff-page", "table": staff },
    { "path": "suppliers-page", "table": suppliers },
    { "path": "product-catalog", "table": productCategory },
    { "path": "investments-page", "table": investments },
    { "path": "products-page", "table": products },
    { "path": "inventory-page", "table": inventory },
    { "path": "sales-page", "table": sales },
    { "path": "deliveries-page", "table": deliveries },
  ]

  return tableConfiguration;
}

function getUserStructures() {
  const users = {
    "tableName": "users",
    "displayName": "Users Records",
    "description": "System User",
    "columns": [
      { "name": "user_id", "display": "User Id", "type": "number", "sequence": "user_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "user_name", "display": "Username", "type": "text", "mandatory": true, "unique": true },
      { "name": "user_user_id", "display": "Parent User", "type": "number" },
      { "name": "user_fname", "display": "First Name", "type": "text", "mandatory": true },
      { "name": "user_lname", "display": "Surname", "type": "text", "mandatory": true },
      { "name": "user_timestamp", "display": "Created Date", "type": "timestamp" },
      { "name": "user_status", "display": "Current Status", "type": "text", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PENDING"] },
      { "name": "user_password", "display": "Password Hash", "type": "text", "mandatory": true },
    ]
  }
  const roles = {
    "tableName": "roles",
    "displayName": "Roles",
    "description": "Roles in the system",
    "columns": [
      { "name": "role_id", "display": "Role Id", "type": "number", "sequence": "role_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "role_name", "display": "Role Name", "type": "text", "mandatory": true },
      { "name": "role_desc", "display": "Role Description", "type": "text", "mandatory": true }
    ]
  }
  const user_roles = {
    "tableName": "user_roles",
    "displayName": "User Roles",
    "description": "Connect user to their roles",
    "columns": [
      { "name": "urol_id", "display": "User Role Id", "type": "number", "sequence": "urol_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "urol_user_id", "display": "User", "type": "number", "mandatory": true, "ref": "users" },
      { "name": "urol_role_id", "display": "Role", "type": "number", "mandatory": true, "ref": "roles" },
      { "name": "urol_status", "display": "Status", "type": "text", "mandatory": true },
      { "name": "urol_timestamp", "display": "Created Date", "type": "timestamp", "mandatory": true },
    ]
  }
  const logins = {
    "tableName": "logins",
    "displayName": "Login Audit Records",
    "description": "Audit details for login",
    "columns": [
      { "name": "login_user_id", "display": "User Id", "type": "number", "mandatory": true, "ref": "users" },
      { "name": "login_timestamp", "display": "Timestamp", "type": "timestamp", "mandatory": true },
      { "name": "login_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["SUCCESS", "FAILURE", "ERROR"] },
      { "name": "login_message", "display": "Message", "type": "text" },
    ]
  }

  const tableConfiguration = [
    { "path": "user-page", "table": users },
    { "path": "roles-page", "table": roles },
    { "path": "user-roles-catalog", "table": user_roles },
    { "path": "logins-page", "table": logins },
  ]

  return tableConfiguration;
}

function getReportConfig() {
  let data2 = []
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
            { "title": "Presence Score", "duration": "Jun 24 - Jul 23", "amount": "2.01", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Opportunity Score", "duration": "Jun 24 - Jul 23", "amount": "3.51", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Product Sales Score", "duration": "Jun 24 - Jul 23", "amount": "4.71", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Product Backlog Score", "duration": "Jun 24 - Jul 23", "amount": "4.21", "currency": "d", "data": data2, "direction": "upward" }
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
        { title: "Worker Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRow("rgba(72,166,242,1)") },
        { title: "Supplier Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRow("orange") }
      ]
    },
    {
      widgets: [
        { title: "Sales Agent Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction: "downward", data: getRow("purple") },
        { title: "Investment Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction: "upward", data: getRow("darkgreen") }
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
            {
              "widgets": [{ "title": "Overproduction Score", "progress": 40, "duration": "Jun 24 - Jul 23", "amount": "2.01", "currency": "d", "data": data2, "direction": "upward" },
              { "title": "Overspending Score", "progress": 70, "duration": "Jun 24 - Jul 23", "amount": "3.51", "currency": "d", "data": data2, "direction": "upward" }]
            },
            {
              "widgets": [{ "title": "Productivity Score", "progress": 94, "duration": "Jun 24 - Jul 23", "amount": "4.71", "currency": "d", "data": data2, "direction": "upward" },
              { "title": "Process Issue Score", "progress": 84, "duration": "Jun 24 - Jul 23", "amount": "4.21", "currency": "d", "data": data2, "direction": "upward" }]
            }
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
            { "title": "Presence Score", "duration": "Jun 24 - Jul 23", "amount": "2.01", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Opportunity Score", "duration": "Jun 24 - Jul 23", "amount": "3.51", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Product Sales Score", "duration": "Jun 24 - Jul 23", "amount": "4.71", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Product Backlog Score", "duration": "Jun 24 - Jul 23", "amount": "4.21", "currency": "d", "data": data2, "direction": "upward" }
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
        { title: "Stock Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("rgba(72,166,242,1)") },
        { title: "Inventory Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("orange") }
      ]
    },
    {
      widgets: [
        { title: "Inventory Health Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction: "downward", data: getRowX("purple") },
        { title: "Expiration Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("darkgreen") }
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
            { "title": "Presence Score", "duration": "Jun 24 - Jul 23", "amount": "2.01", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Opportunity Score", "duration": "Jun 24 - Jul 23", "amount": "3.51", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Product Sales Score", "duration": "Jun 24 - Jul 23", "amount": "4.71", "currency": "d", "data": data2, "direction": "upward" },
            { "title": "Product Backlog Score", "duration": "Jun 24 - Jul 23", "amount": "4.21", "currency": "d", "data": data2, "direction": "upward" }
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
    { "path": "business-improvement-page", "config": businessProcess },
    { "path": "business-waste-page", "config": businessWaste },
    { "path": "platform-engagement-page", "config": platformEngagement },
    { "path": "customer-satisfaction-page", "config": customerSatisfaction },
    { "path": "inventory-optimisation-page", "config": inventoryOptimisation },
    { "path": "cost-efficiency", "config": costEfficiency },
  ];
  return reportConfiguration;
}

// persistence mapping for our configurations
// mapping to sequelize objects generated by generateRoutes
var sharedPersistenceMapping = {}
var persistenceKey = {}
// function that returns for get / put / update / delete
var sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
}); // connect to sequelize

function deriveType(entry, column) {
  switch (column.type) {
    case "number":
      entry.type = Sequelize.DECIMAL;
      break;
    case "text":
    case "picture":
    case "barcode":
    case "timestamp":
      entry.type = Sequelize.TEXT;
      break;
    case "file":
      entry.type = Sequelize.TEXT;
      break;
    default:
      entry.type = Sequelize.TEXT;
      break;
  }
}

function deriveReferences(entry, column) {
  if (column.ref) {
    entry.references = {
      model: sharedPersistenceMapping[column.ref.toLowerCase()],
      key: persistenceKey[column.ref.toLowerCase()],
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
}

function deriveDefaults(entry, column) {
  if (column.default) {
    if (column.type == "timestamp") {
      entry.defaultValue = Sequelize.NOW;
    }
    else {
      entry.defaultValue = column.default;
    }
  }
}

/*
async function run (model, tableName) {
  try {
  return await model.sync()
  }
  catch (e) {
    console.log("Failed", tableName, e);
  }
}
*/
function generateSequelize(config, genUser) {
  let tableName = config.table.tableName.toLowerCase();
  let columns = {};
  config.table.columns.forEach(column => {
    let entry = {};
    if (!column.key && !column.ref) {
      deriveType(entry, column);
    }
    else {
      entry.type = Sequelize.INTEGER;
    }
    entry.allowNull = !column.mandatory;

    deriveDefaults(entry, column);

    if (column.lov) {
      entry.isIn = column.lov;
    }

    entry.unique = column.unique ? true : false;
    entry.primaryKey = column.key ? true : false;

    if (column.key) {
      entry.autoIncrement = true;
    }

    deriveReferences(entry, column);

    columns[column.name] = entry;

    if (column.key) {
      persistenceKey[tableName] = column.name;
    }
  });

  // single key for the user who owns this 
  // indirect reference to the login user 
  if (genUser) {
    let e = { type: Sequelize.INTEGER, allowNull: false };
    columns["owner_user_id"] = e;

    e.references = {
      model: sharedPersistenceMapping["users"],
      key: persistenceKey["users"],
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }

  let model = sequelize.define(tableName, columns);
  //console.log("Adding model", tableName);
  //console.log(run(model, tableName));
  sharedPersistenceMapping[tableName] = model;
}

function deleteAPI(app, tableName) {
  app.delete("/" + tableName + "/:id", function (req, res) {
    //res.status(200).send([{ "A": "A" }, { "B": "B" }]);

    console.log("Delete called for table ", tableName);

    sharedPersistenceMapping[tableName].findById(req.params.id).then(inst => {
      if (inst) {
        if (inst.owner_user_id !== req.decoded.admin) {
          res.status(403).send({"success": false, "error": "User does not own the row " + inst.owner_user_id + " != " + req.decoded.admin});
          return
        }
        inst.destroy()
          .then(() => {
            res.json({ "success": true });
          })
          .catch((e) => {
            console.log(e);
            res.status(400).send({ "success": false, "error": "Error failed because of " + e });
          });
      }
      else {
        res.status(404).send({ "success": false, "error": "Not Found" });
      }
    })
  });
}

function selectAPI(app, tableName) {
  app.get("/" + tableName, function (req, res) {

    //console.log("Get request called for table ", tableName);
    //res.status(200).send([{ "A": "A" }, { "B": "B" }]);
    // get the paging
    // get the size
    // get any ordering requests
    let page = 0;
    let size = 20;
    let order = null;
    let column = null;

    let config = { limit: size, offset: page };
    config.where = {"owner_user_id" : req.decoded.admin }

    if (order && column) {
      config.order = [[column, order]];
    }
    sharedPersistenceMapping[tableName].findAll(config).then(r => {
      res.json(r);
    })

  });
}

function updateAPI(app, tableName) {
  app.put("/" + tableName, function (req, res) {
    let body = req.body;
    body.owner_user_id = req.decoded.admin;
    console.log("Update api called for table", tableName, body);
    
    sharedPersistenceMapping[tableName].upsert(body)
      .then(i => {
        res.json(i); // return as json instance
      })
      .catch(e => {
        console.log(e);
        res.status(400);
      });
  });
}

function generateRoutes(app, configuration) {

  getUserStructures().forEach(conf => {
    generateSequelize(conf);
  })

  sequelize.sync();

  configuration.forEach(conf => {
    let tableName = conf.table.tableName.toLowerCase();
    selectAPI(app, tableName);
    deleteAPI(app, tableName);
    updateAPI(app, tableName);
    generateSequelize(conf, true);

    app.get("/lov/" + conf.table.tableName.toLowerCase() + "/:query", function (req, res) {
      let key = conf.table.key;
      let display = conf.table.display;
      
      // query for first 20 items matching the search
      // if empty we return firt 20 items
      // order it by the display
      

    });

  });


  sequelize.sync();

  // get LOV based on model
  // we will have query params for searching the lov with like
  // run a query? perhaps we can do some client side caching here
  
}
// get will return paged data
let router = express.Router();

// protect the routes
router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(req.cookies);

  if (!token && req.cookies) {
    token = req.cookies.authToken;
  }

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded; next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

generateRoutes(router, getConfiguration());

router.get('/tableProfiles', function (req, res) {
  // get the table configurations

  res.json(getConfiguration());
});

router.get('/sidebarConfig', function (req, res) {
  res.json(sidebarConfiguration());
})

router.get('/reportProfiles', function (req, res) {
  // get report profile which defines the report 
  res.json(getReportConfig());
});

router.get('/report/:name', function (req, res) {
  // get report based on name
  // note that the report is dynamically generated and returned
})


app.post("/register", function (req, res) {
  // create a new user
  // we need to admin key when login, and this key is hard coded 

  let payload = req.body.payload;

  if (payload.authKey !== "Dynapreneur2018") {
    res.json({ success: false, message: "Invalid Auth Key" });
    return;
  }

  payload.user_name = payload.user_name.toUpperCase();
  payload.user_status = 'ACTIVE';
  payload.user_timestamp = new Date().getTime();
  payload.user_password = bcrypt.hashSync(payload.user_password, 10);

  sharedPersistenceMapping["users"].create(payload, { fields: Object.keys(payload).filter(e => { return e.startsWith("user_"); }) }).then(r => {
    if (!r) {
      res.json({ success: false, message: "Failed to create user" })
    }
    else {
      res.json({ success: true, userId: r.user_id });
    }
  }).catch(e => {
    console.log("Failed creating user because of ", e);
    res.json({ success: false, message: "Failed to create user" });
  })
});

// login the user
app.post('/login', function (req, res) {

  // find the user
  sharedPersistenceMapping["users"].findOne({
    where: {
      user_name: req.body.name
    }
  }).then((user) => {

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!bcrypt.compareSync(req.body.password, user.user_password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.user_id // i want the user name
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON

        var date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

        const cookie = {
          httpOnly: true,
          expires: date
        }

        res.cookie('authToken', token, cookie);
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }

  }).catch(e => {
    throw e;
  });
});

app.use('/api', router)

app.get('/', function (req, res) {
  console.log("Override");
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// put will allow user to update / save record (if id does not exist we save, else we update)

// delete will allow user to delete a record
console.log("Server listening on port", port);
app.listen(port);