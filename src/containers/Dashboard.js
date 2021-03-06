import React from 'react';
import { connect } from 'react-redux';

import LayoutWrapper from '../components/utility/layoutWrapper';
import { FullColumn, HalfColumn, Row } from '../components/utility/rowColumn';
import Breakdown from './Viz/Breakdown';
import Spider from './Viz/Spider';
import Pie from './Viz/Pie';
import Line from './Viz/LineOverTime';

// data: [3.2, 3.1, 2.2, 4.8, 2.1, 4.2]
const data = [
	{
		
		widgets: [
			{ title: "Cost Efficiency", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction:"upward" },
			{ title: "Inventory Optimisation", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction:"upward" }
		]
	},
	{
		widgets: [
			{ title: "Business Process Improvement", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction:"downward" },
			{ title: "Business Waste Reduction", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction:"upward" }
		]
	},
	{
		widgets: [
			{ title: "Customer Satisfaction", currency: "d", amount: "2.2", progress: "30", color: "rgb(153, 102, 255)", direction:"upward" },
			{ title: "Platform Engagement", currency: "d", amount: "4.8", progress: "96", color: "rgb(153, 102, 255)", direction:"downward" }
		]
	},
]

let component = (props) => (
	<LayoutWrapper>
		<Row><FullColumn>
			<h2>Welcome {props.name}</h2>
			<p className="description">This is your overall score</p>			
		</FullColumn></Row>
		
		<Row>
			<HalfColumn>
				<Spider title="Overall Score" description="Your overall score for this week" />
			</HalfColumn>
			<HalfColumn>
				<Breakdown title="Score Breakdown" description="Breakdown of your scores in each category" data={data} />
			</HalfColumn>
		</Row>
		<Row>
			<HalfColumn>
				<Pie title="Sales by Product (Week)" description="Your sales for the week" />
			</HalfColumn>
			<HalfColumn>
				<Line title="Sales Per Day(Month)" description="Your sales for the month by day" />
			</HalfColumn>
		</Row>
	</LayoutWrapper>
);


export default connect(
	state => ({
		...state.Auth
	}),
	[]
)(component);