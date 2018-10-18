//@Deprecated
import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { FullColumn, HalfColumn, Row, OneThirdColumn, TwoThirdColumn } from '../../components/utility/rowColumn';
import Breakdown from '../Viz/Breakdown';
import Spider from '../Viz/Spider';
import Area from '../Viz/Area';
import StackedBar from '../Viz/StackedBar';
import TxnBreakdown from '../Viz/TxnBreakdown';
import WidgetBox from '../Viz/WidgetBox';
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
import StarIcon from '@material-ui/icons/Star'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function getRow(color) {
return {
    labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "",
        backgroundColor: color,
        borderWidth: 0,
        data: [65, 59, 80, 81, 56, 55, 40, 88, 58, 19, 22, 60, 40, 85, 22, 21]
      }
    ]
  };
}
const data = [
	{
		widgets: [
			{ title: "Stock Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("rgba(72,166,242,1)")},
			{ title: "Inventory Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("orange")}
		]
	},
	{
		widgets: [
			{ title: "Inventory Health Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction:"downward" , data:getRow("purple")},
			{ title: "Expiration Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("darkgreen") }
		]
	}
]

export default () => (
    <LayoutWrapper>
        <Row>
            <HalfColumn>
                <StackedBar title="Inventory Optimisation Score" description="Your Inventory Optimisation Score over time" />                
            </HalfColumn>
            <HalfColumn>
                <TxnBreakdown title="Inventory Optimisation Matrix" description="Your Inventory Optimisation Matrix for different scores" data={data}/>            
            </HalfColumn>
        </Row>
        <Row>
            <HalfColumn>
                <Area title="Sales Agent Profitability" description="Your Sales Staff and the revenue they bring in" />
            </HalfColumn>
            <HalfColumn>
                <Area title="Supplier Score" description="A rating of your suppliers and how well they perform" />
            </HalfColumn>
        </Row>        
    </LayoutWrapper>
);
