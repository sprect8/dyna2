import React from "react";
import { Line } from "react-chartjs-2";
import { data } from "./lineConfig";

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

class LineChart extends React.Component {
  render() {
    return <Line data={this.props.data ? this.props.data : data} options={opts}/>;
  }
}

export default LineChart;
