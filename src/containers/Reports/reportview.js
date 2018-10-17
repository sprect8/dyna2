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
import WidgetBox from '../Viz/WidgetBox';
import Timeline from '../Viz/Timeline';
import TxnBreakdown from '../Viz/TxnBreakdown';

function create(config) {
    switch (config.type) {
        case "TXNBREAKDOWN":
            return (<TxnBreakdown {...config}/>);
        case "MAP":
            return (<MapView {...config} />);
        case "TRANSACTIONS":
            return (<TxnView {...config} />);
        case "AREA":
            return (<Area {...config} />);
        case "STACKEDBAR":
            return (<StackedBar {...config} />);
        case "PIE":
            return (<Pie {...config} />);
        case "LINE":
            return (<Line {...config} />);
        case "BREAKDOWN":
            return (<Breakdown {...config} />);
        case "HISTORY":
            return (<Timeline {...config} />);
        default:
            return (<div></div>);
    }
}

function layout(children, config) {
    switch (config.layout) {
        case "twothird":
            return (<TwoThirdColumn>{children}</TwoThirdColumn>);
        case "onethird":
            return (<OneThirdColumn>{children}</OneThirdColumn>);
        case "halfcolumn":
            return (<HalfColumn>{children}</HalfColumn>);
        case "fullcolumn":
            return (<FullColumn>{children}</FullColumn>);
        default:
            return (<FullColumn>{children}</FullColumn>);
    }
}

export default (props) => {
    let { config } = props;
    return <LayoutWrapper>
        <h3 className={config.description ? 'withDescription' : 'widgetTitle'}>{config.title}</h3>
        {
            config.rows.map(x => {

                return (<Row>
                    {
                        x.map(col => {
                            return layout(create(col), col);
                        })
                    }
                </Row>);
            })
        }
        
    </LayoutWrapper>
};
