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
import PictureBox from '../uielements/camera';
import BarcodeBox from '../uielements/barcode';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

class FormDialog extends React.Component {
    state = {
        open: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    createControl = (control, value) => {
        let error = (!value || value === "") && this.state.validating && control.mandatory && !control.key
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
                    error={error}
                    fullWidth
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
                    return (
                        <FormControl fullWidth>
                            <InputLabel htmlFor={control.name + '-native-required'}>{control.display}</InputLabel>

                            <Select
                                native
                                error={error}
                                fullWidth
                                value={value?value:""}
                                onChange={this.handleChange(control.name)}
                                name={control.name}
                                label={control.display}
                                inputProps={{
                                    id: control.name + '-native-required',
                                }}
                            >
                                {
                                    [""].concat(control.lov).map(r => {
                                        return <option key={control.name + r} value={r}>{r}</option>
                                    })
                                }
                            </Select>
                        </FormControl>);
                }
                else {
                    return (<TextField
                        id={control.name}
                        error={error}
                        fullWidth
                        label={control.display}
                        value={value}
                        onChange={this.handleChange(control.name)}
                        margin="normal"
                    />);
                }
            case "timestamp":
                return <TextField
                    id="date"
                    fullWidth
                    error={error}
                    label={control.display}
                    type="date"
                    onChange={this.handleChange(control.name)}
                    value={value}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            case "barcode":
                return <BarcodeBox onChange={this.handleChange(control.name)} />
            case "picture":
                return <PictureBox onChange={this.handleChange(control.name)} />

            default:
                return (<div></div>);
        }
    }
    handleClose = () => {
        this.setState({ open: false, validating: false });
        return this.props.onClose ? this.props.onClose() : null;
    };

    handleSave = () => {
        // validate all
        // if invalid set state to validating and force mark invalid

        let allValid = true;

        this.props.config.columns.forEach(x => {
            if (!x.key && x.mandatory && (!this.state[x.name] || this.state[x.name] === "")) {
                allValid = false;
            }
        })

        if (!allValid) {
            this.setState({ validating: true })
        }
        else {
            this.setState({ validating: false, open: false })
            this.props.onUpdate(this.state);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
        if (props.data) {
            this.setState(props.data);
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    key={this.props.config.displayName}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth="lg"
                    fullScreen={this.props.fullScreen}
                >
                    <DialogTitle id="form-dialog-title">{this.props.config.displayName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Row data
                        </DialogContentText>
                        {
                            this.props.config.columns.map(x => {
                                return (
                                    <Row key={x.name}>
                                        <FullColumn>{this.createControl(x, this.state[x.name] ? this.state[x.name] : x.default ? x.default : "")}</FullColumn>
                                    </Row>
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
            </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default withMobileDialog()(FormDialog);