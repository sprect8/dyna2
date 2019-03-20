/*
----
-- Inventory Optimisation
----
-- Days of Supply: current sales (last month) vs current inventory > current inventory / current sales (per month)
-- Inventory Turn 
   -- Monthly: total sold vs total avg inventory
-- Stock Sales Ratio
   -- Monthly: products
   -- Averaged Units of Inventory Available ÷ Average Units Sold
-- Sell Through Percentage
   -- Average Units Sold ÷ Average Units of Inventory Available.
-- Inventory Count Sheet
   -- Giant list of product vs current count
-- Inventory Expiration Count (monthly)
-- Inventory Lookup
*/

// monthly data capture [daily] - evaluated to monthly
// cost of good sold - cost_of_goods_sold
// inventory available - total_inv_available
// units sold - total_inv_sold
// price of good sold - price
// date (yyyy-mm-dd) - date_id
// month (yyyy-mm) - month_id


// Create index on each table
// Merge the f_daily_product and f_daily_inventories into f_daily_sales (use current date to merge)
// create table f_daily_inventories (date_id integer not null, 
// month_id integer not null, total_inv_available double not null);

// create table f_daily_product (date_id integer not null, 
// month_id integer not null, price float not null,  
// cost_of_goods_sold double not null, total_inv_sold integer not null);

// create table f_daily_sales (date_id integer not null, 
// month_id integer not null, total_inv_available double not null, 
// cost_of_goods_sold double not null, total_inv_sold integer not null);
// 

// select sum(inv_units_in_stock) total_inv_available, inv_prod_id, to_char(now(), 'YYYYMMDD') date_id, to_char(now(), 'YYYYMM') month_id from inventories where owner_user_id = 11 group by inv_prod_id;
// select sum(sale_price) price, sum(sale_cost) cost_of_goods_sold, sum(sale_total_purchase) total_inv_sold, inv_prod_id prod_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMMDD') date_id,to_char(to_date(recp_timestamp, 'YYYY-MM-DD'), 'YYYYMM') month_id from sales, receipts, inventories where sale_inv_id = inv_id and sale_recp_id = recp_id group by prod_id, date_id, month_id


// f_daily_products
// f_daily_inventories
// f_daily_sales

// current inventory (how long our current inventory will last?)
// 1 / [Inventory Turn] * 365 - month
const dayOfSupply = "select 1/(avg(cost_of_goods_sold)/avg(total_inv_available)) dos from f_daily_sales where month_id = ? and owner_user_id = ?";
const dosMonth = "select 1/(avg(cost_of_goods_sold)/avg(total_inv_available)) dos, month_id from f_daily_sales where month_id >= ? and owner_user_id = ? group by month_id order by month_id asc";
// calculate stock levels and such over time? need monthly stock level evaluated; and we query for latest copy of the trade 
// we should calculate stock levels vs sales across all products, and sum up total for fact table

// average monthly inentory vs average total sold
const inventoryTurn = "select avg(cost_of_goods_sold) / avg(total_inv_available) inv_turn from f_daily_sales where month_id = ? and owner_user_id = ?"; // cost of goods sold / average inventory
const invTurnMonth = "select avg(cost_of_goods_sold) / avg(total_inv_available) inv_turn, month_id from f_daily_sales where month_id >= ? and owner_user_id = ? group by month_id order by month_id asc"; // cost of goods sold / average inventory
// average units sold vs average units of inventory available
const stockSalesRatio = "select avg(total_inv_available) / avg(total_inv_sold) stock_sales_ratio from f_daily_sales where month_id = ? and owner_user_id = ?";
const ssrMonth = "select avg(total_inv_available) / avg(total_inv_sold) stock_sales_ratio, month_id from f_daily_sales where month_id >= ? and owner_user_id = ? group by month_id order by month_id asc";
// 
const sellThrough = "select avg(total_inv_sold) / avg(total_inv_available) sell_through from f_daily_sales where month_id = ? and owner_user_id = ?";
const stMonth = "select avg(total_inv_sold) / avg(total_inv_available) sell_through, month_id from f_daily_sales where month_id >= ? and owner_user_id = ? group by month_id order by month_id asc";

