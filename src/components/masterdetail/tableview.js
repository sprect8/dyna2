import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../components/uielements/button';

import Scrollbars from '../../components/utility/customScrollBar'
import { TableBody, TableCell, TableHead, TableRow } from '../../components/uielements/table';
import Table from '../../components/uielements/table';
import DeleteIcon from '@material-ui/icons/Delete';

import swal from 'sweetalert2';

import 'react-vertical-timeline-component/style.min.css';

export default class FormDialog extends React.Component {
    state = {
        open: false,
        image: "",
        product: "",
        selectedItem: null,
    };

    handleClose = () => {
        this.setState({ open: false, validating: false });
    };

    componentWillReceiveProps(props) {
        if (props.open !== null && props.open !== undefined) {
            this.setState({ open: props.open });
        }
        if (props.data) {
            this.setState(props.data);
        }

    }

    confirmDeleteRow = (row) => (e) => {
        e.stopPropagation();
        e.preventDefault();
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this.props.deleteRow(row);              
            }
          });

    }

    render() {
        const { config, data } = this.props;
        console.log(config);

        let index = 0;

        let createImageButton = (img, product) => (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ "image": img, "product": product, open:true });
        }

        return (<Scrollbars style={{ width: '100%' }}>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                fullScreen
                style={{zIndex:5000}}
            >
                <DialogTitle id="form-dialog-title">Image for the row</DialogTitle>
                <DialogContent>
                    <div style={{textAlign : "center"}}>
                    <img src={this.state.image} style={{"width":"40%"}} />
                    </div>
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
                        <TableCell key="Action">Actions</TableCell>
                        {
                            config.columns.map(x => {
                                return <TableCell key={x.name + "col"} numeric={x.type === "number"}>{x.display + (x.mandatory ? "*" : "")}</TableCell>
                            })
                        }
                    </TableRow> 
                </TableHead>
                <TableBody>
                    {data && data.map(n => {
                        return (<TableRow key={n[config.columns[0].name]} hover onClick={event => this.props.editRow(n)}>
                            <TableCell key={"edit"}><DeleteIcon style={{"color":"red"}} onClick={this.confirmDeleteRow(n)}/></TableCell>
                            {config.columns.map(c => {
                                if (c.type === "picture" || c.type === "file") {
                                    return (<TableCell key={c.name +index++}><Button onClick={createImageButton(n[c.name])}>Show Image</Button></TableCell>)
                                }
                                return (<TableCell key={c.name + index++}>{n[c.name]}</TableCell>)
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
