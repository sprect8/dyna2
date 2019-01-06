import React from "react";
import { Line } from "react-chartjs-2";
import { data } from "./areaConfig";

const opts = {
  scales: {
      yAxes: [{
          stacked: true
      }]
  }
};

class AreaChart extends React.Component {
  
  render() {
    return <Line data={this.props.data ? this.props.data : data} options={opts}/>;
  }
}

export default AreaChart;
