// -- Profitable and Non-profitable products

// top 10 best performing products by sales (month)

// top best performing
const bestPerformer = `select prod_name, sum(sale_price - sale_cost) profit, count(*) total from products xx, receipts, inventories, sales 
where recp_id = sale_recp_id and sale_inv_id = inv_id and inv_prod_id = prod_id and xx.owner_user_id = ?
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = ?
and date_part('month', to_date(recp_timestamp, 'YYYY/MM/DD')) = ?
group by prod_name order by 2 desc limit 10`;

// top 10 worst performing products by sales (month)

const worstPerformer = `select prod_name, sum(sale_price - sale_cost) profit, count(*) total from products xx, receipts, inventories, sales 
where recp_id = sale_recp_id and sale_inv_id = inv_id and inv_prod_id = prod_id and xx.owner_user_id = ?
and date_part('year', to_date(recp_timestamp, 'YYYY/MM/DD')) = ?
and date_part('month', to_date(recp_timestamp, 'YYYY/MM/DD')) = ?
group by prod_name order by 2 asc limit 10`;


// -- Map of Bubble Chart on map where sales are made, vs options for supermarkets in the area
const regionalProfit = `select round(recp_latitude, 4) latitude, round(recp_longitude, 4) longitude, 
sum(sale_price - sale_cost) profit from receipts xx, sales 
where recp_id = sale_recp_id and xx.owner_user_id = ?
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') = ?
group by latitude, longitude order by profit asc
`;


// -- Product Sales over time, broken down by product categories
const monthlyProfit = `select to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon, cate_name,
sum(sale_price - sale_cost) profit from receipts xx, sales, inventories, product_categories yy, products
where recp_id = sale_recp_id and xx.owner_user_id = ?           
and cate_id = prod_cate_id and prod_id = inv_prod_id                                                                                                                                   
and sale_inv_id = inv_id and inv_prod_id = prod_id
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY') = ? group by mon, cate_name order by mon asc`;


const locationAnalysis = `select round(recp_latitude, 4) latitude, round(recp_longitude, 4) longitude, to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY/MM') mon,
sum(sale_price - sale_cost) profit from receipts xx, sales 
where recp_id = sale_recp_id and xx.owner_user_id = ?
and to_char(to_date(recp_timestamp, 'YYYY/MM/DD'), 'YYYY') = ?
group by latitude, longitude, mon order by mon asc`

const businessProcess = {
    "key": "business-improvement-page",
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
                "layout": "fullcolumn"
            },
        ],
        [
            {
                "title": "10 Best Products by Revenue",
                "description": "These are your top performing products",
                "type": "PIE",
                "options": {},
                "datasource": "",
                "layout": "halfcolumn"
            },
            {
                "title": "10 Worst Products by Revenue",
                "description": "These are your worst performing products",
                "type": "PIE",
                "options": {},
                "datasource": "",
                "layout": "halfcolumn"
            },
        ],
        [
            {
                "title": "Monthly Profits Over Time",
                "description": "Profits Over Time for Product Types",
                "type": "AREA",
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
        ]
    ]
}

let colors = ["rgba(72,166,242,1)", "orange", "purple", "darkgreen", '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']

