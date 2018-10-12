import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { FullColumn } from '../../components/utility/rowColumn';
import IntlMessages from '../../components/utility/intlMessages';
import Button from '../../components/uielements/button';
import Icon from '../../components/uielements/icon';
import Scrollbars from '../../components/utility/customScrollBar'
import { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from '../../components/uielements/table';
import Table from '../../components/uielements/table';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

let id = 0;
function createData(name, item, units, unitcosts, total) {
	id += 1;
	return { id, name, item, units, unitcosts, total };
}

const data = [
	createData('Jones', 'Pencil', 95, 1.99, 189.05),
	createData('Kivell', 'Binder', 50, 19.99, 999.5),
	createData('Jardine', 'Pencil', 36, 4.99, 179.64),
	createData('Gill', 'Pen', 27, 19.99, 539.73),
	createData('Sorvino', 'Pencil', 56, 2.99, 167.44),
];

export default props => {
	const { classes } = props;

	return (<LayoutWrapper>
		<FullColumn>
			<Papersheet title="Staff Management">
				<Button variant="fab" color="primary" aria-label="add" style={{ "float": "right", "marginRight": "auto", "marginLeft": "8px" }}><Icon>add</Icon></Button>
				<Scrollbars style={{ width: '100%' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Rep</TableCell>
								<TableCell>Item</TableCell>
								<TableCell numeric>Units</TableCell>
								<TableCell numeric>UnitCost</TableCell>
								<TableCell numeric>Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map(n => {
								return (
									<TableRow key={n.id}>
										<TableCell>{n.name}</TableCell>
										<TableCell>{n.item}</TableCell>
										<TableCell numeric>{n.units}</TableCell>
										<TableCell numeric>{n.unitcosts}</TableCell>
										<TableCell numeric>{n.total}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Scrollbars>
			</Papersheet>
		</FullColumn>
		<FullColumn>
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
	</LayoutWrapper>
	)
};
