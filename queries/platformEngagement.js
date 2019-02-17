// -- Profitable and Non-profitable products

// top 10 best performing products by sales (month)

// top best performing
const platformEngagement = `select ts, count(*) total from (select distinct (user_id, to_char("updatedAt", 'YYYYMMDD')) un, to_char( "updatedAt", 'YYYYMMDD') ts from user_audits) x group by ts order by ts asc`;

const businessProcess = {
    "key": "Platform-Engagement",
    "title": "Platform Engagement",
    "description": "Measure Users' Engagement with Dynapreneur",
    "rows": [                
        [
            {
                "title": "Daily Platform Engagement",
                "description": "Login Details for Each User",
                "type": "AREA",
                "options": {},
                "datasource": "",
                "layout": "fullcolumn"
            }
        ]
    ]
}

let colors = ["orange", "purple", "darkgreen", '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']

module.exports = {
    loadConfig: async (db, user) => {
        let ce = JSON.parse(JSON.stringify(businessProcess));


        let engagement = await db.query(platformEngagement,
            { type: db.QueryTypes.SELECT, replacements: [user, user] });

        let bestds = {
            labels: engagement.map(x=>{return x.ts}),
            datasets: []
        }
        let bds = {
            label: "Distinct Logins",
            fill: false,
            backgroundColor: colors[0],
            borderColor: colors[0],
            data: engagement.map(x=>{return +x.total}),
            lineTension: 0.1,
            pointRadius: 1,
            pointHitRadius: 10,
        };
        bestds.datasets.push(bds);
        ce.rows[0][0].data = bestds;

        console.log(engagement);

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
