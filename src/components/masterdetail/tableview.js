import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { FullColumn } from '../../components/utility/rowColumn';
import IntlMessages from '../../components/utility/intlMessages';
import Button from '../../components/uielements/button';
import Icon from '../../components/uielements/icon';
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
import StarIcon from '@material-ui/icons/Star'

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

// configuration for the application
const conf = {
    "tableName": "Staff",
    "displayName": "Staff Records",
    "description": "These are your staff records, edit, add, remove and view any details",
    "columns": [
        { "name": "staff_id", "display": "Staff Id", "type": "number", "sequence": "staff_id_seq", "mandatory": true, "unique": true, "key": true },
        { "name": "staff_fname", "display": "First Name", "type": "text", "mandatory": true },
        { "name": "staff_sname", "display": "Surname", "type": "text", "mandatory": true },
        { "name": "staff_uid", "display": "Identity Card", "type": "text", "mandatory": true, "unique": true },
        { "name": "staff_joined", "display": "Joined", "type": "timestamp", "mandatory": true },
        { "name": "staff_status", "display": "Status", "type": "text", "mandatory": true, "lov": ["ACTIVE", "INACTIVE", "PROBATION"] },
        { "name": "staff_type", "display": "Type", "type": "text", "mandatory": true, "lov": ["Full Time", "Part Time", "Sales", "Contractor"], },
        { "name": "staff_address", "display": "Address", "type": "text", "mandatory": true },
        { "name": "staff_salary", "display": "Salary (month)", "type": "number", "mandatory": true }
    ]
}

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/
export default props => {
    const { config, data } = props;
    console.log(config);

    return (<Scrollbars style={{ width: '100%' }}>
        <Table>
            <TableHead>
                <TableRow>
                    {
                        config.columns.map(x=>{
                            return <TableCell numeric={x.type === "number"}>{x.display + (x.mandatory ? "*":"")}</TableCell>
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(n => {
                    return (<TableRow key={n[config.columns[0].name]}>
                        {config.columns.map(c=>{
                            return <TableCell>{n[c.name]}</TableCell>
                        })}
                    </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </Scrollbars>

    )
};
