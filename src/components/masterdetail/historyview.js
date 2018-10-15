import React from 'react';
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
import StarIcon from '@material-ui/icons/Star'

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

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/
export default props => {
    const { config } = props;

    if(config.tableName !== "Investments") {
        return (<div></div>)
    }

    return (<VerticalTimeline>
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
    )
};