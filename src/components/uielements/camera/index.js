// a component whose purpose is 
// 1 - button to accept input of image
// 2 - click on button shows the camera image
// 3 - click another button to take a picture

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-vertical-timeline-component/style.min.css';
import Webcam from "react-webcam";
import withMobileDialog from '@material-ui/core/withMobileDialog';

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

class PictureBox extends React.Component {
    state = {
        takeScreenshot: false,
        snapshot: "",
        open: false,
        cameraModeUser: true
    };

    onFileLoad = (event, file) => {
        //getBase64(event.target.files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        let that = this;
        reader.onload = function () {
            that.setState({snapshot: reader.result});
            if (that.props.onChange) {
                that.props.onChange({target:{value: reader.result}});
            }
        };
        reader.onerror = function (error) {
        };
    }

    handleClose = () => {
        this.setState({ open: false, validating: false });
        return this.props.onClose ? this.props.onClose() : null;
    };

    handleSave = () => {
        // validate all
        // if invalid set state to validating and force mark invalid
        this.setState({ validating: false, open: false, snapshot: this.webcam.getScreenshot() })
        this.props.onChange({ target: { value: this.webcam.getScreenshot() } });
    }

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
        if (props.data) {
            this.setState(props.data);
        }
        if (props.value !== this.props.value) {
            this.setState({snapshot : props.value});
        }
    }

    componentWillMount() {
        if (this.props.value) {
            this.setState({snapshot: this.props.value});
        }
    }

    handleFlipCamera = () => {
        this.setState({ cameraModeUser: !this.state.cameraModeUser })
    }

    setRef = webcam => {
        this.webcam = webcam;
    };


    render() {
        const videoConstraints = {
            facingMode: this.state.cameraModeUser ? "user" : { exact: "environment" }
        };

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth="lg"
                    style={{zIndex:5000}}
                    fullScreen={this.props.fullScreen}
                >
                    <DialogTitle id="form-dialog-title">Snap a photo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Take a picture of the products you're selling
                        </DialogContentText>
                        <Webcam ref={this.setRef} audio={false} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleFlipCamera}>
                            Flip Camera
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Take Photo
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button onClick={() => { this.setState({ open: true }) }} color="primary">Take Photo</Button>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ "display": "none" }}
                    onChange={this.onFileLoad}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        Upload Photo
                        </Button>
                </label>
                <br/>
                <img src={this.state.snapshot} style={{"width":"40%"}}/>
            </div>
        )
    }
};



export default withMobileDialog()(PictureBox);