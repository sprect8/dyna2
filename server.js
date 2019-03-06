
const express = require('express');
var cookieParser = require('cookie-parser')
const favicon = require('express-favicon');
const path = require('path');
const Sequelize = require('sequelize');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser')
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const app = express();
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
        }/*,
        {
          label: 'Manage Receipts',
          key: 'receipts-manage',
          leftIcon: 'inbox'
        },*/
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
          label: 'Receipts',
          key: 'receipts-page',
          leftIcon: 'shop_two'
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
        },
        {
          label: 'Subscriptions',
          key: 'subscriptions-page',
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
        // report is global
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

function getConfiguration(view) {
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
      { "name": "staff_salary", "display": "Salary (month)", "type": "number", "mandatory": true },
      { "name": "staff_contact", "display": "Contact Info", "type": "text" },
      { "name": "staff_picture", "display": "Picture", "type": "picture" },
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
      { "name": "prod_list_price", "display": "Price Sold", "type": "number", "mandatory": true },

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

  const receipts = {
    "tableName": "receipts",
    "displayName": "Receipts Records",
    "key": "recp_id",
    "display": "recp_id",
    "description": "These are your Receipt records, edit, add, remove and view any details",
    "columns": [
      { "name": "recp_id", "display": "Receipts Id", "type": "number", "sequence": "recp_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "recp_details", "display": "Details", "type": "text" },
      { "name": "recp_staff_id", "display": "Staff", "type": "number", "mandatory": true, "ref": "staffs" },
      { "name": "recp_uuid", "display": "Unique ID", "type": "text", "mandatory": true },
      { "name": "recp_latitude", "display": "Latitude", "type": "number" },
      { "name": "recp_longitude", "display": "Longitude", "type": "number" },
      { "name": "recp_customer", "display": "Customer Name", "type": "text", "mandatory": true },
      { "name": "recp_customer_email", "display": "Customer Email", "type": "text", "mandatory": true },
      { "name": "recp_timestamp", "display": "Receipt Date", "type": "timestamp", "mandatory": true },
      { "name": "recp_customer_rating", "display": "Rating", "type": "number" },
      { "name": "recp_customer_rating1", "display": "Rating", "type": "number" },
      { "name": "recp_customer_rating2", "display": "Rating1", "type": "number" },
      { "name": "recp_customer_rating3", "display": "Rating2", "type": "number" },
      { "name": "recp_customer_rating4", "display": "Rating3", "type": "number" },
      { "name": "recp_customer_rating5", "display": "Rating4", "type": "number" },
      { "name": "recp_customer_rating6", "display": "Rating5", "type": "number" },
      { "name": "recp_customer_rating7", "display": "Rating6", "type": "number" },
      { "name": "recp_customer_rating8", "display": "Rating7", "type": "number" },
      { "name": "recp_customer_rating9", "display": "Rating8", "type": "number" },
      { "name": "recp_customer_rating10", "display": "Rating9", "type": "number" },
      { "name": "recp_customer_comment", "display": "Comment", "type": "text" },
    ]
  }

  const sales = {
    "tableName": "sales",
    "displayName": "Sales Records",
    "key": "sale_id",
    "description": "These are your Sales records, edit, add, remove and view any details",
    "columns": [
      { "name": "sale_id", "display": "Sales Id", "type": "number", "sequence": "sale_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "sale_inv_id", "display": "Inventory", "type": "number", "ref": "inventories" },
      { "name": "sale_price", "display": "Price", "type": "number", "mandatory": true },
      { "name": "sale_cost", "display": "Cost", "type": "number", "mandatory": true },
      { "name": "sale_recp_id", "display": "Receipt", "type": "number", "ref": "receipts", "mandatory": true },
      { "name": "sale_status", "display": "Status", "type": "text", "lov": ["SOLD", "RETURNED", "EXCHANGE", "REFUNDED"] },
      { "name": "sale_total_purchase", "display": "Total Purchase", "type": "number", "mandatory": true, },
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
      { "name": "inst_category", "display": "Category", "type":"text", "mandatory": true},
      { "name": "inst_desc", "display": "Description", "type": "text" },
      { "name": "inst_timestamp", "display": "Investment Made", "type": "timestamp", "mandatory": true },
      { "name": "inst_timestamp_inactive", "display": "Investment Decomissioned", "type": "timestamp", "mandatory": false },
      { "name": "inst_units", "display": "Total Amount", "type": "number", "mandatory": true },
      { "name": "inst_cost", "display": "Total Cost", "type": "number", "mandatory": true },
      { "name": "inst_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["DECOMMISSIONED", "ACTIVE", "ORDERED"] },
      { "name": "inst_comment", "display": "Comment", "type": "text" },
      { "name": "inst_picture", "display": "Picture", "type": "file" },
    ]
  }

  const subscriptions = {
    "tableName": "subscriptions",
    "displayName": "Subscription Records",
    "key": "subs_id",
    "display": "subs_name",
    "description": "Subscriptions",
    "columns": [
      { "name": "subs_id", "display": "Investment Id", "type": "number", "sequence": "inst_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "subs_name", "display": "Name", "type": "text", "mandatory": true },
      { "name": "subs_desc", "display": "Description", "type": "text" },
      { "name": "subs_started", "display": "Subscription Started", "type": "timestamp", "mandatory": true },
      { "name": "subs_type", "display": "Subscription Type", "type": "text", "mandatory": true, "lov":["RECURRING MONTHLY", "RECURRING YEARLY"] },
      { "name": "subs_cost", "display": "Cost", "type": "number", "mandatory": true },
      { "name" : "subs_status", "display": "Subscription Status", "type": "text", "mandatory": true, "lov":["ACTIVE", "INACTIVE"]}
    ]
  }

  let tableConfiguration = [
    { "path": "staff-page", "table": staff },
    { "path": "suppliers-page", "table": suppliers },
    { "path": "product-catalog", "table": productCategory },
    { "path": "products-page", "table": products },
    { "path": "inventory-page", "table": inventory },    
    { "path": "receipts-page", "table": receipts },
    { "path": "sales-page", "table": sales },    
    { "path": "deliveries-page", "table": deliveries },    
    { "path": "investments-page", "table": investments },
    { "path": "subscriptions-page", "table": subscriptions },
  ]

  if (view) {
    tableConfiguration = [
      { "path": "product-catalog", "table": productCategory },
      { "path": "products-page", "table": products },
      { "path": "inventory-page", "table": inventory },    
      { "path": "receipts-page", "table": receipts },
      { "path": "staff-page", "table": staff },
      { "path": "sales-page", "table": sales },    
      { "path": "suppliers-page", "table": suppliers },
      { "path": "deliveries-page", "table": deliveries },    
      { "path": "investments-page", "table": investments },
      { "path": "subscriptions-page", "table": subscriptions },
    ];
  }

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
      { "name": "user_email", "display": "Email", "type": "text", "mandatory": false },
      { "name": "user_timestamp", "display": "Created Date", "type": "timestamp" },
      { "name": "user_status", "display": "Current Status", "type": "text", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PENDING"] },
      { "name": "user_password", "display": "Password Hash", "type": "text", "mandatory": true },
      { "name": "user_user_pics", "display": "User Photo", "type": "picture" },
    ]
  }
  const user_audit = {
    "tableName": "user_audits",
    "displayName": "User Audit",
    "description": "User Login Audit",
    "columns": [
      { "name": "user_id", "display": "User Id", "type": "number"},
      { "name": "user_timestamp", "display": "Created Date", "type": "timestamp" },
      { "name": "user_status", "display": "Current Status", "type": "text", "lov": ["SUCCESS", "FAILED"] }
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

  const settings = {
    "tableName": "settings",
    "displayName": "Settings table",
    "key": "cate_id",
    "display": "cate_name",
    "description": "Settings Table",
    "columns": [
      { "name": "sett_id", "display": "Setting ID", "type": "number", "sequence": "cate_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "sett_user_id", "display": "User ID", "type": "number", "mandatory": true, "unique": true, "ref": "users" },
      { "name": "sett_company_name", "display": "Company Name", "type": "text" },
      { "name": "sett_company_logo", "display": "Logo", "type": "picture" },
      { "name": "sett_company_motto", "display": "Motto", "type": "text" },
      { "name": "sett_company_email", "display": "Email", "type": "text" },
      { "name": "sett_company_phone", "display": "Phone", "type": "text" },
      { "name": "sett_indt_id", "display": "Industry", "type": "text", "lov": ["Food and Beverage", "Clothing", "Local Spa", "Beauty Products", "Retail"] }
    ]
  }

  const tableConfiguration = [
    { "path": "user-page", "table": users },
    { "path": "user-page", "table": user_audit },
    { "path": "roles-page", "table": roles },
    { "path": "user-roles-catalog", "table": user_roles },
    { "path": "logins-page", "table": logins },
    { "path": "settings-page", "table": settings },
  ]

  return tableConfiguration;
}

function getReportConfig() {
  let data2 = []
  const businessProcess = {
    "key": "business-improvement-page",
    "title": "Business Process Improvement",
    "description": "Measure your Business Process",
    "rows": []
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
    "key": "cost-efficiency",
    "title": "Cost Efficiency Matrix",
    "description": "Measure your Business Process",
    "rows": [
    ]
  }


  const businessWaste = {
    "key": "business-waste-page",
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
    "key": "customer-satisfaction-page",
    "title": "Customer Satisfaction",
    "description": "How Happy are your customers? ",
    "rows": []
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
    "key":"inventory-optimisation-page",
    "title": "Inventory Optimisations",
    "description": "Measure how well you manage your Inventory",
    "rows": []
  }

  const platformEngagement = {
    "key":"platform-engagement-page",
    "title": "Platform Engagement",
    "description": "Measure Dynapreneur Platform Engagement",
    "rows": []
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
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
        ssl: process.env.PORT ? true : false
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

function scanAPI(app) {
  let tableName = "inventories";

  app.get("/scan/:barcode", function (req, res) {

    //console.log("Get request called for table ", tableName);
    //res.status(200).send([{ "A": "A" }, { "B": "B" }]);
    // get the paging
    // get the size
    // get any ordering requests
    let config = {};
    config.where = { "owner_user_id": req.decoded.admin, "inv_bar_code": req.params.barcode }

    sharedPersistenceMapping[tableName].findAll(config).then(r => {

      if (r) {
        return res.json(r);
      }
      else {
        return res.json({ "success": "false", "message": "No product found with barcode " + req.params.barcode });
      }
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

    let r = (where) => {
      sharedPersistenceMapping[table].findAll({
        attributes: [key, display],
        where: where
      }).then(r => {
        res.json(r.map(m => { return { id: "" + m[key], label: m[display] } }));
      });
    }

    try {
      r(where);
    }
    catch (e) {
      delete r[display];
      r(where);
    }
  });
}

function generateProductSearch(app) {
  app.post('/product-search', async function (req, res) {
    console.log(JSON.stringify(req.body));

    let query = req.body.requests[0];
    let user = req.decoded.admin;
    let page = query.params.page

    let replacements = [user]

    let categoryFilters = query.params.facetFilters;
    let countSel = 'SELECT count(*) FROM products a where a.owner_user_id = ?';
    let prodSel = `select a.prod_id, b.cate_desc, a.prod_name, a.prod_desc, a.prod_unit_price, c.inv_id,
    sum(c.inv_units_in_stock) over (partition by prod_id) total
    from products a
    inner join product_categories b on a.prod_cate_id = b.cate_id
    left outer join inventories c
    on a.prod_id = c.inv_prod_id    
    where a.owner_user_id = ?     
    ${query.params.query && query.params.query !== "" ? "and c.inv_bar_code = ?" : ""}
    limit ${query.params.hitsPerPage} offset ${page}`;
    console.log(categoryFilters);

    if (query.params.query && query.params.query !== "") {
      replacements.push(query.params.query);
    }

    if (categoryFilters && categoryFilters.length > 0) {
      countSel = `SELECT count(*) FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id 
      left outer join inventories c      
      on a.prod_id = c.inv_prod_id    
      where a.owner_user_id = ? 
      and b.cate_name in (?)`
      replacements.push(categoryFilters[0].map(x => {
        return x.substring(x.indexOf(":") + 1);
      }));
      prodSel = `SELECT a.prod_id, b.cate_desc, a.prod_name, a.prod_desc, a.prod_unit_price, c.inv_id 
      FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id
      left outer join inventories c      
      on a.prod_id = c.inv_prod_id     
      where a.owner_user_id = ? 
      ${query.params.query && query.params.query !== "" ? "and c.inv_bar_code = ?" : ""}  
      and b.cate_name in (?) limit ` + query.params.hitsPerPage + ' offset ' + page;
    }

    let total = await sequelize.query(countSel,
      { type: sequelize.QueryTypes.SELECT, replacements: replacements });
    total = total[0].count;
    total = +total;
    let result = await sequelize.query(prodSel,
      { type: sequelize.QueryTypes.SELECT, replacements: replacements });

    let pages = Math.round(total / query.params.hitsPerPage);

    let categories = {};
    let cat = await sequelize.query("select cate_name from product_categories where owner_user_id = ? order by cate_name asc",
      { type: sequelize.QueryTypes.SELECT, replacements: [user] });

    cat.forEach(x => { categories[x.cate_name] = 1 })

    // reduce results 

    let hits = result.map(x => {
      return {
        "total": +x.total,
        "categories": [x.cate_desc],
        "price": +x.prod_unit_price,
        "rating": 4,
        "image": "/api/product/image/" + x.prod_id,
        "objectID": x.prod_id,
        "inventoryID": x.inv_id,
        "_snippetResult": {
          "description": {
            "value": x.prod_desc,
            "matchLevel": "none"
          }
        },
        "_highlightResult": {
          "name": {
            "value": x.prod_name
          },
          "description": {
            "value": x.prod_desc
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
  app.post('/product-ffv', function (req, res) {
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

    sharedPersistenceMapping["products"].findById(query).then(inst => {
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

/**
 let receipt =
    {
      "recp_uuid": uuid(),
      "recp_customer": name,
      "recp_customer_email": email,
      "recp_timestamp": new Date().toString(),
      "recp_staff_id": body.staff_id,
      "recp_latitude": body.latitude,
      "recp_longitude": body.longitude,
      owner_user_id: user
    }
    let success = false;

          let item = {
            "name": b.prod_name,
            "price": b.sale_price,
            "quantity": b.sale_total_purchase,
          }*/

function sendEmail(to, receiptObj, companyObj) {
  let invoicing = require("./backend/invoicing");

  let email = invoicing.getEmail(to, receiptObj, companyObj);
  
  return email;
}

function getDate() {
  let val = new Date().toISOString()

  val = val.substring(0, val.indexOf("."));

  return val;
}

function registerReceiptService(app) {
  app.put('/saveReceipt', (req, res) => {
    let body = req.body;
    let user = req.decoded.admin;

    // body will be a list of products sold ()
    // items : [] <-- these are inv + total
    //
    // run in txn
    // confirm that inventory items have enough stock
    // create receipt
    // then create sales items

    let email = body.customerEmail || "Not Defined";
    let name = body.customerName || "Not Defined";

    let timestamp = body.timestamp;

    if (!timestamp || timestamp === "") {
      timestamp = getDate();
    }


    let receipt =
    {
      "recp_uuid": uuid(),
      "recp_customer": name,
      "recp_customer_email": email,
      "recp_timestamp": timestamp,
      "recp_staff_id": body.staff_id,
      "recp_latitude": body.latitude,
      "recp_longitude": body.longitude,
      owner_user_id: user
    }
    let success = false;

    sequelize.transaction().then(async function (t) {
      try {
        let result = await sharedPersistenceMapping["receipts"].create(receipt);
        receipt.sales = [];
        for (let i = 0; i < body.sales.length; ++i) {
          let b = body.sales[i];
          let inv = await sharedPersistenceMapping["inventories"].findById(b.inventoryId)
          let price = await sharedPersistenceMapping["products"].findById(inv.inv_prod_id)
          price = price.prod_unit_price;

          if (inv.inv_units_in_stock < b.sale_total_purchase) {
            // not enough to satisfy demand ...
            console.log("Not enough stock");
            t.rollback(); // rollback transaction!
            break;
          }
          console.log(b)
          let sale = {
            "sale_inv_id": b.inventoryId,
            "sale_price": b.sale_price,
            "sale_cost": price,
            "sale_recp_id": result.recp_id,
            "sale_status": "SOLD",
            "sale_total_purchase": b.sale_total_purchase,
            owner_user_id: user,
          }

          let item = {
            "name": b.prod_name,
            "price": b.sale_price,
            "quantity": b.sale_total_purchase,
          }

          let r = await sharedPersistenceMapping["sales"].create(sale);
          inv.inv_units_in_stock = inv.inv_units_in_stock - b.sale_total_purchase; // decrease
          let res = await inv.save(); // save
          receipt.sales.push(item);
        }
        t.commit();
        success = true;
      }
      catch (e) {
        console.log("Sale Prices is", e);
        res.status(500).json({ "success": false, "message": "Failed because of " + e });
        t.rollback();
        return;
      }

      let companyObj = await sequelize.query("select * from settings where sett_user_id = " + user);

      if (success && email !== "Not Defined")
        sendEmail(email, receipt, companyObj);
      if (success) {
        res.json({ "success": true, "message": "Done" });
      }
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

    scanAPI(app);

  });

  registerReceiptService(app);

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

router.get('/user/:userId', (req, res) => {

  // query for first 20 items matching the search
  // if empty we return firt 20 items
  // order it by the display

  let query = req.params.userId;
  let user = req.decoded.admin;

  sharedPersistenceMapping["users"].findById(query).then(inst => {
    let img = "";
    let type = "image/png";
    if (inst === null || !inst.user_user_pics || inst.user_user_pics === "" || inst.user_id !== user) {
      // 
      // send not-found image
      img = new Buffer(noImage, "base64");
    }
    else {
      let pic = inst.user_user_pics.substring(inst.user_user_pics.indexOf(","));
      img = new Buffer(pic, "base64");
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': img.length
    });
    res.end(img);
  });
})

router.get('/api/receipts-manage', function(req, res) {
  // we return receipts list
  // but we also return an array of items for each receipt
})

router.get('/tableProfiles', function (req, res) {
  // get the table configurations

  res.json(getConfiguration(true));
});

router.get('/sidebarConfig', function (req, res) {
  res.json(sidebarConfiguration());
})

router.get('/reportProfiles', function (req, res) {
  // get report profile which defines the report 
  res.json(getReportConfig());
});

const reportMapping = {
  //"business-improvement-page":
  //"business-waste-page":
  "platform-engagement-page":require("./queries/platformEngagement"),
  "customer-satisfaction-page":require("./queries/customerSatisfaction"),
  "inventory-optimisation-page":require("./queries/inventoryOptimisations"),
  "cost-efficiency":require("./queries/salesAnalysisQueries"),
  "business-improvement-page":require("./queries/businessProcessImprovement")

}

router.get('/report/:name', async function (req, res) {
  // get report based on name
  // note that the report is dynamically generated and returned
  let query = req.params.name;

  console.log("Getting results for : ", query);

  if (reportMapping[query]) {
    let result = await reportMapping[query].loadConfig(sequelize, req.decoded.admin)
    res.json(result);
    return;
  }
  res.json({});

})

router.get('/ping', function (req, res) {
  res.json({ "success": true, "message": "Done", name: req.decoded.name })
})

router.get('/user-settings', function (req, res) {
  // get user details
  // get settings if exist; if not return blank

  sharedPersistenceMapping["users"].findById(req.decoded.admin).then(u => {
    // user must exist
    sharedPersistenceMapping["settings"].findOne({ where: { "sett_user_id": req.decoded.admin } }).then(r => {
      // no result? return empty with user id set

      if (!r) {
        r = { "sett_user_id": req.decoded.admin };
      }
      u.user_password = "";
      u.user_user_pics = "/api/user/" + req.decoded.admin; // do not send
      let results = { user: u, settings: r }

      res.json(results);
    }).catch(e => {
      res.status(403).json({ success: false, "message": "Failed because " + e })
    })
  }).catch(e => {
    res.status(403).json({ success: false, "message": "Failed because " + e })
  });
})

router.put('/user-settings', function (req, res) {
  let body = req.body;

  if (body.user_id !== req.decoded.admin) {
    console.log("No permission because the user_id does not match the admin id", body.user_id, req.decoded.admin)
    res.status(403).json({ success: false, "message": "No permission to edit user" });
    return;
  }

  // resolve references first
  // assume data saved will be from the id (and not the value)
  sharedPersistenceMapping["users"].findById(body["user_id"]).then(inst => {
    if (!inst) {
      res.json({ "success": false, message: "Failed to update because we could not find the instance" });
      return;
    }

    if (body.user_password && body.user_password !== "") {
      body.user_password = bcrypt.hashSync(body.user_password, 10);
      console.log("Password was updated");
    } 
    else {
      delete body.user_password;
    }

    inst.update(body)
      .then(i => {
        i.user_password = "";
        res.json(i); // return as json instance
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ success: false, message: "Failed internal error " + e });
      });
  })
})

router.put('/company-settings', function (req, res) {
  let body = req.body;

  console.log("IDs are ", body.sett_user_id, req.decoded.admin);

  if (body.sett_user_id !== req.decoded.admin) {
    res.status(403).json({ success: false, "message": "No permission to edit company settings" });
    return;
  }

  if (!body.sett_id) {
    
    sharedPersistenceMapping["settings"].create(body)
      .then(i => {
        res.json(i); // return as json instance
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ "success": false, message: "Failed because of " + e });
      });
    return;
  }

  // resolve references first
  // assume data saved will be from the id (and not the value)
  sharedPersistenceMapping["settings"].findById(body["sett_id"]).then(inst => {
    if (!inst) {
      res.json({ "success": false, message: "Failed to update because we could not find the instance" });
      return;
    }

    if (inst.sett_user_id !== req.decoded.admin) {

      console.log("IDs are ", inst.owner_user_id, req.decoded.admin, inst);

      res.status(403).json({ success: false, "message": "No permission to edit company settings" });
      return;
    }
    inst.update(body)
      .then(i => {
        res.json(i); // return as json instance
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ success: false, message: "Failed internal error " + e });
      });
  })
})
app.post("/resetpass", function(req, res) {
  let payload = req.body;

  if (payload.authKey !== "Dynapreneur2018") {
    res.json({success: false, message:"Invalid Auth Key"});
    return;
  }
  payload.user_timestamp = new Date().getTime();
  payload.user_password = bcrypt.hashSync(payload.user_password, 10);

  
  sharedPersistenceMapping["users"].findOne({where:{user_name: payload.user_name}}).then(r => {
    if (!r) {
      res.json({ success: false, message: "Failed to reset password, user not found" })
    }
    else {
      r.update(payload, { fields: Object.keys(payload).filter(e => { return e.startsWith("user_"); }) }).then(inst=>{
        res.json({ success: true, userId: inst.user_id });
      })      
      .catch(e=>{    
        res.json({ success: false, message: "Failed to reset user password" });
      })
    }
  }).catch(e => {
    console.log("Failed creating user because of ", e);
    res.json({ success: false, message: "Failed to reset user password" });
  })
})

app.get("/uuid", function(req, res){
  res.json({"uuid":uuid()});
});

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

// app.get('/invoiceSample', function (req, res) {
//   // engagement report
//   // Daily bar chart of number of distinct users using the system
//   // > Login
//   // > Sales / Receipts >> Sales made per Dyna
//   // > Inventory / Product >> Inventory/Product updates (distinct by user)
//   // 

//   // Login
//   // select ts, count(*) from (select distinct (user_id, to_char("updatedAt", 'YYYYMMDD')) un, to_char( "updatedAt", 'YYYYMMDD') ts from user_audits) x group by ts order by ts asc;
//   // 

//   let invoicing = require("./backend/invoicing");

//   let email = invoicing.getEmail();
  
//   res.send(email);
  
  
// });
app.get('/logo/:companyId', (req, res) => {

  // query for first 20 items matching the search
  // if empty we return firt 20 items
  // order it by the display

  let query = req.params.companyId;

  sharedPersistenceMapping["settings"].findById(query).then(inst => {
    let img = "";
    let type = "image/png";
    if (inst === null || !inst.sett_company_logo || inst.sett_company_logo === "") {
      // 
      // send not-found image
      img = new Buffer(noImage, "base64");
    }
    else {
      let pic = inst.sett_company_logo.substring(inst.sett_company_logo.indexOf(","));
      img = new Buffer(pic, "base64");
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': img.length
    });
    res.end(img);
  });
})

// request survey; check if exists and if provided already
app.get('/survey/:id', async function(req, res) {
  let query = req.params.id;

  // find if feedback already provided; if not show the details for customer feedback!
  // 
  console.log("Hello");
  let recp = await sharedPersistenceMapping["receipts"].findOne({ where: { "recp_uuid": query } })
  let survey = require('./backend/surveys')

  console.log(query, "Bob");

  if (!recp) {
    // survey not exists
    res.send(survey.getNoSurvey())
    return;
  }

  if (recp.recp_customer_rating > 0) {
    // survey already completed
    res.send(survey.getSurveyCompleted());
    return;
  }
  let companyObj = await sharedPersistenceMapping["settings"].findOne({ where: {"sett_user_id": recp.owner_user_id}});
  res.send(survey.getSurvey(query, companyObj, recp));
});

// response for survey
app.post('/survey-response', async function(req, res) {
  // get the uuid of the survey
  // populate the 6 fields  
  console.log(req.body);

  let surveyId = req.body.surveyId;
  let q1 = req.body.q1;
  let q2 = req.body.q2;
  let q3 = req.body.q3;
  let q4 = req.body.q4;
  let q5 = req.body.q5;
  let text = req.body["feedback-text"];

  let recp = await sharedPersistenceMapping["receipts"].findOne({ where: { "recp_uuid": surveyId } })
  

  // confirm surveyId exists
  // confirm that survey response not yet provided

  if (recp && !recp.recp_customer_rating) {
    let result = {
      recp_customer_rating:+q1,
      recp_customer_rating1:+q2,
      recp_customer_rating2:+q3,
      recp_customer_rating3:+q4,
      recp_customer_rating4:+q5,
      recp_customer_comment:text
    }

    let r = recp.update(result)
    console.log(r);
  }

  let survey = require('./backend/surveys')

  res.send(survey.getThankyou());

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
      sharedPersistenceMapping["user_audits"].create(
        {user_id: user.user_id, user_timestamp: new Date().getTime(), user_status: "FAILED"}
      );
    } else if (user) {

      // check if password matches
      if (!bcrypt.compareSync(req.body.password, user.user_password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        sharedPersistenceMapping["user_audits"].create(
          {user_id: user.user_id, user_timestamp: new Date().getTime(), user_status: "FAILED"}
        );
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.user_id,// i want the user name
          name: user.user_fname + " " + user.user_lname
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

        // update the user.updatedAt to now() 
        // 
        sharedPersistenceMapping["user_audits"].create(
          {user_id: user.user_id, user_timestamp: new Date().getTime(), user_status: "SUCCESS"}
        );


        res.cookie('authToken', token, cookie);
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          name: user.user_fname + " " + user.user_lname
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