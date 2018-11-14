import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { FullColumn } from '../../components/utility/rowColumn';
import Button from '../../components/uielements/button';
import Icon from '../../components/uielements/icon';
import swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CrossIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';

import TableView from '../../components/masterdetail/tableview';
import FormEditView from '../../components/masterdetail/formedit';
import HistoryView from '../../components/masterdetail/historyview';

import 'react-vertical-timeline-component/style.min.css';
import actions from '../../redux/masterdetails/actions';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

const { loadData, saveData, updateData, deleteData, openToEdit, openForNew, closedEditBox, loadUserSettings } = actions;

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
		{ "name": "sett_user_id", "display": "User ID", "type": "number", "mandatory": true, "unique": true, "disabled": true },
		{ "name": "sett_company_name", "display": "Company Name", "type": "text" },
		{ "name": "sett_company_logo", "display": "Logo", "type": "picture" },
		{ "name": "sett_company_motto", "display": "Motto", "type": "text" },
		{ "name": "sett_company_email", "display": "Email", "type": "text" },
		{ "name": "sett_company_phone", "display": "Phone", "type": "text" },
		{ "name": "sett_indt_id", "display": "Industry", "type": "text" }
	]
}

const users = {
	"tableName": "users",
	"displayName": "Users Records",
	"description": "System User",
	"columns": [
		{ "name": "user_id", "display": "User Id", "type": "number", "sequence": "user_id_seq", "mandatory": true, "unique": true, "key": true },
		{ "name": "user_fname", "display": "First Name", "type": "text", "mandatory": true },
		{ "name": "user_lname", "display": "Surname", "type": "text", "mandatory": true },
		{ "name": "user_email", "display": "Email", "type": "text", "mandatory": false },
		{ "name": "user_user_pic", "display": "User Photo", "type": "picture" },
	]
}


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

class Settings extends React.Component {
	state = {
		open: false,
		records: [],
		user: {},
		settings: {},
		loadingRows: true,
	};

	componentDidMount = () => {
		this.props.loadUserSettings();
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

		if (props.profile) {
			this.setState({ user: props.profile.user, settings: props.profile.settings })
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

	render() {
		let { config } = this.props;
		
        const { loading, success, error } = this.state;
		const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
		});
		
		return (<LayoutWrapper>

			<FullColumn>
				<h3>Personal</h3>
				<FormEditView config={users} open={this.state.open}
					updateError={this.state.error}
					updateSuccess={this.state.saved}
					message={this.state.message}

					onClose={this.handleClose}
					onUpdate={this.handleUpdate}
					data={this.state.user}
					isPanel={true}
				/>
			</FullColumn>
			<FullColumn>
				<h3>Company</h3>
				<FormEditView config={settings} open={this.state.open}
					updateError={this.state.error}
					updateSuccess={this.state.saved}
					message={this.state.message}

					onClose={this.handleClose}
					onUpdate={this.handleUpdate}
					data={this.state.settings}
					isPanel={true}
				/>
			</FullColumn>
			<FullColumn>
				<Button
					variant="fab"
					color="primary"
					className={buttonClassname}
					onClick={this.handleSave}
				>
					{success ? <CheckIcon /> : (error ? <CrossIcon /> : <SaveIcon />)}
				</Button>

				{loading && <CircularProgress size={68} className={classes.fabProgress} />}
			</FullColumn>
		</LayoutWrapper>
		)
	}
};

const appConect = connect(
	state => ({
		...state.MasterDetailsReducer,
	}),
	{ loadData, updateData, saveData, deleteData, openToEdit, openForNew, closedEditBox, loadUserSettings }
)(Settings);

export default withStyles(styles)(appConect);

