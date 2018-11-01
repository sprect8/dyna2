
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const Sequelize = require('sequelize');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser')
var morgan = require('morgan');

const bcrypt = require('bcrypt');

const app = express();
// parse application/json
app.use(bodyParser.json())

//
app.set('superSecret', "dyna2018"); // secret variable


app.use(favicon(__dirname + '/build/favicon.png'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});

function getConfiguration() {
  const staff = {
    "tableName": "staffs",
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
    "tableName": "inventories",
    "displayName": "Inventory Records",
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
      { "name": "user_name", "display": "Username", "type": "text", "mandatory": true },
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
    console.log(columns)
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

    console.log("Get request called for table ", tableName);
    //res.status(200).send([{ "A": "A" }, { "B": "B" }]);
    // get the paging
    // get the size
    // get any ordering requests
    let page = 0;
    let size = 20;
    let order = null;
    let column = null;

    let config = { limit: size, offset: page };

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
    console.log("Update api called for table", tableName, req.body);
    sharedPersistenceMapping[tableName].upsert(req.body)
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

  });


  sequelize.sync();

  // get LOV based on model
  // we will have query params for searching the lov with like
  // run a query? perhaps we can do some client side caching here
  app.get("/lov/:model", function (req, res) {

  });
}
// get will return paged data
let router = express.Router();

// protect the routes
router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

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

app.post("/register", function (req, res) {
  // create a new user
  // we need to admin key when login, and this key is hard coded 

  let payload = req.body;

  if (payload.authKey !== "Dynapreneur2018") {
    res.json({ success: false, message: "Invalid Auth Key" });
    return;
  }

  payload.user_status = 'ACTIVE';
  payload.user_timestamp = new Date();
  payload.user_password = bcrypt.hashSync(payload.user_password, 10);

  sharedPersistenceMapping["users"].create(payload, { fields: [Object.keys(payload).filter(e=>{return e.startsWith("user_");})] }).then(r => {
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
      name: req.body.name
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
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
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

app.get('/tableProfiles', function (req, res) {
  // get the table configurations

  res.json(tableConfiguration);
});

app.get('/reportProfiles', function (req, res) {
  // get report profile which defines the report 
});

app.get('/report/:name', function (req, res) {
  // get report based on name
  // note that the report is dynamically generated and returned
})

app.get('/', function (req, res) {
  console.log("Override");
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// put will allow user to update / save record (if id does not exist we save, else we update)

// delete will allow user to delete a record

app.listen(port);