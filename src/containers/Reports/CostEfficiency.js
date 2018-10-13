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
const row = {
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
			{ title: "Worker Score", currency: "d", amount: "3.2", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("rgb(255, 99, 132)")},
			{ title: "Supplier Score", currency: "d", amount: "3.1", progress: "67", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("orange")}
		]
	},
	{
		widgets: [
			{ title: "Sales Agent Score", currency: "d", amount: "2.1", progress: "42", color: "rgb(153, 102, 255)", direction:"downward" , data:getRow("purple")},
			{ title: "Investment Score", currency: "d", amount: "4.2", progress: "80", color: "rgb(153, 102, 255)", direction:"upward", data:getRow("darkgreen") }
		]
	}
]

export default () => (
    <LayoutWrapper>
        <Row>
            <HalfColumn>
                <StackedBar title="Cost Efficiency Score" description="Your Cost Efficiency Score over time" />                
            </HalfColumn>
            <HalfColumn>
                <TxnBreakdown title="Cost Efficiency Matrix" description="Your Cost Efficiency Score for different scores" data={data}/>            
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
        <Row>
            <FullColumn>
                <h3 className='withDescription'>
                    Investments
                </h3>
                <p className="description">These are records of investments you made (Last Month: 3,214 RM Total: 92,321 RM)</p>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2011 - present"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Creative Director</h3>
                        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2010 - 2011"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Art Director</h3>
                        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design, SEO, Online Marketing    
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2008 - 2010"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Web Designer</h3>
                        <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                        <p>
                            User Experience, Visual Design
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="2006 - 2008"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Web Designer</h3>
                        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                        <p>
                            User Experience, Visual Design
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="April 2013"
                        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                        icon={<SchoolIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                        <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                        <p>
                            Strategy, Social Media
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="November 2012"
                        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                        icon={<SchoolIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                        <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                        <p>
                            Creative Direction, User Experience, Visual Design
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="2002 - 2006"
                        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                        icon={<SchoolIcon />}
                    >
                        <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                        <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                        <p>
                            Creative Direction, Visual Design
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<StarIcon />}
                    />
                </VerticalTimeline>
            </FullColumn>
        </Row>
    </LayoutWrapper>
);
