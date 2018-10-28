import React, { Component } from 'react';
import WidgetBox from '../WidgetBox';
import SalesProgress from './salesProgress';
import { FullColumn, HalfColumn, Row } from '../../../components/utility/rowColumn';

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

    let index = 0;
    return (
      <WidgetBox title={title} description={description} stretched={stretched}>
        {
          // each row will have n number of boxes to render
          data.map(row => {
            return (<Row key={index++}>
              {
                row.widgets.map(col => {
                  // { title: "Daily Sales", currency: "$", amount: "60", progress: "67", color: "rgb(153, 102, 255)", direction:"downward" }
                  return (<HalfColumn  key={index++}>
                    <SalesProgress
                      key={index++}
                      title={col.title}
                      currency={col.currency}
                      amount={col.amount}
                      progress={col.progress}
                      color={col.color}
                      downward={col.direction == "downward"}
                      upward={col.direction == "upward"}
                    />
                  </HalfColumn>);
                })
              }
            </Row>)

          })
        }

      </WidgetBox>
    );
  }
}
