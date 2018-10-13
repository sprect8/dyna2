const data = {
  labels: Array.apply(null, {length:30}).map(Number.call, Number),
  datasets: [
    {
      label: "Sales Per Day",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(72,166,242,0.6)",
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
      data: Array.apply(null, {length:30}).map(Function.call, ()=>{return Math.random() * 100})
    }
  ]
};

export { data };