const inventoryStock = `
select cate_name, sum(total) total, month mon, year
from f_monthly_inventory a , products b, product_categories
where a.prod_id = b.prod_id and a.user_id = ? and b.prod_cate_id = cate_id
and year = ?
group by cate_name, month, year 
order by year asc, month asc
`

// additional charts (pies)
// product type sales mix
const productType = `select cate_name, count(*) sold,  to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon
from receipts, product_categories xx, products, inventories, sales 
where recp_id = sale_recp_id and cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = ?
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY') = ?
group by cate_name, mon
`;
// product type sales 
const productTypeProfit = `select cate_name, sum(sale_price - sale_cost) profit,  to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon
from receipts, product_categories xx, products, inventories, sales 
where recp_id = sale_recp_id and cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = ?
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY') = ?
group by cate_name, mon
`;


// -- Product Backlog
// average age of inventory (over month) vs type
const expiringInventory = `select cate_name, sum(expired) expired, sum(expiring_30) expiring_30, sum(expiring_60) expiring_60, month mon, year 
from f_monthly_stock_expiry a, products b, product_categories c 
where a.prod_id = b.prod_id and b.prod_Cate_id = c.cate_id and a.user_id = ? group by cate_name, month, year order by month asc`

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
      { title: "Days of Supply", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("rgba(72,166,242,1)") },
      { title: "Inventory Turn", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("orange") }
    ]
  },
  {
    widgets: [
      { title: "Stock Sales Ratio", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction: "downward", data: getRowX("purple") },
      { title: "Sell Through Ratio", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("darkgreen") }
    ]
  }
]

const inventoryOptimisation = {
  "key": "inventory-optimisation-page",
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
        "title": "Inventory Stock",
        "description": "Average Stock we have over a month",
        "type": "AREA",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      },
      {
        "title": "Product Type Sales Mix",
        "description": "Best Selling Items",
        "type": "STACKEDBAR",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      }
    ],
    [
      {
        "title": "Product Type Profit Mix",
        "description": "Most Profitable Products",
        "type": "LINE",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      },
      {
        "title": "Item Expiry",
        "description": "Chart of items about to expire (based on Category)",
        "type": "LINE",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      }
    ],
  ]
}


let colors = ["rgba(72,166,242,1)", "orange", "purple", "darkgreen", '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']

