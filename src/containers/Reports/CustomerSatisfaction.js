//@Deprecated
import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { FullColumn, HalfColumn, Row, OneThirdColumn, TwoThirdColumn } from '../../components/utility/rowColumn';
import Breakdown from '../Viz/Breakdown';
import Spider from '../Viz/Spider';
import Area from '../Viz/Area';
import WidgetBox from '../Viz/WidgetBox';
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
import StarIcon from '@material-ui/icons/Star'
import Transaction from '../Viz/Transactions'
import { data, data2, data3 } from '../Viz/Transactions/config';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const records = {
    labels: ['Worker Score', 'Supplier Score', 'Sales Agent Score', 'Investment Score'],
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
                <Spider title="Cost Efficiency Score" description="Cost Efficiency Score for this week" records={records}/>
            </TwoThirdColumn>
            <OneThirdColumn>
            <Transaction
              title="Worker Score"
              duration="Jun 24 - Jul 23"
              amount="59.01"
              currency="$"
              data={data2}
              upward
              style={{ marginBottom: 20 }}
            />

            <Transaction
              title="Supplier Score"
              duration="Jul 24 - Aug 23"
              amount="79.51"
              currency="$"
              data={data}
              downward
              style={{ marginBottom: 20 }}
            />

            <Transaction
              title="Sales Agent Score"
              duration="Aug 24 - Sep 23"
              amount="89.71"
              currency="$"
              data={data3}
              style={{ marginBottom: 20 }}
              upward
            />
            </OneThirdColumn>
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
                <p className="description">These are records of investments you made</p>

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
