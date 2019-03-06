// 10 questions
// Price Satisfaction
// Quality Satisfaction
// Overall Satisfaction
// Service Satisfaction
// Net Promoter Score 


/*
----
-- Customer Satisfaction
----
-- Net Promoter Score
   recp_customer_rating4
-- Price Satisfaction
   recp_customer_rating
-- Quality Satisfaction
   recp_customer_rating1
-- Service Satisfaction
   recp_customer_rating3
-- Overall Satifaction
   recp_customer_rating2 
*/

const query = `select  
avg(recp_customer_rating4) nps, 
avg(recp_customer_rating) price, 
avg(recp_customer_rating1) quality,
avg(recp_customer_rating3) service,
avg(recp_customer_rating2) overall,
to_char(to_date(recp_timestamp, 'YYYY/MM'), 'YYYY-MM') mon
from receipts where owner_user_id = ?
and recp_customer_rating > 0
group by mon
order by mon
`

const customerSatisfaction = {
  "key": "customer-satisfaction-page",
  "title": "Customer Satisfaction",
  "description": "How Happy Are your customers?",
  "rows": [
    [
      {
        "title": "Net Promoter Score",
        "description": "How Likely a Customer will Recommend you to their friends (1 - 5)?",
        "type": "STACKEDBAR",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      },
      {
        "title": "Price Satisfaction",
        "description": "How Happy are your customers regarding your product/service pricing (1 - 3)?",
        "type": "STACKEDBAR",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      }
    ],
    [
      {
        "title": "Quality Satisfaction",
        "description": "Are Customers happy with your product/service Quality (1 - 3)?",
        "type": "STACKEDBAR",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      },
      {
        "title": "Overall Satisfaction",
        "description": "Overall how satisfied are your customers with your product/service offering?",
        "type": "STACKEDBAR",
        "options": {},
        "datasource": "",
        "layout": "halfcolumn"
      }
    ]
  ]
}


let colors = ["rgba(72,166,242,1)", "orange", "purple", "darkgreen", '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']

module.exports = {
  loadConfig: async (db, user) => {

    let result = await db.query(query,
        { type: db.QueryTypes.SELECT, replacements: [user] });

    let uniqueDates = [...new Set([...result.map(x=>x.mon)])]; //   => remove duplication


    uniqueDates = uniqueDates.sort();


    let ie = JSON.parse(JSON.stringify(customerSatisfaction));
    let idx = 0;
    let nps = {
      labels: uniqueDates,
      datasets: [{
        label: "Net Promoter Score",
        fill:true,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx++ % colors.length],
        data: Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0}),
        lineTension: 0.1,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
    }
    let price = {
      labels: uniqueDates,
      datasets: [{
        label: "Price",
        fill:true,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx++ % colors.length],
        data: Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0}),
        lineTension: 0.1,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
    }
    let quality = {
      labels: uniqueDates,
      datasets: [{
        label: "Quality",
        fill:true,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx++ % colors.length],
        data: Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0}),
        lineTension: 0.1,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
    }
    let overall = {
      labels: uniqueDates,
      datasets: [{
        label: "Overall",
        fill:true,
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx++ % colors.length],
        data: Array.apply(null, {length:uniqueDates.length}).map(Function.call, ()=>{0}),
        lineTension: 0.1,
        pointRadius: 1,
        pointHitRadius: 10,
      }]
    }

    ie.rows[0][0].data = nps;
    ie.rows[0][1].data = price;
    ie.rows[1][0].data = quality;
    ie.rows[1][1].data = overall;
    
    idx = 0;
    result.forEach(x=>{
      nps.datasets[0].data[idx] = x.nps;
      price.datasets[0].data[idx] = x.price;
      quality.datasets[0].data[idx] = x.quality;
      overall.datasets[0].data[idx] = x.overall;
      idx++;
    })

    return ie;
  }
}