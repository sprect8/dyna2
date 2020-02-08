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
  
  function registerReceiptService(app, sequelize, sharedPersistenceMapping) {
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
  