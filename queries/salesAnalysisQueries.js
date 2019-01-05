
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
    and owner_user_id = ?
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
select to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, sum(case when sale_price - sale_cost > 0 then 1 else 0 end) profitable, sum(case when sale_price - sale_cost <= 0 then 1 else 0 end) nonprofitable,
count(*) total 
from products xx, receipts, inventories, sales where recp_id = sale_recp_id and sale_inv_id = inv_id and inv_prod_id = prod_id and xx.owner_user_id = ? 
group by mon order by mon ) x`;


// staff scoring -- staff and how much they bring in each month
// scored - 
// avg staff scoring each month
const staffScore = `select mon, avg(score) score from (
select staff_name, mon, 
case when profit_after_salary > 2000 then 5 
     when profit_after_salary > 100 then 4 
     when profit_after_salary > 500 then 3 
     when profit_after_salary > 0 then 2 
     else 1 end score     
from (select staff_name, to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, sum(sale_price - sale_cost) - avg(staff_salary) profit_after_salary  from receipts xx, staffs, sales 
where recp_id = sale_recp_id and recp_staff_id = staff_id and xx.owner_user_id = ? group by staff_name, mon order by mon asc) x) y group by mon
`;
// supplier scoring 
// scored based on on time, late, very late and business impacting; scaled as 1, 0.5, 1, 2; 5 + (a) - 0.5*b - c - d*2
const supplierScore = `select year||'/'||case when monthly < 9 then '0' else '' end || monthly mon, case when score > 5 then 5 when score < 0 then 0 else score end score
from (
select supl_company, date_part('year', to_date(devy_delivery_date, 'YYYY-MM-DD')) as year,
	date_part('month', to_date(devy_delivery_date, 'YYYY-MM-DD')) AS monthly, 
       5 + sum(case when devy_status = 'ON TIME' then 1 else 0 end) - 0.2 * sum(case when devy_status = 'LATE' then 1 else 0 end) - 0.3 * sum(case when devy_status = 'VERY LATE' then 1 else 0 end) - 0.5 * sum(case when devy_status = 'BUSINESS IMPACTING' then 1 else 0 end) score
from deliveries xx, suppliers where supl_id = devy_supl_id and xx.owner_user_id = ? group by supl_company, year, monthly) x
`;

// sales profitability more important than amount of sales
// this is the query for the sales report against employees and time
// 
const salesProfit = `select staff_name, to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, 
sum(sale_price - sale_cost) - avg(staff_salary) profit_after_salary  from receipts xx, staffs, sales 
where recp_id = sale_recp_id and recp_staff_id = staff_id and xx.owner_user_id = ? group by staff_name, mon order by mon asc
`;
// top best performing
const bestPerformer = `select prod_name, sum(sale_price - sale_cost) from products xx, receipts, inventories, sales 
where recp_id = sale_recp_id and sale_inv_id = inv_id and inv_prod_id = prod_id and xx.owner_user_id = ?
group by prod_name order by 2 desc limit 10`;

// revenue comparison (month on month)
const monthlyProfit = `select to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, 
sum(sale_price - sale_cost) profit from receipts xx, sales where recp_id = sale_recp_id and xx.owner_user_id = ? group by profit order by mon asc`;
// product type sales mix
const productType = `select cate_name, count(*) sold 
from product_categories xx, products, inventories, sales 
where cate_id = prod_cate_id and prod_id = inv_prod_id and inv_id = sale_inv_id and xx.owner_user_id = ? group by cate_name
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

const investments = `select * from investments xx where xx.owner_user_id = ?`

async function getResults(db) {
  
  let queries = {"Product Score":productScore, "Staff Score":staffScore, "Sales Score":salesScore, "Supplier Score":supplierScore};

  // query results
  

  let datasets = [
    {
      backgroundColor: "rgba(72,166,242,1)",
      borderColor: "rgba(72,166,242,1)",
      pointBorderColor: "rgba(72,166,242,1)",
      pointHoverBackgroundColor: "rgba(72,166,242,1)",
      pointHoverBorderColor: "rgba(72,166,242,1)",
    },
    {
      backgroundColor: "orange",
      borderColor: "orange",
      pointBorderColor: "orange",
      pointBackgroundColor: "#fff",
      pointHoverBackgroundColor: "orange",
      pointHoverBorderColor: "orange",
    },
    {
      backgroundColor: "purple",
      borderColor: "purple",
      pointBorderColor: "purple",
      pointBackgroundColor: "#fff",
      pointHoverBackgroundColor: "purple",
      pointHoverBorderColor: "purple",
    },
    {
      backgroundColor: "darkgreen",
      borderColor: "darkgreen",
      pointBorderColor: "darkgreen",
      pointBackgroundColor: "#fff",
      pointHoverBackgroundColor: "darkgreen",
      pointHoverBorderColor: "darkgreen",
    },
  ];
  let result = {
    labels:[],
    datasets: []
  };
}

let ds = {    
  labels: Array.apply(null, {length:30}).map(Number.call, Number),
  datasets: [
    {
      label: "Worker Score",
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
      label: "Supplier Score",
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
      label: "Agent Score",
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
      label: "Investment Score",
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

  module.exports = {
    loadConfig : (db)=>{
      return costEfficiency;
    }
  }