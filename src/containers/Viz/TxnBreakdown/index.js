import React, { Component } from 'react';
import WidgetBox from '../WidgetBox';
import Transaction from '../Transactions';
import { FullColumn, HalfColumn, Row } from '../../../components/utility/rowColumn';
import { data, data2, data3 } from '../Transactions/config';
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
        {
          // each row will have n number of boxes to render
          data.map(row => {
            return (<Row>
              {
                row.widgets.map(col => {
                  // { title: "Daily Sales", currency: "$", amount: "60", progress: "67", color: "rgb(153, 102, 255)", direction:"downward" }
                  return (<HalfColumn>
                    <Transaction
                      title={col.title}
                      duration="Jun 24 - Jul 23"
                      amount={col.amount}
                      currency={col.currency}
                      data={col.data}
                      upward={col.direction == "upward"}
                      downward={col.direction == "downward"}
                      style={{ marginBottom: 40 }}
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
