import React, { Component } from 'react';
import WidgetBox from '../WidgetBox';
import { FullColumn, HalfColumn, Row } from '../../../components/utility/rowColumn';
import PieChart from './pie';
export default class Breakdown extends Component {
  render() {
    const {
      title,
      description,
      stretched,
      data
    } = this.props;
    /*const progressFill = {
      width: `${progress}%`,
      backgroundColor: `${color}`,
    };*/

    return (
      <WidgetBox title={title} description={description} stretched={stretched}>
        <PieChart data = {data}/>        
      </WidgetBox>
    );
  }
}