module.exports = {
    loadConfig: async (db, user) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        if (user === 11) {
            year = 2017;
            month = 12;
        }

        if (month < 10) {
            month = "0" + month;
        }


        year = year + "";

        let ce = JSON.parse(JSON.stringify(businessProcess));


        let regional = await db.query(regionalProfit,
            { type: db.QueryTypes.SELECT, replacements: [user, year + "/" + month] });


        let best = await db.query(bestPerformer,
            { type: db.QueryTypes.SELECT, replacements: [user, year, month] });


        let worst = await db.query(worstPerformer,
            { type: db.QueryTypes.SELECT, replacements: [user, year, month] });


        let monthly = await db.query(monthlyProfit,
            { type: db.QueryTypes.SELECT, replacements: [user, year] });
        
        let locn = await db.query(locationAnalysis,
            { type: db.QueryTypes.SELECT, replacements: [user, year] });

        let uniqueDates = [...new Set([...monthly.map(x=>x.mon) ,...locn.map(x=>x.mon)])]; //   => remove duplication

        uniqueDates = uniqueDates.sort();

        ce.rows[0][0].data = regional;

        // best dataset
        let bestds = {
            labels: best.map(x=>{return x.prod_name.substring(0, 10)}),
            datasets: []
        }
        let bds = {
            label: "Product",
            fill: true,
            backgroundColor: colors,
            data: best.map(x=>{return x.profit}),
            lineTension: 0.1,
            pointRadius: 1,
            pointHitRadius: 10,
        };
        bestds.datasets.push(bds);
        ce.rows[1][0].data = bestds;

        // best dataset
        let worstds = {
            labels: best.map(x=>{return x.prod_name.substring(0, 10)}),
            datasets: []
        }
        let wds = {
            label: "Product",
            fill: true,
            backgroundColor: colors,
            data: worst.map(x=>{return x.profit}),
            lineTension: 0.1,
            pointRadius: 1,
            pointHitRadius: 10,
        };

        worstds.datasets.push(wds);
        ce.rows[1][1].data = worstds;

        // monthly 
        let mtds = {
            labels: uniqueDates,
            datasets: []
        }

        // get unique workers
        let mtN = {}
        let idx = 0;
        monthly.forEach(x => {
            if (!mtN[x.cate_name]) {
                mtN[x.cate_name] = Array.apply(null, { length: uniqueDates.length }).map(Function.call, () => { 0 });
                mtds.datasets.push({
                    label: x.cate_name,
                    fill: true,
                    backgroundColor: colors[idx++ % colors.length],
                    data: mtN[x.cate_name],
                    lineTension: 0.1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                })
            }
            mtN[x.cate_name][uniqueDates.indexOf(x.mon)] = x.profit;
        });

        ce.rows[2][0].data = mtds;
        

        // locn 
        let ltds = {
            labels: uniqueDates,
            datasets: []
        }

        // get unique workers
        let ltN = {}
        idx = 0;
        let locnName = {
            "3.0733" : "Shah Alam Aeon Big",
            "2.9925" : "Kota Kemuning Giant",
            "3.1390" : "KL Sentral Sams Grocers"
        }
        locn.forEach(x => {
            let name = locnName["" + x.latitude] ? locnName["" + x.latitude] : x.latitude;
            console.log(name, x.latitude);
            if (!ltN[name]) {
                ltN[name] = Array.apply(null, { length: uniqueDates.length }).map(Function.call, () => { 0 });
                ltds.datasets.push({
                    label: name,
                    fill: true,
                    backgroundColor: colors[idx++ % colors.length],
                    data: ltN[name],
                    lineTension: 0.1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                })
            }
            ltN[name][uniqueDates.indexOf(x.mon)] = x.profit;
        });

        ce.rows[2][1].data = ltds;
        


        return ce;
/*
        // 3.0733,       101.5185 // Shah Alam Aeon Big
        // 2.9925,       101.5415 // Kota Kemuning Giant
        // 3.1390,       101.6869 // KL Sentral Sams Grocers
        
        // populate the overall scoring
        ce.rows[0][0].data = regional;

        // populate the summary view (we calculate average of 1 year, and then show also current value; datax is our base)

        // collapse sScore to avg, and take last one; same for others
        let sScoreAvg = 0;
        let pScoreAvg = 0;
        let stScoreAvg = 0;
        let spScoreAvg = 0;

        sScore.forEach(x => { sScoreAvg += +x.score })
        pScore.forEach(x => { pScoreAvg += +x.score })
        stScore.forEach(x => { stScoreAvg += +x.score })
        spScore.forEach(x => { spScoreAvg += +x.score })

        sScoreAvg = sScoreAvg / sScore.length
        pScoreAvg = pScoreAvg / pScore.length
        stScoreAvg = stScoreAvg / stScore.length
        spScoreAvg = spScoreAvg / spScore.length

        let ddx = JSON.parse(JSON.stringify(datax));
        ddx[0].widgets[0].title = "Sales Score"
        ddx[0].widgets[0].amount = Math.round(100 * sScore[sScore.length - 1].score) / 100
        ddx[0].widgets[0].progress = Math.round(100 * ddx[0].widgets[0].amount / 5)
        ddx[0].widgets[0].direction = ddx[0].widgets[0].amount > sScoreAvg ? "upward" : "downward"

        ddx[0].widgets[1].title = "Product Score"
        ddx[0].widgets[1].amount = Math.round(100 * pScore[pScore.length - 1].score) / 100
        ddx[0].widgets[1].progress = Math.round(100 * ddx[0].widgets[1].amount / 5)
        ddx[0].widgets[1].direction = ddx[0].widgets[1].amount > pScoreAvg ? "upward" : "downward"

        ddx[1].widgets[0].title = "Staff Score"
        ddx[1].widgets[0].amount = Math.round(100 * stScore[stScore.length - 1].score) / 100
        ddx[1].widgets[0].progress = Math.round(100 * ddx[1].widgets[0].amount / 5)
        ddx[1].widgets[0].direction = ddx[1].widgets[0].amount > stScoreAvg ? "upward" : "downward"

        ddx[1].widgets[1].title = "Supplier Score"
        ddx[1].widgets[1].amount = Math.round(100 * spScore[spScore.length - 1].score) / 100
        ddx[1].widgets[1].progress = Math.round(100 * ddx[1].widgets[1].amount / 5)
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
        let prodNames = {}
        let idx = 0;
        workers.forEach(x => {
            if (!prodNames[x.staff_name]) {
                prodNames[x.staff_name] = Array.apply(null, { length: uniqueDates.length }).map(Function.call, () => { 0 });
                workerds.datasets.push({
                    label: x.staff_name,
                    fill: true,
                    backgroundColor: colors[idx++ % colors.length],
                    data: prodNames[x.staff_name],
                    lineTension: 0.1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                })
            }
            prodNames[x.staff_name][uniqueDates.indexOf(x.mon)] = x.profit_after_salary;
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
        suppliers.forEach(x => {
            if (!supplierNames[x.supl_company]) {
                supplierNames[x.supl_company] = Array.apply(null, { length: uniqueDates.length }).map(Function.call, () => { 0 });
                supplierds.datasets.push({
                    label: x.supl_company,
                    fill: true,
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


        let invest = await db.query(regionalProfit,
            { type: db.QueryTypes.SELECT, replacements: [user, user] });

        let totalInvest = 0;
        let data = [];

        invest.forEach(x => {
            totalInvest += (+x.inst_cost * +x.inst_units);
            let start = x.inst_timestamp.split("-")[0]
            let end = "Present";
            if (x.inst_timestamp_inactive.length > 0) {
                end = x.inst_timestamp_inactive.split("-")[0];
            }

            data.push({ type: "work", "date": start + " - " + end, "title": x.inst_category, "subtitle": x.inst_name, "description": x.inst_desc })
        })

        ce.rows[2][0].description = totalInvest > 0 ? "These are records of your investments (" + totalInvest + " RM)" : "No investments found";
        ce.rows[2][0].data = data;

        return ce;*/


    }
}
