async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const fn = async (db) => {
    try {
        let result = await db["reportconfiguration"].findAll();

        let ret = [];

        await asyncForEach(result, async e=>{
            ret.push(JSON.parse(e.report_configuration));
        });
        console.log(ret);
        return ret;
    }
    catch (e) {
        console.log(e);
    }
    let data2 = []
    const businessProcess = {
        "key": "business-improvement-page",
        "title": "Business Process Improvement",
        "description": "Measure your Business Process",
        "rows": []
    }

    //   function getRow(color) {
    //     return {
    //       labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    //       datasets: [
    //         {
    //           label: "",
    //           backgroundColor: color,
    //           borderWidth: 0,
    //           data: [65, 59, 80, 81, 56, 55, 40, 88, 58, 19, 22, 60, 40, 85, 22, 21]
    //         }
    //       ]
    //     };
    //   }
    //   const datax = [
    //     {
    //       widgets: [
    //         { title: "Worker Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRow("rgba(72,166,242,1)") },
    //         { title: "Supplier Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRow("orange") }
    //       ]
    //     },
    //     {
    //       widgets: [
    //         { title: "Sales Agent Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction: "downward", data: getRow("purple") },
    //         { title: "Investment Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction: "upward", data: getRow("darkgreen") }
    //       ]
    //     }
    //   ]

    const costEfficiency = {
        "key": "cost-efficiency",
        "title": "Cost Efficiency Matrix",
        "description": "Measure your Business Process",
        "rows": [
        ]
    }


    const businessWaste = {
        "key": "business-waste-page",
        "title": "Business Waste Index",
        "description": "How well are you managing revenue leakage on items, staff and suppliers",
        "rows": [
            [
                {
                    "title": "Business Waste Index",
                    "description": "How well you are managing revenue leakage on items, staff and suppliers",
                    "type": "STACKEDBAR",
                    "options": {},
                    "datasource": "",
                    "layout": "halfcolumn",
                    //"data": {labels: ['a', 'b', 'c'], datasets: [{label: 'A', data: [1,2,3]}, {label: 'B', data: [2,3,4]}, {label: 'C', data: [3,4,5]}]}
                },
                {
                    "title": "Business Waste Score",
                    "description": "A rating of your overall Business Waste Management initiatives",
                    "type": "BREAKDOWN",
                    "options": {},
                    "data": [
                        {
                            "widgets": [{ "title": "Overproduction Score", "progress": 40, "duration": "Jun 24 - Jul 23", "amount": "2.01", "currency": "d", "data": data2, "direction": "upward" },
                            { "title": "Overspending Score", "progress": 70, "duration": "Jun 24 - Jul 23", "amount": "3.51", "currency": "d", "data": data2, "direction": "upward" }]
                        },
                        {
                            "widgets": [{ "title": "Productivity Score", "progress": 94, "duration": "Jun 24 - Jul 23", "amount": "4.71", "currency": "d", "data": data2, "direction": "upward" },
                            { "title": "Process Issue Score", "progress": 84, "duration": "Jun 24 - Jul 23", "amount": "4.21", "currency": "d", "data": data2, "direction": "upward" }]
                        }
                    ],
                    "datasource": "",
                    "layout": "halfcolumn"
                }
            ],//Process Time aBaseline of each time and its impact on item deliveryes
            [
                {
                    "title": "Overproduced unprofitable products",
                    "description": "Items that are not profitable and over-produced",
                    "type": "AREA",
                    "options": {},
                    "datasource": "",
                    "layout": "halfcolumn"
                },
                {
                    "title": "Overspending on unnecessary expenses",
                    "description": "Expenses you are currently paying for (cost per month)",
                    "type": "STACKEDBAR",
                    "options": {},
                    "datasource": "",
                    "layout": "halfcolumn"
                }
            ],
            [
                {
                    "title": "Worker Productivity Score",
                    "description": "Worker activities and their profitability",
                    "type": "PIE",
                    "options": {},
                    "datasource": "",
                    "layout": "halfcolumn"
                },
                {
                    "title": "Process Time and baselines",
                    "description": "Baseline of each time and its impact on item delivery",
                    "type": "LINE",
                    "options": {},
                    "datasource": "",
                    "layout": "halfcolumn"
                }
            ],
        ]
    }

    const customerSatisfaction = {
        "key": "customer-satisfaction-page",
        "title": "Customer Satisfaction",
        "description": "How Happy are your customers? ",
        "rows": []
    }

    //   function getRowX(color) {
    //     return {
    //       labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    //       datasets: [
    //         {
    //           label: "",
    //           backgroundColor: color,
    //           borderWidth: 0,
    //           data: [65, 59, 80, 81, 56, 55, 40, 88, 58, 19, 22, 60, 40, 85, 22, 21]
    //         }
    //       ]
    //     };
    //   }
    //   const datainv = [
    //     {
    //       widgets: [
    //         { title: "Stock Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("rgba(72,166,242,1)") },
    //         { title: "Inventory Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("orange") }
    //       ]
    //     },
    //     {
    //       widgets: [
    //         { title: "Inventory Health Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction: "downward", data: getRowX("purple") },
    //         { title: "Expiration Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction: "upward", data: getRowX("darkgreen") }
    //       ]
    //     }
    //   ]

    const inventoryOptimisation = {
        "key": "inventory-optimisation-page",
        "title": "Inventory Optimisations",
        "description": "Measure how well you manage your Inventory",
        "rows": []
    }

    const platformEngagement = {
        "key": "platform-engagement-page",
        "title": "Platform Engagement",
        "description": "Measure Dynapreneur Platform Engagement",
        "rows": []
    }

    const reportConfiguration = [
        { "path": "business-improvement-page", "config": businessProcess },
        { "path": "business-waste-page", "config": businessWaste },
        { "path": "platform-engagement-page", "config": platformEngagement },
        { "path": "customer-satisfaction-page", "config": customerSatisfaction },
        { "path": "inventory-optimisation-page", "config": inventoryOptimisation },
        { "path": "cost-efficiency", "config": costEfficiency },
    ];

    console.log(JSON.stringify(reportConfiguration));

    return reportConfiguration;
}

module.exports = {
    reportConfiguration: fn
}