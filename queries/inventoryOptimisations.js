
// additional charts (pies)
// product type sales mix
const productType = `select cate_name, count(*) sold 
from receipts, product_categories xx, products, inventories, sales 
where recp_id = sale_recp_id and cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = ?
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') = '2017/12'
group by cate_name
`;
// product type sales 
const productTypeProfit = `select cate_name, sum(sale_price - sale_cost) profit 
from receipts, product_categories xx, products, inventories, sales 
where recp_id = sale_recp_id and cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = ?
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') = '2017/12'
group by cate_name
`;








const salesScore = `select *, case when s > 1 then 5 else s*5 end score from (
    select *,        profitable / (select sum(b.sale_price - b.sale_cost)
           from receipts a, sales b where a.recp_id = b.sale_recp_id
        and date_part('year', to_date(a.recp_timestamp, 'YYYY/MM/DD')) = year-1
        and date_part('mon', to_date(a.recp_timestamp, 'YYYY/MM/DD')) = mon
        and a.owner_user_id = ?
           ) as s          
    from (
    SELECT 	date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) as year,
           date_part('mon', to_date(recp_timestamp, 'YYYY/MM/DD')) AS mon,       
           sum(sale_price - sale_cost) profitable
    FROM receipts xx, sales
    where sale_recp_id = recp_id and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = 2017
    and xx.owner_user_id = ?
    GROUP BY year, mon
    ORDER BY year, mon) x) y
    `;

// product scoring
// score the product
// product effectiveness is a ranking between 1 - 10 for overall products
// 10 means all products are selling profitably
// 5 means 50%
// 1 means > 80% not profitable
// score over time, indicate issues

const productScore = `select mon, 5 - (nonprofitable::float*5 / total) score from (
select to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, sum(case when sale_price - sale_cost > 0 then 1 else 0 end) profitable, 
sum(case when sale_price - sale_cost <= 0 then 1 else 0 end) nonprofitable,
count(*) total 
from products xx, receipts, inventories, sales where recp_id = sale_recp_id and sale_inv_id = inv_id and inv_prod_id = prod_id and xx.owner_user_id = ? 
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = 2017
group by mon order by mon ) x`;


// staff scoring -- staff and how much they bring in each month
// scored - 
// avg staff scoring each month
const staffScore = `select mon, avg(score) score from (
select staff_name, mon, 
case when profit_after_salary > 1000 then 5 
     when profit_after_salary > 600 then 4 
     when profit_after_salary > 300 then 3 
     when profit_after_salary > 100 then 2 
     else 1 end score     
from (select staff_name, to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, sum(sale_price - sale_cost) - avg(staff_salary) profit_after_salary  from receipts xx, staffs, sales 
where recp_id = sale_recp_id and recp_staff_id = staff_id and xx.owner_user_id = ? 
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = 2017
group by staff_name, mon order by mon asc) x) y group by mon
`;
// supplier scoring 
// scored based on on time, late, very late and business impacting; scaled as 1, 0.5, 1, 2; 5 + (a) - 0.5*b - c - d*2
const supplierScore = `select year||'/'||case when monthly <= 9 then '0' else '' end || monthly mon, case when score > 5 then 5 when score < 0 then 0 else score end score
from (
select date_part('year', to_date(devy_delivery_date, 'YYYY-MM-DD')) as year,
	date_part('month', to_date(devy_delivery_date, 'YYYY-MM-DD')) AS monthly, 
       5 - 0.2 * sum(case when devy_status = 'LATE' then 1 else 0 end) - 0.3 * sum(case when devy_status = 'VERY LATE' then 1 else 0 end) - 0.5 * sum(case when devy_status = 'BUSINESS IMPACTING' then 1 else 0 end) score
from deliveries xx, suppliers where supl_id = devy_supl_id and xx.owner_user_id = ?
and date_part('year', to_date(devy_delivery_date, 'YYYY/MM/DD')) = 2017
group by year, monthly) x
`;

// sales profitability more important than amount of sales
// this is the query for the sales report against employees and time
// 
const salesProfit = `select staff_name, to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, 
sum(sale_price - sale_cost) - avg(staff_salary) profit_after_salary  from receipts xx, staffs, sales 
where recp_id = sale_recp_id and recp_staff_id = staff_id and xx.owner_user_id = ? 
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = 2017
group by staff_name, mon order by mon asc
`;
// top best performing
const bestPerformer = `select prod_name, sum(sale_price - sale_cost) from products xx, receipts, inventories, sales 
where recp_id = sale_recp_id and sale_inv_id = inv_id and inv_prod_id = prod_id and xx.owner_user_id = ?
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = 2017
group by prod_name order by 2 desc limit 5`;

