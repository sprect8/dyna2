// a component whose purpose is 
// 1 - button to accept input of image
// 2 - click on button shows the camera image
// 3 - click another button to take a picture

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-vertical-timeline-component/style.min.css';
import Webcam from "react-webcam";

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

export default class BarcodeBox extends React.Component {
    state = {
        takeScreenshot: false,
        snapshot: "",
        open: false,
    };

    handleClose = () => {
        this.setState({ open: false, validating: false });
        return this.props.onClose ? this.props.onClose() : null;
    };

    handleSave = () => {
        // validate all
        // if invalid set state to validating and force mark invalid
        this.setState({ validating: false, open: false, snapshot: this.webcam.getScreenshot()})       
        this.props.onChange({target:{value:this.webcam.getScreenshot()}});
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
        if (props.data) {
            this.setState(props.data);
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    };


    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"

                >
                    <DialogTitle id="form-dialog-title">Snap a photo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Take a picture of the products you're selling
                        </DialogContentText>
                        <Webcam ref={this.setRef} audio={false} screenshotFormat="image/jpeg" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose}>
                            Flip Camera
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Take Photo
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={() => { this.setState({ open: true }) }} color="primary">Take Photo</Button>
                <Button onClick={() => { this.setState({ open: true }) }} color="primary">Upload Photo</Button>
                Barcode: <TextField value={this.state.value} onChange={()=>{this.setState({value:this.state.value})}}/>
            </div>
        )
    }
};
