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
import Quagga from 'quagga';

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
        Quagga.stop();
    };

    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
        if (props.data) {
            this.setState(props.data);
        }
    }

    componentDidMount() {

    }

    componentWillUnmount = () => {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = (result) => {
        console.log("Result is ", result);
        //this.setState({ results: this.state.results.concat([result]) });
        this.setState({ value: result.codeResult.code, open: false });
        Quagga.stop();
        this.props.onChange({target:{value:result.codeResult.code}});
    }

    afterOpenModal = () => {
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: 500,
                    height: 400,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true,
                },
                readers: ["code_128_reader", "ean_reader", "upc_reader", "upc_e_reader"]
            },
            locate: true
        },  (err) => {
            if (err) {
                return console.log(err);
            }
            Quagga.onDetected(this._onDetected);
            Quagga.start();
        });
        this.hasInitialised = true;

        //

    }

    handleOpen = () => {

        this.setState({ open: true })
        
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    onRendered={this.afterOpenModal}
                >
                    <DialogTitle id="form-dialog-title">Snap a photo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Take a picture of the products you're selling
                        </DialogContentText>
                        <div id="interactive" className="viewport" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                Barcode: <TextField value={this.state.value} onChange={(event) => { this.setState({ value: event.target.value }) }} />
                <Button onClick={this.handleOpen} color="primary">Scan</Button>
            </div>
        )
    }
};