module.exports = {
  loadConfig: async (db, user) => {

    let year = new Date().getFullYear();
    let mon = new Date().getMonth() + 1;

    if (user === 11) {
      year = 2017;
    }


    year = year + "";

    let ym = year + (mon < 10 ? "0" : "") + mon;

    let dos = await db.query(dayOfSupply,
      { type: db.QueryTypes.SELECT, replacements: [ym, user] });

    let invT = await db.query(inventoryTurn,
      { type: db.QueryTypes.SELECT, replacements: [ym, user] });

    let ssr = await db.query(stockSalesRatio,
      { type: db.QueryTypes.SELECT, replacements: [ym, user] });

    let st = await db.query(sellThrough,
      { type: db.QueryTypes.SELECT, replacements: [ym, user] });

    let dosM = await db.query(dosMonth,
      { type: db.QueryTypes.SELECT, replacements: [year + "01", user] });
    let invTM = await db.query(invTurnMonth,
      { type: db.QueryTypes.SELECT, replacements: [year + "01", user] });
    let ssrM = await db.query(ssrMonth,
      { type: db.QueryTypes.SELECT, replacements: [year + "01", user] });
    let stM = await db.query(stMonth,
      { type: db.QueryTypes.SELECT, replacements: [year + "01", user] });



    let inventory = await db.query(inventoryStock,
      { type: db.QueryTypes.SELECT, replacements: [user, year] });

    let prodType = await db.query(productType,
      { type: db.QueryTypes.SELECT, replacements: [user, year] });

    let prodProfit = await db.query(productTypeProfit,
      { type: db.QueryTypes.SELECT, replacements: [user, year] });

    let expiring = await db.query(expiringInventory,
      { type: db.QueryTypes.SELECT, replacements: [user, user] });

    let uniqueDates = [...new Set([...inventory.map(x=>x.year + "/" + (x.mon <= 9 ? "0" : "") + x.mon),...prodType.map(x=>x.mon),...prodProfit.map(x=>x.mon),...expiring.map(x=>x.year + "/" + (x.mon <= 9 ? "0" : "") + x.mon)])]; //   => remove duplication


    uniqueDates = uniqueDates.sort();


    let ie = JSON.parse(JSON.stringify(inventoryOptimisation));

    let stats = ie[0][1].data;
    stats[0].widgets[0].amount = dos ? dos.dos : 0;
    stats[0].widgets[0].data.datasets.data = dosM.map(e=>e.dos);
    
    stats[0].widgets[1].amount = invT ? invT.inv_turn : 0;
    stats[0].widgets[1].data.datasets.data = invTM.map(e=>e.inv_turn);
    
    stats[1].widgets[0].amount = ssr ? ssr.stock_sales_ratio : 0;
    stats[1].widgets[0].data.datasets.data = ssrM.map(e=>e.stock_sales_ratio);
    
    stats[1].widgets[1].amount = st ? st.sell_through : 0;
    stats[1].widgets[1].data.datasets.data = stM.map(e=>e.sell_through);
    
    let invds = {
      labels: uniqueDates,
      datasets: []
    }

    // get unique workers
    let invN = {}
    let idx = 0;
    inventory.forEach(x=>{
      if (!invN[x.cate_name]) {
        invN[x.cate_name] = Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0});
        invds.datasets.push({
          label: x.cate_name,
          fill:true,
          backgroundColor: colors[idx++ % colors.length],
          data: invN[x.cate_name],
          lineTension: 0.1,
          pointRadius: 1,
          pointHitRadius: 10,
        })
      }
      invN[x.cate_name][uniqueDates.indexOf(x.year + "/" + (x.mon <= 9 ? "0" : "") + x.mon)] = +x.total;
    });
    console.log(inventory);

    ie.rows[1][0].data = invds;


    let ptds = {
      labels: uniqueDates,
      datasets: []
    }

    // get unique workers
    let ptN = {}
    idx = 0;
    prodType.forEach(x=>{
      if (!ptN[x.cate_name]) {
        ptN[x.cate_name] = Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0});
        ptds.datasets.push({
          label: x.cate_name,
          fill:true,
          backgroundColor: colors[idx++ % colors.length],
          data: ptN[x.cate_name],
          lineTension: 0.1,
          pointRadius: 1,
          pointHitRadius: 10,
        })
      }
      ptN[x.cate_name][uniqueDates.indexOf(x.mon)] = +x.sold;
    });
    console.log(inventory);

    ie.rows[1][1].data = ptds;



    let ppds = {
      labels: uniqueDates,
      datasets: []
    }

    // get unique workers
    let ppN = {}
    idx = 0;
    prodProfit.forEach(x=>{
      if (!ppN[x.cate_name]) {
        ppN[x.cate_name] = Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0});
        ppds.datasets.push({
          label: x.cate_name,
          fill:false,
          borderColor: colors[idx % colors.length],
          backgroundColor: colors[idx++ % colors.length],
          data: ppN[x.cate_name],
          lineTension: 0.1,
          pointRadius: 1,
          pointHitRadius: 10,
        })
      }
      ppN[x.cate_name][uniqueDates.indexOf(x.mon)] = +x.profit;
    });
    console.log(expiring);

    ie.rows[2][0].data = ppds;



    let exds = {
      labels: uniqueDates,
      datasets: []
    }

    // get unique workers
    let exN = {}
    idx = 0;
    expiring.forEach(x=>{
      if (!exN[x.cate_name]) {
        exN[x.cate_name] = Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0});
        exds.datasets.push({
          label: x.cate_name,
          fill:false,
          borderColor: colors[idx % colors.length],
          backgroundColor: colors[idx++ % colors.length],
          data: exN[x.cate_name],
          lineTension: 0.1,
          pointRadius: 1,
          pointHitRadius: 10,
        })
      }
      exN[x.cate_name][uniqueDates.indexOf(x.year + "/" + (x.mon <= 9 ? "0" : "") + x.mon)] = +x.expiring_30;
    });
    console.log(inventory);

    ie.rows[2][1].data = exds;

    return ie;

    /*
    let sScore = await db.query(salesScore,
    { type: db.QueryTypes.SELECT, replacements: [user, user] });

    let pScore = await db.query(productScore, 
      { type: db.QueryTypes.SELECT, replacements: [user]})

    let stScore = await db.query(staffScore, 
      { type: db.QueryTypes.SELECT, replacements: [user]})  
    let spScore = await db.query(supplierScore, 
      { type: db.QueryTypes.SELECT, replacements: [user]})  
    sScore = sScore.map(x=>{return {mon: x.year + "/" + (x.mon<=9?"0":"") + x.mon, score: x.score};});
    
    // take avg of each to generate score value
    // worker score
    let workers = await db.query(salesProfit, 
      { type: db.QueryTypes.SELECT, replacements: [user]}) 

    // supplier score
    let suppliers = await db.query(supplierStatus, 
      { type: db.QueryTypes.SELECT, replacements: [user]}) 

    let uniqueDates = [...new Set([...sScore.map(x=>x.mon) ,...pScore.map(x=>x.mon), ...stScore.map(x=>x.mon), ...spScore.map(x=>x.mon)])]; //   => remove duplication

    uniqueDates = uniqueDates.sort();

    let dds = JSON.parse(JSON.stringify(ds));

    dds.labels = uniqueDates;

    // NOTE: holes in the data will not be properly reflected here; this is only good for the demo!
    dds.datasets[0].data = sScore.map(x=>x.score); // sales
    dds.datasets[1].data = pScore.map(x=>x.score); // product
    dds.datasets[2].data = stScore.map(x=>x.score); // staff
    dds.datasets[3].data = spScore.map(x=>x.score); // supplier

    let ce = JSON.parse(JSON.stringify(costEfficiency));

    // populate the overall scoring
    ce.rows[0][0].data = dds;

    // populate the summary view (we calculate average of 1 year, and then show also current value; datax is our base)

    // collapse sScore to avg, and take last one; same for others
    let sScoreAvg = 0;
    let pScoreAvg = 0;
    let stScoreAvg = 0;
    let spScoreAvg = 0;

    sScore.forEach(x=>{sScoreAvg += +x.score})
    pScore.forEach(x=>{pScoreAvg += +x.score})
    stScore.forEach(x=>{stScoreAvg += +x.score})
    spScore.forEach(x=>{spScoreAvg += +x.score})
    
    sScoreAvg = sScoreAvg / sScore.length
    pScoreAvg = pScoreAvg / pScore.length
    stScoreAvg = stScoreAvg / stScore.length
    spScoreAvg = spScoreAvg / spScore.length

    let ddx = JSON.parse(JSON.stringify(datax));
    ddx[0].widgets[0].title = "Sales Score"
    ddx[0].widgets[0].amount = Math.round(100 * sScore[sScore.length - 1].score)/100
    ddx[0].widgets[0].progress = Math.round(100*ddx[0].widgets[0].amount / 5)
    ddx[0].widgets[0].direction = ddx[0].widgets[0].amount > sScoreAvg ? "upward" : "downward"

    ddx[0].widgets[1].title = "Product Score"
    ddx[0].widgets[1].amount = Math.round(100 * pScore[pScore.length - 1].score)/100
    ddx[0].widgets[1].progress = Math.round(100*ddx[0].widgets[1].amount / 5)
    ddx[0].widgets[1].direction = ddx[0].widgets[1].amount > pScoreAvg ? "upward" : "downward"

    ddx[1].widgets[0].title = "Staff Score"
    ddx[1].widgets[0].amount = Math.round(100 * stScore[stScore.length - 1].score)/100
    ddx[1].widgets[0].progress = Math.round(100*ddx[1].widgets[0].amount / 5)
    ddx[1].widgets[0].direction = ddx[1].widgets[0].amount > stScoreAvg ? "upward" : "downward"

    ddx[1].widgets[1].title = "Supplier Score"
    ddx[1].widgets[1].amount = Math.round(100 * spScore[spScore.length - 1].score)/100
    ddx[1].widgets[1].progress = Math.round(100*ddx[1].widgets[1].amount / 5)
    ddx[1].widgets[1].direction = ddx[1].widgets[1].amount > spScoreAvg ? "upward" : "downward"

    ce.rows[0][1].data = ddx;

    //ce.rows[1][0].data = "";
    //ce.rows[1][1].data = "";
    //console.log(workers);
    //console.log(suppliers);

    let workerds = {
      labels: uniqueDates,
      datasets: []
    }

    // get unique workers
    let workerNames = {}
    let idx = 0;
    workers.forEach(x=>{
      if (!workerNames[x.staff_name]) {
        workerNames[x.staff_name] = Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0});
        workerds.datasets.push({
          label: x.staff_name,
          fill:true,
          backgroundColor: colors[idx++ % colors.length],
          data: workerNames[x.staff_name],
          lineTension: 0.1,
          pointRadius: 1,
          pointHitRadius: 10,
        })
      }
      workerNames[x.staff_name][uniqueDates.indexOf(x.mon)] = x.profit_after_salary;
    });

    ce.rows[1][0].data = workerds;

    // get unique suppliers
    let supplierds = {
      labels: uniqueDates,
      datasets: []
    }

    // get unique workers
    let supplierNames = {}
    idx = 0;
    suppliers.forEach(x=>{
      if (!supplierNames[x.supl_company]) {
        supplierNames[x.supl_company] = Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0});
        supplierds.datasets.push({
          label: x.supl_company,
          fill:true,
          backgroundColor: colors[idx++ % colors.length],
          data: supplierNames[x.supl_company],
          lineTension: 0.1,
          pointRadius: 1,
          pointHitRadius: 10,
        })
      }
      supplierNames[x.supl_company][uniqueDates.indexOf(x.year + "/" + (x.monthly <= 9 ? "0" : "") + x.monthly)] = (+x.late) + (+x.very_late) + (+x.business_impacting);
    });

    ce.rows[1][1].data = supplierds


    let invest = await db.query(investments,
      { type: db.QueryTypes.SELECT, replacements: [user, user] });
 
    let totalInvest = 0;
    let data = [];

    invest.forEach(x=>{
      totalInvest += (+x.inst_cost * +x.inst_units);
      let start = x.inst_timestamp.split("-")[0]
      let end = "Present";
      if (x.inst_timestamp_inactive.length > 0) {
        end = x.inst_timestamp_inactive.split("-")[0];
      }

      data.push({type: "work", "date": start + " - " + end, "title": x.inst_category, "subtitle": x.inst_name, "description":x.inst_desc})
    })

    ce.rows[2][0].description = totalInvest > 0 ? "These are records of your investments (" + totalInvest + " RM)" : "No investments found";
    ce.rows[2][0].data = data;

    return ce;

    */
  }
}