
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const Sequelize = require('sequelize');
const port = process.env.PORT || 3000;
const app = express();
app.use(favicon(__dirname + '/build/favicon.png'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});

function getConfiguration() {
  const staff = {
    "tableName": "Staff",
    "displayName": "Staff Records",
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
    "tableName": "Inventory",
    "displayName": "Inventory Records",
    "description": "These are your Inventory records, edit, add, remove and view any details. Records of what items you have (by batch)",
    "columns": [
      { "name": "inv_id", "display": "Inventory Id", "type": "number", "sequence": "inv_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "inv_prod_id", "display": "Product", "type": "text", "mandatory": true, "ref": "Product" },
      { "name": "inv_bar_code", "display": "Barcode", "type": "barcode", "mandatory": false },
      { "name": "inv_purchase_date", "display": "Purchase Date", "type": "timestamp", "mandatory": true, "default": formatDate() },
      { "name": "inv_expiry_date", "display": "Expiry Date", "type": "timestamp", "mandatory": true },
      { "name": "inv_units_in_stock", "display": "Amount in Stock", "type": "number", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PROBATION"] },

    ]
  }

  const products = {
    "tableName": "Product",
    "displayName": "Product Records",
    "description": "These are your Product records, edit, add, remove and view any details",
    "columns": [
      { "name": "prod_id", "display": "Product Id", "type": "number", "sequence": "prod_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "prod_name", "display": "Name", "type": "text", "mandatory": true, "unique": true },
      { "name": "prod_desc", "display": "Description", "type": "text" },
      { "name": "prod_picture", "display": "Picture", "type": "picture" },
      { "name": "prod_supl_id", "display": "Supplier", "type": "number", "mandatory": true, "ref": "Supplier" },
      { "name": "prod_cate_id", "display": "Category", "type": "number", "mandatory": true, "ref": "Product_Category" },
      { "name": "prod_units_on_order", "display": "Units on Order", "type": "number", "mandatory": true },
      { "name": "prod_discontinued", "display": "Discontinued", "type": "text", "mandatory": true, "lov": ["Discontinued", "In Stock", "Active", "Phase Out"] },
      { "name": "prod_sku", "display": "SKU", "type": "text" },
      { "name": "prod_unit_price", "display": "Cost", "type": "number", "mandatory": true },

    ]
  }

  const productCategory = {
    "tableName": "Product_Category",
    "displayName": "Product Categories Records",
    "description": "These are your Product Category records, edit, add, remove and view any details",
    "columns": [
      { "name": "cate_id", "display": "Category Id", "type": "number", "sequence": "cate_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "cate_name", "display": "Name", "type": "text", "mandatory": true, "unique": true },
      { "name": "cate_desc", "display": "Description", "type": "text" },
    ]
  }

  const sales = {
    "tableName": "Sales",
    "displayName": "Sales Records",
    "description": "These are your Sales records, edit, add, remove and view any details",
    "columns": [
      { "name": "sale_id", "display": "Sales Id", "type": "number", "sequence": "sale_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "sale_staff_id", "display": "Staff", "type": "number", "mandatory": true, "unique": true, "ref": "Staff" },
      { "name": "sale_inv_id", "display": "Inventory", "type": "number", "ref": "Inventory" },
      { "name": "sale_price", "display": "Price", "type": "number", "mandatory": true },
      { "name": "sale_cost", "display": "Cost", "type": "number", "mandatory": true },
      { "name": "sale_timestamp", "display": "Sales Date", "type": "timestamp", "mandatory": true },
      { "name": "sale_cust_id", "display": "Customer", "type": "number", "ref": "Customer" },
      { "name": "sale_status", "display": "Status", "type": "text", "lov": ["SOLD", "RETURNED", "EXCHANGE", "REFUNDED"] }
    ]
  }

  const suppliers = {
    "tableName": "Suppliers",
    "displayName": "Suppliers Records",
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
    "tableName": "Deliveries",
    "displayName": "Delivery Records",
    "description": "These are your Delivery records for your suppliers, edit, add, remove and view any details",
    "columns": [
      { "name": "devy_id", "display": "Delivery Id", "type": "number", "sequence": "devy_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "devy_prod_id", "display": "Product", "type": "number", "mandatory": true, "ref": "Product" },
      { "name": "devy_supl_id", "display": "Supplier", "type": "number", "mandatory": true, "ref": "Supplier" },
      { "name": "devy_request_date", "display": "Request Date", "type": "timestamp", "mandatory": true },
      { "name": "devy_delivery_date", "display": "Delivery Date", "type": "timestamp", "mandatory": true },
      { "name": "devy_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["ON TIME", "LATE", "VERY LATE", "BUSINESS IMPACTING"] },
      { "name": "devy_comment", "display": "Comment", "type": "text" }
    ]
  }

  const investments = {
    "tableName": "Investments",
    "displayName": "Investment Records",
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
      { "name": "inst_comment", "display": "Picture", "type": "file" }
    ]
  }

  const tableConfiguration = [
    { "path": "staff-page", "table": staff },
    { "path": "inventory-page", "table": inventory },
    { "path": "products-page", "table": products },
    { "path": "sales-page", "table": sales },
    { "path": "suppliers-page", "table": suppliers },
    { "path": "deliveries-page", "table": deliveries },
    { "path": "investments-page", "table": investments }
  ]

  return tableConfiguration;
}

// persistence mapping for our configurations
// mapping to sequelize objects generated by generateRoutes
var sharedPersistenceMapping = {}
var persistenceKey = {}
// function that returns for get / put / update / delete
var sequelize = null; // connect to sequelize

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
      entry.type = Sequelize.BLOB;
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

function generateSequelize(config) {
  let tableName = config.table.tableName.toLowerCase();
  let columns = {};
  config.table.columns.forEach(column => {
    let entry = {};
    deriveType(entry, column);
    entry.allowNull = !column.mandatory;

    if (column.default) {
      if (column.type == "timestamp") {
        entry.defaultValue = Sequelize.NOW;
      }
      else {
        entry.defaultValue = column.default;
      }
    }

    if (column.lov) {
      entry.isIn = column.lov;
    }

    entry.unique = column.unique;
    entry.primaryKey = column.key;
    entry.autoIncrement = column.key;

    deriveReferences(entry, column);

    columns[column.name] = entry;

    if (column.key) {
      persistenceKey[tableName] = column.name;
    }
  });

  console.log('============', tableName);
  console.log(columns);

  //sharedPersistenceMapping[tableName] = sequelize.define(tableName, columns);
}

function generateRoutes(app, configuration) {

  configuration.forEach(conf => {
    console.log(conf.table.tableName);
    app.get("/api/" + conf.table.tableName.toLowerCase(), function (req, res) {
      res.status(200).send([{ "A": "A" }, { "B": "B" }]);
    });
    app.delete("/api/" + conf.table.tableName.toLowerCase() + "/:id", function (req, res) {
      res.status(200).send([{ "A": "A" }, { "B": "B" }]);
    });
    app.put("/api/" + conf.table.tableName.toLowerCase(), function (req, res) {
      res.status(200).send([{ "A": "A" }, { "B": "B" }]);
    });
    generateSequelize(conf);
  });
}
// get will return paged data
generateRoutes(app, getConfiguration());

app.get('/', function (req, res) {
  console.log("Override");
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// put will allow user to update / save record (if id does not exist we save, else we update)

// delete will allow user to delete a record

app.listen(port);