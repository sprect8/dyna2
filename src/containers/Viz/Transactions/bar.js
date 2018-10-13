import React from 'react';
import { Bar } from 'react-chartjs-2';
import { barSettings, options } from './config';

class BarChart extends React.Component {
  render() {
    return (
      <Bar
        data={this.props.data}
        width={barSettings.width}
        height={barSettings.height}
        options={options}
      />
    );
  }
}

export default BarChart;
