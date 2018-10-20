import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../components/uielements/button';

import Scrollbars from '../../components/utility/customScrollBar'
import { TableBody, TableCell, TableHead, TableRow } from '../../components/uielements/table';
import Table from '../../components/uielements/table';

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


export default class FormDialog extends React.Component {
    state = {
        open: false,
        image: "",
        product: "",
    };

    handleClose = () => {
        this.setState({ open: false, validating: false });
    };

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
        if (props.data) {
            this.setState(props.data);
        }
    }

    render() {
        const { config, data } = this.props;
        console.log(config);

        let index = 0;

        let createImageButton = (img, product) => () => {
            this.setState({ "image": img, "product": product, open:true });
        }

        return (<Scrollbars style={{ width: '100%' }}>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"

            >
                <DialogTitle id="form-dialog-title">Image for the row</DialogTitle>
                <DialogContent>
                    <img src={this.state.image} />
                </DialogContent>
                <DialogActions>

                    <Button onClick={this.handleClose} color="primary">
                        Close
            </Button>
                </DialogActions>
            </Dialog>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            config.columns.map(x => {
                                return <TableCell key={x.name + "col"} numeric={x.type === "number"}>{x.display + (x.mandatory ? "*" : "")}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (<TableRow key={n[config.columns[0].name]}>
                            {config.columns.map(c => {
                                if (c.type == "picture") {
                                    return <TableCell key={c.name +index++}><Button onClick={createImageButton(n[c.name])}>Show Image</Button></TableCell>
                                }
                                return <TableCell key={c.name + index++}>{n[c.name]}</TableCell>
                            })}
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Scrollbars>

        )
    }
}
