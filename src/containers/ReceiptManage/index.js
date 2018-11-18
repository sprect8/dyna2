import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { FullColumn } from '../../components/utility/rowColumn';
import Button from '../../components/uielements/button';
import Icon from '../../components/uielements/icon';
import swal from 'sweetalert2';

import TableView from '../../components/masterdetail/tableview';
import FormEditView from '../../components/masterdetail/formedit';
import HistoryView from '../../components/masterdetail/historyview';

import 'react-vertical-timeline-component/style.min.css';
import actions from '../../redux/masterdetails/actions';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

const { loadData, saveData, updateData, deleteData, openToEdit, openForNew, closedEditBox, formModified } = actions;


const receipts = {
    "tableName": "receipts",
    "displayName": "Receipts Records",
    "key": "recp_id",
    "display": "recp_id",
    "description": "These are your Receipt records, edit, add, remove and view any details",
    "columns": [
      { "name": "recp_id", "display": "Receipts Id", "type": "number", "sequence": "recp_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "recp_staff_id", "display": "Staff", "type": "number", "mandatory": true, "ref": "staffs" },
      { "name": "recp_uuid", "display": "Unique ID", "type": "text", "mandatory": true, disabled: true, "uuid": true },
      { "name": "recp_latitude", "display": "Latitude", "type": "number", disabled: true, "latitude": true},
      { "name": "recp_longitude", "display": "Longitude", "type": "number", disabled: true, "longitude": true},
      { "name": "recp_customer", "display": "Customer Name", "type": "text", "mandatory": true },
      { "name": "recp_customer_email", "display": "Customer Email", "type": "text", "mandatory": true },
      { "name": "recp_timestamp", "display": "Receipt Date", "type": "timestamp", "mandatory": true },
      { "name": "items", "display": "Sold Items", "type": "mdview"}
    ]
  }

class MasterView extends React.Component {
	state = {
		open: false,
		records: [],
		sel: {},
		loadingRows: true,
	};

	componentDidMount = () => {
		this.props.loadData(receipts);
	}

	componentWillReceiveProps = (props) => {

		if (this.deleting && props.success) {
			swal(
				'Deleted!',
				'Your row has been deleted.',
				'success'
			)
		}
		if (this.deleting && !props.success) {
			swal(
				'Failed to Deleted!',
				'Your row has not been deleted. Error was ' + props.message,
				'error'
			)
		}

		this.deleting = false;

		console.log(props);
		if (props.rows) {

			this.setState({ records: props.rows, loadingRows: false })
		}
		else {
			this.setState({ records: [] })
		}

		if (this.updating) {
			// check error
			let error = props.message;
			let saved = !error;

			this.setState({ saved, error, message: props.message })
		}
		this.updating = false;

		if (this.props.loaded !== props.loaded && props.loaded && props.selectedData) {
			this.setState({ open: true, sel: props.selectedData });
		}
	}

	handleClickOpen = () => {
		// clear items
		let data = {};
		receipts.columns.forEach(x => {
			data[x.name] = "";
		});
		data[receipts.key] = null;
		//this.setState({ open: true, sel: data });
		this.props.openForNew(data);
	};

	handleClose = () => {
		this.props.closedEditBox();
		this.setState({ open: false });

	};

	handleEditRow = (row) => {
		//this.setState({open: true, sel: row});
		this.props.openToEdit(row);
	}

	handleUpdate = (record) => {
		console.log(this.props.saveData);
		this.props.formModified();
		this.updating = true;
		this.props.saveData(receipts, record);
		//let st = this.state.records;
		//st.push(record);
		//this.setState({records:st, open: false});
	}

	handleDeleteRow = (record) => {
		let key = record[receipts.key];
		console.log(key);
		this.props.deleteData(receipts, key);
		this.deleting = true;
	}

	render() {
		let config = receipts;
		return (<LayoutWrapper>

			<FullColumn>
				<LinearProgress style={{ display: this.state.loadingRows ? "block" : "none" }} />


				<Papersheet title={config.displayName}>

					Click Row to Edit

					<Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="add" style={{ "float": "right", "marginRight": "auto", "marginLeft": "8px" }}><Icon>add</Icon></Button>

					<TableView config={config} data={this.state.records} editRow={this.handleEditRow} deleteRow={this.handleDeleteRow} />
				</Papersheet>
			</FullColumn>
			<FullColumn>
				<HistoryView config={config} data={this.state.records} />
			</FullColumn>
			<FormEditView config={config} open={this.state.open}
				updateError={this.state.error}
				updateSuccess={this.state.saved}
				message={this.state.message}

				onClose={this.handleClose}
				onUpdate={this.handleUpdate}
				data={this.state.sel} />
		</LayoutWrapper>
		)
	}
};

const appConect = connect(
	state => ({
		...state.MasterDetailsReducer,
	}),
	{ loadData, updateData, saveData, deleteData, openToEdit, openForNew, closedEditBox, formModified}
)(MasterView);
export default appConect;

