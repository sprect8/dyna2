async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
const fn = (view, db)=>{
    /*try {        
        let result = await db["systemschemaconfiguration"].findAll();

        let ret = {};

        await asyncForEach(result, async e=>{
            ret = JSON.parse(e.schema_config);
        });
        console.log(ret);
        return ret;
    }
    catch (e) {
        console.log(e);
    }*/
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
          { "name": "inv_purchase_date", "display": "Purchase Date", "type": "timestamp", "mandatory": true, "default": '2020-01-01' },
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

      const reportConfiguration = {
        "tableName": "reportConfiguration",
        "displayName": "Report Configuration",
        "key": "report_id",
        "description": "Generate Reports for configuration",
        "columns": [
          { "name": "report_id", "display": "Report Id", "type": "number", "sequence": "report_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "report_name", "display": "Report Name", "type": "text", "mandatory": true },
          { "name": "report_path", "display": "Report Path", "type": "text", "mandatory": true },
          { "name": "report_configuration", "display": "Report Configuration", "type": "text", "mandatory": true },          
        ]
      }

      const datasourceConfiguration = {
        "tableName": "dsconfiguration",
        "displayName": "Datasource Configuration",
        "key": "ds_id",
        "description": "Datasources used by the reports",
        "columns": [
          { "name": "ds_id", "display": "DS Id", "type": "number", "sequence": "ds_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "ds_name", "display": "Datasource Name", "type": "text", "mandatory": true },
          { "name": "ds_desc", "display": "Datasource Desc", "type": "text", "mandatory": true },
          { "name": "ds_configuration", "display": "DS Configuration", "type": "text", "mandatory": true },          
        ]
      }

      const sideBarConfiguration = {
        "tableName": "sidebarConfiguration",
        "displayName": "Sidebar Configuration",
        "key": "sidebar_id",
        "description": "Configure contents of the sidebar",
        "columns": [
          { "name": "sidebar_id", "display": "Sidebar ID", "type": "number", "sequence": "sidebar_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "sidebar_config", "display": "Sidebar Configuration", "type": "text", "mandatory": true},          
        ]
      }

      const infobeatmotor = {
        "tableName": "infobeatmotor",
        "displayName": "InfoBeatMotor Configuration",
        "key": "infobeat_id",
        "description": "Infobeat Table",
        "columns": [
          { "name": "infobeat_id", "display": "Infobeat ID", "type": "number", "sequence": "infobeat_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "infobeat_state", "display": "State", "type": "text", "mandatory": true},          
          { "name": "infobeat_office", "display": "Office", "type": "text", "mandatory": true},          
          { "name": "infobeat_vol_motor", "display": "Motor", "type": "text", "mandatory": true},          
          { "name": "infobeat_vol_van", "display": "Van", "type": "text", "mandatory": true},
          { "name": "infobeat_month", "display": "Month", "type": "number", "mandatory": true, "default": 202002}          
        ]
      }

      const internalConfig = {
        "tableName": "systemschemaconfiguration",
        "displayName": "System Schema Config",
        "key": "schema_id",
        "description": "Configure table information",
        "columns": [
          { "name": "schema_id", "display": "Schema ID", "type": "number", "sequence": "schema_id_seq", "mandatory": true, "unique": true, "key": true },
          { "name": "schema_config", "display": "Schema Configuration", "type": "text", "mandatory": true},          
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
        // { "path": "staff-page", "table": staff },
        // { "path": "suppliers-page", "table": suppliers },
        // { "path": "product-catalog", "table": productCategory },
        // { "path": "products-page", "table": products },
        // { "path": "inventory-page", "table": inventory },    
        // { "path": "receipts-page", "table": receipts },
        // { "path": "sales-page", "table": sales },    
        // { "path": "deliveries-page", "table": deliveries },    
        // { "path": "investments-page", "table": investments },
        // { "path": "subscriptions-page", "table": subscriptions },
        { "path": "report-page", "table": reportConfiguration },
        { "path": "ds-config-page", "table": datasourceConfiguration },
        { "path": "sidebar-page", "table": sideBarConfiguration },
        { "path": "infobeat-page", "table": infobeatmotor },
        { "path": "internal-config-page", "table": internalConfig },
        
      ]
    
      if (view) {
        tableConfiguration = [
        //   { "path": "product-catalog", "table": productCategory },
        //   { "path": "products-page", "table": products },
        //   { "path": "inventory-page", "table": inventory },    
        //   { "path": "receipts-page", "table": receipts },
        //   { "path": "staff-page", "table": staff },
        //   { "path": "sales-page", "table": sales },    
        //   { "path": "suppliers-page", "table": suppliers },
        //   { "path": "deliveries-page", "table": deliveries },    
        //   { "path": "investments-page", "table": investments },
        //   { "path": "subscriptions-page", "table": subscriptions },
          { "path": "report-page", "table": reportConfiguration },
          { "path": "ds-config-page", "table": datasourceConfiguration },
          { "path": "sidebar-page", "table": sideBarConfiguration },
          { "path": "infobeat-page", "table": infobeatmotor },
          //{ "path": "internal-config-page", "table": internalConfig },
        ];
      }

      console.log(JSON.stringify(tableConfiguration));
    
      return tableConfiguration;
}

module.exports = {
    configuration:fn
}