// revenue comparison (month on month)
const monthlyProfit = `select * from (select to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, 
sum(sale_price - sale_cost) profit from receipts xx, sales where recp_id = sale_recp_id and xx.owner_user_id = ? group by mon order by mon asc`;


// product type sales mix
const productType = `select cate_name, count(*) sold 
from product_categories xx, products, inventories, sales , receipts
where cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = 1
and recp_id = sale_recp_id
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = 2017
group by cate_name
`;

// product type sales 
const productTypeProfit = `select cate_name, sum(sale_price - sale_cost) sales 
from product_categories xx, products, inventories, sales 
where cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = ? group by cate_name
`;

// regional sales mix on map
const regionalProfit = `select round(recp_latitude, 3) latitude, round(recp_longitude, 3) longitude, 
sum(sale_price - sale_cost) profit from receipts xx, sales 
where recp_id = sale_recp_id and xx.owner_user_id = ? group by latitude, longitude order by profit asc
`;
// supplier statuses 
// Monthly
const supplierStatus = `select supl_company, date_part('year', to_date(devy_delivery_date, 'YYYY-MM-DD')) as year,
       date_part('month', to_date(devy_delivery_date, 'YYYY-MM-DD')) AS monthly, 
       sum(case when devy_status = 'ON TIME' then 1 else 0 end) on_time, 
       sum(case when devy_status = 'LATE' then 1 else 0 end)late, 
       sum(case when devy_status = 'VERY LATE' then 1 else 0 end)very_late, 
       sum(case when devy_status = 'BUSINESS IMPACTING' then 1 else 0 end)business_impacting 
from deliveries xx, suppliers where supl_id = devy_supl_id and xx.owner_user_id = ? group by supl_company, year, monthly
order by monthly asc
`;
// profitability (weekly)
const weeklyProfit = `SELECT 	date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) as year,
       date_part('week', to_date(recp_timestamp, 'YYYY/MM/DD')) AS weekly,       
       sum(sale_price - sale_cost) profitable          
FROM receipts xx, sales
where sale_recp_id = recp_id and xx.owner_user_id = ?
GROUP BY year, weekly
ORDER BY year, weekly
`;

const investments = `select * from investments xx where xx.owner_user_id = ? order by inst_timestamp desc`

let ds = {    
  labels: Array.apply(null, {length:30}).map(Number.call, Number),
  datasets: [
    {
      label: "Sales Score",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(72,166,242,1)",
      borderColor: "rgba(72,166,242,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(72,166,242,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(72,166,242,1)",
      pointHoverBorderColor: "rgba(72,166,242,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: Array.apply(null, {length:30}).map(Function.call, ()=>{return Math.random() + 4;})
    },
    {
      label: "Product Score",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "orange",
      borderColor: "orange",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "orange",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "orange",
      pointHoverBorderColor: "orange",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: Array.apply(null, {length:30}).map(Function.call, ()=>{return Math.random() + 2;})
    },
    {
      label: "Staff Score",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "purple",
      borderColor: "purple",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "purple",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "purple",
      pointHoverBorderColor: "purple",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: Array.apply(null, {length:30}).map(Function.call, ()=>{return Math.random() + 3})
    },
    {
      label: "Supplier Score",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "darkgreen",
      borderColor: "darkgreen",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "darkgreen",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "darkgreen",
      pointHoverBorderColor: "darkgreen",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: Array.apply(null, {length:30}).map(Function.call, ()=>{return Math.random() + 2})
    }
  ]
}; 
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
          "title": "Staff Profitability",
          "description": "Your Sales Staff and the revenue they bring in",
          "type": "AREA",
          "options": {},
          "datasource": "",
          "layout": "halfcolumn"
        },
        {
          "title": "Supplier Performance",
          "description": "Count of how many times a supplier was late",
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

  let colors = ["rgba(72,166,242,1)", "orange", "purple", "darkgreen", '#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']

  module.exports = {
    loadConfig : async (db, user)=>{
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


    }
  }