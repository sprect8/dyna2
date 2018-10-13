/*

label: 'Cost Efficiency',
        key: 'cost-efficiency',
        leftIcon: 'monetization_on'

      },
      {
        label: 'Inventory Optimisation',
        key: 'inventory-page',
        leftIcon: 'assignment_turned_in'
      },
      {
        label: 'Business Waste Reduction',
        key: 'business-waste',
        leftIcon: 'delete_forever'
      },
      {
        label: 'Business Process Improvement',
        key: 'sales-page',
        leftIcon: 'extension'
      },
      {
        label: 'Customer Satisfaction',
        key: 'sales-page',
        leftIcon: 'face'
      },
      {
        label: 'Platform Engagement',
*/

const data = {
    labels: ['Cost Efficiency', 'Inventory Optimisation', 'Customer Satisfaction', 'Platform Engagement', 'Business Waste Reduction', 'Business Process Improvement'],
    datasets: [
      {
        label: 'My Score',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [3.2, 3.1, 2.2, 4.8, 2.1, 4.2]
      }
    ]
  };

const settings = {
    cutoutPercentage: 70,
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 15,
        fontFamily: "'Roboto', sans-serif",
        fontColor: "#424242",
        fontSize: 13,
        fontStyle: "bold",
        padding: 20
      }
    },
    scale: {
        ticks: {
            beginAtZero: true
        }
    }
  };
  
  export { data, settings };
  