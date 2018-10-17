import React, { Component } from 'react';
import WidgetBox from '../WidgetBox';
import Transaction from '../Transactions'; 
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
                        
                            // { title: "Daily Sales", currency: "$", amount: "60", progress: "67", color: "rgb(153, 102, 255)", direction:"downward" }
                            return (<Transaction
                                title={row.title}
                                duration={row.duration}
                                amount={row.amount}
                                currency={row.currency}
                                data={row.data}
                                upward={row.direction == "upward"}
                                downward={row.direction == "downward"}
                                style={{ marginBottom: 40 }}
                            />);
                    })
                }

            </WidgetBox>
        );
    }
}