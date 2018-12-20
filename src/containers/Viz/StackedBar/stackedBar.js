import React from "react";
import { Bar } from "react-chartjs-2";
import { data } from "./stackedBarConfig";

const opts = {
  scales: {
    yAxes: [{
      stacked: true
    }],
    xAxes: [{
      stacked: true
    }]

  }
};

class BarChart extends React.Component {

  render() {
    return <Bar data={this.props.data ? this.props.data : data} options={opts} />;
  }
}

export default BarChart;
