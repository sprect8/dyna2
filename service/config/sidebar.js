const fn = async (db) => {
    try {
        let rex = await db["sidebarconfiguration"].findAll();
        return (JSON.parse(rex[0].sidebar_config));
    }
    catch (e) {
        // do nothing
    }

    const sidebarOptions = [
        {
            label: 'Home',
            key: 'home',
            leftIcon: 'home'
        },
        {
            label: "Data Entry",
            leftIcon: "ballot",
            key: "entrepreneur-main",
            children: [
                {
                    label: 'Report configuration',
                    key: 'report-page',
                    leftIcon: 'equalizer'
                },
                {
                    label: 'Sidebar configuration',
                    key: 'sidebar-page',
                    leftIcon: 'equalizer'
                }
            ]
        },

        {
            label: "Reports",
            leftIcon: "pie_chart",
            key: "dashboard-reports",
            children: [
                {
                    label: 'Cost Efficiency',
                    key: 'cost-efficiency',
                    leftIcon: 'monetization_on'

                },
                {
                    label: 'Inventory Optimisation',
                    key: 'inventory-optimisation-page',
                    leftIcon: 'assignment_turned_in'
                },
                {
                    label: 'Business Waste Reduction',
                    key: 'business-waste-page',
                    leftIcon: 'delete_forever'
                },
                {
                    label: 'Business Process Improvement',
                    key: 'business-improvement-page',
                    leftIcon: 'extension'
                },
                {
                    label: 'Customer Satisfaction',
                    key: 'customer-satisfaction-page',
                    leftIcon: 'face'
                },
                {
                    label: 'Platform Engagement',
                    key: 'platform-engagement-page',
                    leftIcon: 'thumb_up'
                }
            ]
        },
    ];

    return sidebarOptions;
}

module.exports = {
    sidebarConfiguration: fn
}