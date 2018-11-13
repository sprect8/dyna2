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

const { loadData, saveData, updateData, deleteData, openToEdit, openForNew, closedEditBox } = actions;

/**
 * Username First Name Last Name
 * Company Name Company Industry
 * Company Motto Company Phone Company Email
 * Company Logo
 * 
 * Password settings
 */

const settings = {
    "tableName": "settings",
    "displayName": "Settings table",
    "key": "cate_id",
    "display": "cate_name",
    "description": "Settings Table",
    "columns": [
      { "name": "sett_id", "display": "Setting ID", "type": "number", "sequence": "cate_id_seq", "mandatory": true, "unique": true, "key": true },
      { "name": "sett_user_id", "display": "User ID", "type": "text", "mandatory": true, "unique": true },
	  { "name": "sett_user_pic", "display": "User Photo", "type": "picture"},
	  { "name": "sett_company_name", "display": "Company Name", "type": "text" },
	  { "name": "sett_company_logo", "display": "Logo", "type": "picture" },
	  { "name": "sett_company_motto", "display": "Motto", "type": "text" },
	  { "name": "sett_company_email", "display": "Email", "type": "text" },
	  { "name": "sett_company_phone", "display": "Phone", "type": "text" },
	  { "name": "sett_indt_id", "display": "Industry", "type": "text" }
    ]
  }

class Settings extends React.Component {
	state = {
		open: false,
		records: [],
		sel: {},
		loadingRows: true,
	};

	componentDidMount = () => {
		this.props.loadData(this.props.config);
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
		this.props.config.columns.forEach(x => {
			data[x.name] = "";
		});
		data[this.props.config.key] = null;
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
		this.updating = true;
		this.props.saveData(this.props.config, record);
		//let st = this.state.records;
		//st.push(record);
		//this.setState({records:st, open: false});
	}

	handleDeleteRow = (record) => {
		let key = record[this.props.config.key];
		console.log(key);
		this.props.deleteData(this.props.config, key);
		this.deleting = true;
	}

	render() {
		let { config } = this.props;
		return (<LayoutWrapper>

			<FullColumn>
				<h3>Personal</h3>

			</FullColumn>
			<FullColumn>
				<h3>Company</h3>
				<FormEditView config={settings} open={this.state.open}
				updateError={this.state.error}
				updateSuccess={this.state.saved}
				message={this.state.message}

				onClose={this.handleClose}
				onUpdate={this.handleUpdate}
				data={this.state.sel} 
				isPanel={true}
				/>
			</FullColumn>			
		</LayoutWrapper>
		)
	}
};

const appConect = connect(
	state => ({
		...state.MasterDetailsReducer,
	}),
	{ loadData, updateData, saveData, deleteData, openToEdit, openForNew, closedEditBox }
)(Settings);
export default appConect;

