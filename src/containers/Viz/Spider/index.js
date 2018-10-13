import React, { Component } from 'react';
import { Radar } from "react-chartjs-2";
import { data, settings } from "./config";
import WidgetBox from '../WidgetBox';

export default class SalesStats extends Component {
  render() {
    const { title, description, stretched, records } = this.props;

    let r = records;

    if (!r) {
      r = data;
    }

    return (
      <WidgetBox title={title} description={description} stretched={stretched}>
        <Radar data={r} options={settings}/>
      </WidgetBox>
    );
  }
}
