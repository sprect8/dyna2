import React, { Component } from 'react';
import WidgetBox from '../WidgetBox';
import Transaction from '../Transactions';
import { FullColumn, HalfColumn, Row } from '../../../components/utility/rowColumn';
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
import StarIcon from '@material-ui/icons/Star'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default class Breakdown extends Component {
  render() {
    const {
      title,
      description,
      data
    } = this.props;
    /*const progressFill = {
      width: `${progress}%`,
      backgroundColor: `${color}`,
    };*/

    return (
      <div>
        <h3 className='withDescription'>
          {title}
        </h3>
        <p className="description">{description}</p>

        <VerticalTimeline>
          {
            // each row will have n number of boxes to render

            data.map(x => {
              let icon = <WorkIcon />
              if (x.type === "education") {
                icon = <SchoolIcon />
              }
              return (<VerticalTimelineElement
                className={"vertical-timeline-element--" + x.type}
                date={x.date}
                iconStyle={{ background: `rgb(33, 150, 243)`, color: "#fff" }}
                icon={icon}
              >
                <h3 className="vertical-timeline-element-title">{x.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{x.subtitle}</h4>
                <p>
                  {x.description}
                </p>
              </VerticalTimelineElement>)
            })
          }
          <VerticalTimelineElement
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            icon={<StarIcon />}
          />
        </VerticalTimeline>
      </div>
    );
  }
}
