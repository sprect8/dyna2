import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { FullColumn, HalfColumn, Row, OneThirdColumn, TwoThirdColumn } from '../../components/utility/rowColumn';
import Area from '../Viz/Area';
import Pie from '../Viz/Pie';
import Line from '../Viz/LineOverTime';

import Transaction from '../Viz/Transactions'
import { data, data2, data3 } from '../Viz/Transactions/config';
import 'react-vertical-timeline-component/style.min.css';
import MapView from '../Viz/Map';
import StackedBar from '../Viz/StackedBar';
import WidgetBox from '../Viz/WidgetBox';

const records = {
    labels: ['Presence  Score', 'Opportunity Score', 'Sales Agent Score', 'Investment Score'],
    datasets: [
        {
            label: 'My Score',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [3.2, 3.1, 2.2, 4.2]
        }
    ]
};
export default () => (
    <LayoutWrapper>
        <Row>
            <TwoThirdColumn>
                <MapView title="Malls In Malaysia" description="A list of malls in Malaysia with target opportunities" stretched={true} />
            </TwoThirdColumn>
            <OneThirdColumn>
                <WidgetBox title="Business Process Improvement Score" description="A rating of your overall Business Process Improvement initiatives">
                    <Transaction
                        title="Presence Score"
                        duration="Jun 24 - Jul 23"
                        amount="2.01"
                        currency="d"
                        data={data2}
                        upward
                        style={{ marginBottom: 20 }}
                    />

                    <Transaction
                        title="Opportunity Score"
                        duration="Jul 24 - Aug 23"
                        amount="3.51"
                        currency="d"
                        data={data}
                        downward
                        style={{ marginBottom: 20 }}
                    />

                    <Transaction
                        title="Product Sales Score"
                        duration="Aug 24 - Sep 23"
                        amount="4.71"
                        currency="d"
                        data={data3}
                        style={{ marginBottom: 20 }}
                        upward
                    />

                    <Transaction
                        title="Product Backlog Score"
                        duration="Aug 24 - Sep 23"
                        amount="4.21"
                        currency="d"
                        data={data3}
                        style={{ marginBottom: 20 }}
                        downward
                    />
                </WidgetBox>
            </OneThirdColumn>
        </Row>
        <Row>
            <HalfColumn>
                <Area title="Top Products by Revenue" description="These are your top performing products" />
            </HalfColumn>
            <HalfColumn>
                <StackedBar title="Opportunity Analysis" description="Customer Requesting similar product groups" />
            </HalfColumn>
        </Row>
        <Row>
            <HalfColumn>
                <Pie title="Products in Progress" description="Products stuck in different manufacturing process steps" />
            </HalfColumn>
            <HalfColumn>
                <Line title="Sales Generated per Location" description="Location Analysis of different sales and opportunities" />
            </HalfColumn>
        </Row>
    </LayoutWrapper>
);
