const data = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(255, 99, 132)",
      borderWidth: 0,
      data: [65, 59, 80, 81, 56, 55, 40, 88, 58, 19, 22, 60, 40, 85, 22, 21]
    }
  ]
};

const data2 = {
  labels: data.labels,
  datasets: [
    {
      ...data.datasets[0],
      backgroundColor: "rgb(54, 162, 235)"
    }
  ]
};

const data3 = {
  labels: data.labels,
  datasets: [
    {
      ...data.datasets[0],
      backgroundColor: "rgb(153, 102, 255)"
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scaleBeginAtZero: true,
  scales: {
    xAxes: [
      {
        categoryPercentage: 0.9,
        barPercentage: 0.9,
        // barThickness: 5,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  }
};

const barSettings = {
  //height: 160,
};

export { data, data2, data3, barSettings, options };
