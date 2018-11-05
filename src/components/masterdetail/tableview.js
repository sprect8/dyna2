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
                fullScreen
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
