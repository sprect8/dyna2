
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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//
app.set('superSecret', process.env.superSecret || "dyna2018"); // secret variable


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
          label: 'Product Category',
          key: 'product-catalog',
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
    "display": "staff_name",
    "description": "These are your staff records, edit, add, remove and view any details",
    "columns": [
      { "name": "staff_id", "display": "Staff Id", "type": "number", "sequence": "staff_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "staff_fname", "display": "First Name", "type": "text", "mandatory": true },
      { "name": "staff_sname", "display": "Surname", "type": "text", "mandatory": true },
      { "name": "staff_name", "display": "Name", "type": "text", "mandatory": true },
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
    "display": "inv_prod_id",
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
    "display": "prod_name",
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
    "display": "cate_name",
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
      { "name": "sale_status", "display": "Status", "type": "text", "lov": ["SOLD", "RETURNED", "EXCHANGE", "REFUNDED"] },
      { "name": "sale_latitude", "display": "Latitude", "type": "number"},
      { "name": "sale_longitude", "display": "Longitude", "type": "number"},

    ]
  }

  const suppliers = {
    "tableName": "suppliers",
    "displayName": "Suppliers Records",
    "key": "supl_id",
    "display": "supl_company",
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
    "display": "inst_name",
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
var configurationMapping = {}; // table to its configuration mapping
var persistenceKey = {}
// function that returns for get / put / update / delete
var sequelize = new Sequelize(process.env.postgres_db || 'postgres', process.env.postgres_user || 'postgres', process.env.postgres_password || 'password', {
  host: process.env.postgres_host || 'localhost',
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
  configurationMapping[tableName] = config.table;
}

function deleteAPI(app, tableName) {
  app.delete("/" + tableName + "/:id", function (req, res) {
    //res.status(200).send([{ "A": "A" }, { "B": "B" }]);

    console.log("Delete called for table ", tableName);

    sharedPersistenceMapping[tableName].findById(req.params.id).then(inst => {
      if (inst) {
        if (inst.owner_user_id !== req.decoded.admin) {
          res.status(403).send({ "success": false, "error": "User does not own the row " + inst.owner_user_id + " != " + req.decoded.admin });
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

// resolve dependencies (id => name)
async function resolveDependencies(conf, records) {
  let configs = conf.table.columns.filter(x => (x.ref))
  console.log("Configs is ", configs);
  for (const c in configs) {

    let config = configs[c];

    let tableName = config.ref.toLowerCase();
    let tableRef = configurationMapping[tableName];
    let key = tableRef.key;
    let disp = tableRef.display;

    for (const r in records) {
      let record = records[r];

      console.log(record[config.name], config.name, tableName);
      let inst = await sharedPersistenceMapping[tableName].findById(record[config.name]);

      // cannot be null

      record[config.name] = inst[disp];
      console.log("We found something", record[config.name]);
    }
  }
}

function selectAPI(app, conf) {
  let tableName = conf.table.tableName.toLowerCase();

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
    config.where = { "owner_user_id": req.decoded.admin }

    if (order && column) {
      config.order = [[column, order]];
    }

    sharedPersistenceMapping[tableName].findAll(config).then(r => {

      console.log("Dependencies resolved", r)
      resolveDependencies(conf, r).then(rx => {
        console.log("Resolved results", r);
        res.json(r);
      })

      // resolve references
      // the value that is saved will be the id, but the ui wants the value as the display name
    })

  });
}

async function resolveIDs(conf, req, record) {
  try {
    let filtered = conf.table.columns.filter(x => x.ref)
    for (const c in filtered) {
      let config = filtered[c];
      let tableName = config.ref.toLowerCase();
      let tableRef = configurationMapping[tableName];
      let key = tableRef.key;
      let disp = tableRef.display;

      let user = req.decoded.admin
      // like search on the name (display)
      // on key

      let where = { owner_user_id: user, [disp]: record[config.name] };

      let inst = await sharedPersistenceMapping[tableName].findAll({ where: where });
      inst = inst[0];

      record[config.name] = inst[key];
    }
  }
  catch (e) {
    console.log("Failed hard!", e)
  }
}

function updateAPI(app, conf) {
  let tableName = conf.table.tableName.toLowerCase();

  app.put("/" + tableName, function (req, res) {
    let body = req.body;
    body.owner_user_id = req.decoded.admin;

    // resolve references first
    // assume data saved will be from the id (and not the value)
    resolveIDs(conf, req, body).then(x => {
      if (body[conf.table.key]) {
        sharedPersistenceMapping[tableName].findById(body[conf.table.key]).then(inst => {
          if (!inst) {
            res.json({ "success": false, message: "Failed to update because we could not find the instance" });
            return;
          }

          inst.update(body)
            .then(i => {
              res.json(i); // return as json instance
            })
            .catch(e => {
              console.log(e);
              res.status(400);
            });
        })

      }
      else {
        sharedPersistenceMapping[tableName].create(body)
          .then(i => {
            res.json(i); // return as json instance
          })
          .catch(e => {
            console.log(e);
            res.status(400).json({ "success": false, message: "Failed because of " + e });
          });
      }
    })
  });
}

function createLOVService(app, conf) {
  app.get("/lov/" + conf.table.tableName.toLowerCase() + "/:query", function (req, res) {
    let key = conf.table.key;
    let display = conf.table.display;
    let table = conf.table.tableName.toLowerCase();

    // query for first 20 items matching the search
    // if empty we return firt 20 items
    // order it by the display

    let query = req.params.query;
    if (query)
      query = query.toLowerCase().trim();
    if (query === "**") {
      query = "";
    }
    let user = req.decoded.admin
    // like search on the name (display)
    // on key
    const Op = Sequelize.Op;

    let where = { owner_user_id: user, };

    if (query) {
      where = {
        [display]: { [Op.iLike]: query + "%" }
      };
    }

    sharedPersistenceMapping[table].findAll({
      attributes: [key, display],
      where: where
    }).then(r => {
      res.json(r.map(m => { return { id: "" + m[key], label: m[display] } }));
    });
  });
}

function generateProductSearch(app) {
  app.post('/product-search', async function(req, res) {
    console.log(JSON.stringify(req.body));

    let query = req.body.requests[0];
    let user = req.decoded.admin;
    let page = query.params.page

    let replacements = [user]

    let categoryFilters = query.params.facetFilters;
    let countSel = 'SELECT count(*) FROM products a where a.owner_user_id = ?';
    let prodSel = 'SELECT a.prod_id, b.cate_desc, a.prod_name, a.prod_desc, a.prod_unit_price FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id where a.owner_user_id = ? limit ' + query.params.hitsPerPage + ' offset ' + page;
    console.log(categoryFilters);

    if (categoryFilters && categoryFilters.length > 0) {
      countSel = 'SELECT count(*) FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id where a.owner_user_id = ? and b.cate_name in (?)'
      replacements.push(categoryFilters[0].map(x=>{
        return x.substring(x.indexOf(":")+1);
      }));
      prodSel = 'SELECT a.prod_id, b.cate_desc, a.prod_name, a.prod_desc, a.prod_unit_price FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id where a.owner_user_id = ? and b.cate_name in (?) limit ' + query.params.hitsPerPage + ' offset ' + page;
    }

    let total = await sequelize.query(countSel, 
    { type: sequelize.QueryTypes.SELECT, replacements: replacements});
    total = total[0].count;
    total = +total;
    let result = await sequelize.query(prodSel, 
    { type: sequelize.QueryTypes.SELECT, replacements: replacements});

    let pages = Math.round(total / query.params.hitsPerPage);

    let categories = {};
    let cat = await sequelize.query("select cate_name from product_categories where owner_user_id = ? order by cate_name asc", 
    { type: sequelize.QueryTypes.SELECT, replacements: [user]});
    
    cat.forEach(x=>{categories[x.cate_name] = 1})

    // reduce results 

    let hits = result.map(x=>{
      return {
        "categories": [x.cate_desc],
        "price": +x.prod_unit_price,
        "rating":4,
        "image":"/api/product/image/" + x.prod_id,
        "objectID":x.prod_id,
        "_snippetResult": {
          "description": {
            "value": x.prod_desc,
            "matchLevel": "none"
          }        
        },
        "_highlightResult": {
          "name":{
            "value":x.prod_name
          },
          "description":{
            "value":x.prod_desc
          }
        }
      }
    })


    //sharedPersistenceMapping["product_categories"]
    //sharedPersistenceMapping["products"]



    res.json({
      "results": [{
        "hits": hits,
        "nbHits": total,
        "page": 0,
        "nbPages": pages,
        "hitsPerPage": 12,
        "processingTimeMS": 6,
        "facets": {
          
          "categories": categories
        },
        "facets_stats": {
          
        },
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "query": "",
        "params": "query=&hitsPerPage=12&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%22price%22%2C%22categories%22%2C%22rating%22%5D&tagFilters=&numericFilters=%5B%22rating%3C%3D5%22%5D",
        "index": "default_search"
      }, {
        "hits": [{
          "objectID": "9999119"
        }],
        "nbHits": 10000,
        "page": 0,
        "nbPages": 1000,
        "hitsPerPage": 1,
        "processingTimeMS": 1,
        
        "exhaustiveFacetsCount": true,
        "exhaustiveNbHits": true,
        "query": "",
        "params": "query=&hitsPerPage=1&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=rating",
        "index": "default_search"
      }]
    }
    );
  });
}

function generateProductSFFV(app) {
  app.post('/product-ffv', function(req, res) {
    console.log(JSON.stringify(req.body));
    
  })
}

const noImage = "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";

function generateProductImage(app) {
  app.get('/product/image/:productId', (req, res) => {
   
    // query for first 20 items matching the search
    // if empty we return firt 20 items
    // order it by the display

    let query = req.params.productId;
    let user = req.decoded.admin;

    sharedPersistenceMapping["products"].findById(query).then(inst=>{
      let img = "";
      let type = "image/png";
      if (inst === null || !inst.prod_picture || inst.prod_picture === "" || inst.owner_user_id !== user) {
        // 
        // send not-found image
        img = new Buffer(noImage, "base64");
      }
      else {
        let pic = inst.prod_picture.substring(inst.prod_picture.indexOf(","));
        img = new Buffer(pic, "base64");
      }

      res.writeHead(200, {
        'Content-Type': type,
        'Content-Length': img.length
      });
      res.end(img);
    });    
  })
}

function generateRoutes(app, configuration) {

  getUserStructures().forEach(conf => {
    generateSequelize(conf);
  })

  sequelize.sync();

  configuration.forEach(conf => {
    let tableName = conf.table.tableName.toLowerCase();
    selectAPI(app, conf);
    deleteAPI(app, tableName);
    updateAPI(app, conf);
    generateSequelize(conf, true);

    createLOVService(app, conf);

    generateProductSearch(app);
    generateProductSFFV(app);
    generateProductImage(app);

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