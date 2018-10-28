import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { FullColumn, HalfColumn, Row, OneThirdColumn, TwoThirdColumn } from '../../components/utility/rowColumn';
import Area from '../Viz/Area';
import Pie from '../Viz/Pie';
import Line from '../Viz/LineOverTime';
import Breakdown from '../Viz/Breakdown';

import 'react-vertical-timeline-component/style.min.css';
import MapView from '../Viz/Map';
import StackedBar from '../Viz/StackedBar';
import TxnView from '../Viz/TxnWidget';
import Timeline from '../Viz/Timeline';
import TxnBreakdown from '../Viz/TxnBreakdown';

function create(config, key) {
    switch (config.type) {
        case "TXNBREAKDOWN":
            return (<TxnBreakdown  key={key} {...config}/>);
        case "MAP":
            return (<MapView key={key} {...config} />);
        case "TRANSACTIONS":
            return (<TxnView key={key} {...config} />);
        case "AREA":
            return (<Area key={key} {...config} />);
        case "STACKEDBAR":
            return (<StackedBar key={key} {...config} />);
        case "PIE":
            return (<Pie key={key} {...config} />);
        case "LINE":
            return (<Line key={key} {...config} />);
        case "BREAKDOWN":
            return (<Breakdown key={key} {...config} />);
        case "HISTORY":
            return (<Timeline key={key} {...config} />);
        default:
            return (<div key={key}></div>);
    }
}

function layout(children, config, key) {
    switch (config.layout) {
        case "twothird":
            return (<TwoThirdColumn key={key}>{children}</TwoThirdColumn>);
        case "onethird":
            return (<OneThirdColumn key={key}>{children}</OneThirdColumn>);
        case "halfcolumn":
            return (<HalfColumn key={key}>{children}</HalfColumn>);
        case "fullcolumn":
            return (<FullColumn key={key}>{children}</FullColumn>);
        default:
            return (<FullColumn>{children}</FullColumn>);
    }
}

export default (props) => {
    let { config } = props;
    let index = 0;
    return <LayoutWrapper>
        <h3 className={config.description ? 'withDescription' : 'widgetTitle'}>{config.title}</h3>
        {
            config.rows.map(x => {

                return (<Row key={index++}>
                    {
                        x.map(col => {
                            return layout(create(col, index), col, index++);
                        })
                    }
                </Row>);
            })
        }
        
    </LayoutWrapper>
};
