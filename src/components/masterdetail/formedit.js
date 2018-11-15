import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-vertical-timeline-component/style.min.css';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { Row, FullColumn } from '../../components/utility/rowColumn';
import PictureBox from '../uielements/camera';
import BarcodeBox from '../uielements/barcode';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CrossIcon from '@material-ui/icons/Cancel';

import Autocomplete from './autocomplete';

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },

    buttonFailed: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});



class FormDialog extends React.Component {
    state = {
        open: false,
        data: {},
        loading: false,
        success: false,
        error: false,
    };

    handleChange = name => event => {
        let data = this.state.data;
        data[name] = event.target.value;
        this.setState({ data });
        if (this.props.notifyValid) {
            if (this.timerValue) {
                window.clearTimeout(this.timerValue);

                this.timerValue = window.setTimeout(()=>{
                    this.props.notifyValid(this.props.name, this.validate());
                    this.timerValue = 0;
                }, 1000);
            }
        }
    };

    createControl = (control, value) => {
        let error = (!value || value === "") && this.state.validating && control.mandatory && !control.key
        switch (control.type) {
            case "number":
                let readonly = false;
                if (control.ref) {
                    // table reference?
                    return (<Autocomplete disabled={control.disabled} config={control.ref} label={control.display} value={value} error={error} onChange={this.handleChange(control.name)} />)
                }
                else if (control.key) {
                    readonly = true;
                }
                else {
                    if (control.disabled) {
                        readonly = true;
                    }

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
                                value={value ? value : ""}
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
                return <PictureBox name={control.name} onChange={this.handleChange(control.name)} value={value} />

            default:
                return (<div></div>);
        }
    }
    handleClose = () => {
        this.setState({ open: false, validating: false, success: false, loading: false, error: false, saving: false });
        return this.props.onClose ? this.props.onClose() : null;
    };

    validate = () => {
        let allValid = true;

        this.props.config.columns.forEach(x => {
            if (!x.key && x.mandatory && (!this.state.data[x.name] || this.state.data[x.name] === "")) {
                allValid = false;
            }
        })

        return allValid;
    }

    handleSave = () => {
        // validate all
        // if invalid set state to validating and force mark invalid

        let allValid = this.validate();

        if (!allValid) {
            this.setState({ validating: true })
        }
        else {
            this.setState({ validating: false, saving: true, loading: true, error: false, success: false })
            // we don't control the closing
            this.props.onUpdate(this.state.data);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
        if (props.data) {

            this.setState({ data: props.data });
        }

        if (props.updateError) {
            this.setState({ loading: false, success: false, error: true, message: props.message })
        }
        else if (props.updateSuccess) {
            this.setState({ loading: false, success: true, error: false, message: "" })
        }

        if (!props.updateSuccess && !props.updateError) {
            this.setState({ loading: false, success: false, error: false, message: "" });
        }

        if (props.validating !== this.props.validating) {
            this.setState({validating: props.validating})
        }
    }

    render() {
        const { loading, success, error } = this.state;
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });

        if (this.props.isPanel) {
            return (
                <div>{
                    this.props.config.columns.map(x => {
                        return (
                            <Row key={x.name}>
                                <FullColumn>{this.createControl(x, this.state.data[x.name] ? this.state.data[x.name] : "")}</FullColumn>
                            </Row>
                        )
                    })
                }
                </div>)
        }

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
                    style={{ zIndex: 5000 }}
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
                                        <FullColumn>{this.createControl(x, this.state.data[x.name] ? this.state.data[x.name] : "")}</FullColumn>
                                    </Row>
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Close
                        </Button>
                        <div style={{ marginRight: "22px", marginBottom: "18px" }}>
                            <Button
                                variant="fab"
                                color="primary"
                                className={buttonClassname}
                                onClick={this.handleSave}
                            >
                                {success ? <CheckIcon /> : (error ? <CrossIcon /> : <SaveIcon />)}
                            </Button>
                            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default withMobileDialog()(withStyles(styles)(FormDialog));