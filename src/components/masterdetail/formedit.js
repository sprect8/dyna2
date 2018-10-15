import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-vertical-timeline-component/style.min.css';
import Select from '@material-ui/core/Select';

import { Row, FullColumn } from '../../components/utility/rowColumn';
/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

export default class FormDialog extends React.Component {
    state = {
        open: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    createControl = (control, value) => {
        switch (control.type) {
            case "number":
                let readonly = false;
                if (control.ref) {
                    // table reference?
                }
                else if (control.key) {
                    readonly = true;
                }
                else {

                }
                return (<TextField
                    id="standard-number"
                    label={control.display}
                    value={value}
                    disabled={readonly}
                    onChange={this.handleChange(control.name)}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />);
            case "text":
                if (control.lov) {
                    return (<Select
                        native
                        value={value}
                        onChange={this.handleChange(control.name)}
                        name={control.name}
                        inputProps={{
                            id: control.name + '-native-required',
                        }}
                    >
                        {
                            control.lov.map(r => {
                                return <option value={r}>{r}</option>
                            })
                        }
                    </Select>);
                }
                else {
                    return (<TextField
                        id={control.name}
                        label={control.display}
                        value={value}
                        onChange={this.handleChange(control.name)}
                        margin="normal"
                    />);
                }
                break;
            case "timestamp":
                return <TextField
                    id="date"
                    label={control.display}
                    type="date"
                    defaultValue={value}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                break;
            default:
                return (<div></div>);
        }
    }
    handleClose = () => {
        this.setState({ open: false });
        return this.props.onClose ? this.props.onClose() : null;
    };

    componentWillReceiveProps(props)  {
        this.setState({open:props.open});        
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.props.config.displayName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit the fields to manage the selected row. Click save to persist
                        </DialogContentText>
                        {
                            this.props.config.columns.map(x=>{
                                return (
                                    <Row>
                                        <FullColumn>{this.createControl(x, this.state[x.name] ? this.state[x.name] : "")}</FullColumn>
                                    </Row>
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};