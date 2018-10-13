import React, { Component } from 'react';
import Async from '../../../helpers/asyncComponent';

import { TransactionWidget, Graph, Icon } from './style';

const Bar = props => (
  <Async
    load={import(/* webpackChunkName: "ReactChart2-bar" */ './bar')}
    componentProps={props}
  />
);

export default class Transaction extends Component {
  render() {
    const {
      title,
      description,
      duration,
      amount,
      upward,
      downward,
      currency,
      style,
      data,
      stretched,
    } = this.props;

    return (
      <TransactionWidget style={style}>
        {title ? (
          <h3 className={description ? 'withDescription' : 'widgetTitle'}>
            {title}
          </h3>
        ) : (
            ''
          )}
        {duration ? <p className="transactionDuration">{duration}</p> : ''}

        <Graph>
          {amount ? (
            <div className="currency">
              <h3>
                {currency} {amount}
              </h3>
              {upward || downward ? (
                upward ? (
                  <Icon className="upward">arrow_upward</Icon>
                ) : downward ? (
                  <Icon className="downward">arrow_downward</Icon>
                ) : (
                      ''
                    )
              ) : (
                  ''
                )}
            </div>
          ) : (
              ''
            )}
          <div className="chartWrapper">
            <Bar data={data} />
          </div>
        </Graph>
      </TransactionWidget>

    );
  }
}
