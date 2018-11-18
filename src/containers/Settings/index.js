import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
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
import FormEditView from '../../components/masterdetail/formedit';


import 'react-vertical-timeline-component/style.min.css';
import actions from '../../redux/masterdetails/actions';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TextField } from '@material-ui/core';

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

const { loadUserSettings, saveUserSettings, saveCompanySettings } = actions;

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
		{ "name": "sett_company_name", "display": "Company Name", "type": "text", "mandatory": true },
		{ "name": "sett_company_logo", "display": "Logo", "type": "picture" },
		{ "name": "sett_company_motto", "display": "Motto", "type": "text" },
		{ "name": "sett_company_email", "display": "Email", "type": "text" },
		{ "name": "sett_company_phone", "display": "Phone", "type": "text" },
		{ "name": "sett_indt_id", "display": "Industry", "type": "text", "lov": ["Food and Beverage", "Clothing", "Local Spa", "Beauty Products", "Retail"] }
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
const NORMAL = 0;
const LOADING = 1;
const SAVING = 2;
const ERROR = 3;
const SAVED = 4;


class Settings extends React.Component {
	state = {
		open: false,
		user: {},
		settings: {},
		newPass: "",
		reenterPass: "",
		statusDetails: NORMAL,
		statusCompany: NORMAL,
		validating: false,
		validatingUser: false,
	};

	validating = (name, status) => {
		if (!this.validate) {
			this.validate = { "personal": undefined, "company": false }
		}
		this.validate[name] = status;
	}

	componentDidMount = () => {
		this.props.loadUserSettings();
	}

	componentWillReceiveProps = (props) => {
		console.log(props)
		if (props.profile && !this.props.profile) {
			this.setState({ user: props.profile.user, settings: props.profile.settings })
			let userValid = true;
			let companyValid = false;
			if (props.profile.settings.sett_company_name) {
				companyValid = true;
			}

			this.validate = { personal: userValid, company: companyValid };
		}
	}

	handleClose = () => {
	};

	handleUpdate = (name, value) => {
		this.state.user[name] = value
	}

	handleUpdateCompany = (name, value) => {
		this.state.settings[name] = value
	}

	handleSave = () => {
		// company SAVE
		// company validation is important
		// personal default is valid; but if they change it can be invalid
		// without change, personal becomes valid (undefined) so we check false
		if (!this.validate || !this.validate["company"]) {
			this.setState({ validating: true });
			return;
		}
		else {
			// good to save			
			this.setState({ statusCompany: SAVING });
			// save company details
			this.props.saveCompanySettings(this.state.settings);
		}
	}

	handleSaveUser = () => {
		// company validation is important
		// personal default is valid; but if they change it can be invalid
		// without change, personal becomes valid (undefined) so we check false
		if (this.validate && this.validate["personal"] == false) {
			this.setState({ validatingUser: true, validatingUser: false });
			return;
		}
		else {
			if (this.state.newPass !== this.state.reenterPass) {
				this.setState({ validatingUser: true });
				return;
			}
			this.setState({ statusDetails: SAVING, validatingUser: false });
			// save user details
			this.props.saveUserSettings(this.state.user);
		}
	}

	render() {
		const { success, error } = this.state;

		let loading = this.state.statusCompany === LOADING || this.state.statusDetails === LOADING ||
			this.state.statusCompany === SAVING || this.state.statusDetails === SAVING;

		const { classes } = this.props;
		const buttonClassname = classNames({
			[classes.buttonSuccess]: success,
		});

		return (<LayoutWrapper>
			<FullColumn>
				<h3>Personal</h3>
				<FormEditView config={users} open={this.state.open}
					name="personal"
					updateError={this.state.error}
					updateSuccess={this.state.saved}
					message={this.state.message}
					notifyValid={this.validating}

					validating={this.state.validatingUser}
					onClose={this.handleClose}
					onUpdate={this.handleUpdate}
					updateValue={this.handleUpdate}
					data={this.state.user}
					isPanel={true}
				/>
			</FullColumn>
			<FullColumn>
				<h4>Password</h4>
				<TextField
					id="newpass"
					fullWidth
					//error={error}
					label={"New Password"}
					type="password"
					onChange={e => { this.setState({ newPass: e.target.value }) }}
					value={this.state.newPass}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="reeneterpass"
					fullWidth
					error={this.state.newPass !== this.state.reenterPass}
					label={"Re-enter Password"}
					type="password"
					onChange={e => { this.setState({ reenterPass: e.target.value }) }}
					value={this.state.reenterPass}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</FullColumn>
			<FullColumn>
				<div style={{ position: "relative" }}>
					<Button
						style={{ marginTop: "6px", marginLeft: "6px" }}
						variant="fab"
						color="primary"
						className={buttonClassname}
						onClick={this.handleSaveUser}
						disabled={loading}
					>
						{success ? <CheckIcon /> : (error ? <CrossIcon /> : <SaveIcon />)}
					</Button>

					{loading && <CircularProgress size={68} className={classes.fabProgress} style={{ left: "0px", bottom: "unset" }} />}
				</div>
			</FullColumn>
			<FullColumn>
				<h3>Company</h3>
				<FormEditView config={settings} open={this.state.open}
					name="company"
					updateError={this.state.error}
					updateSuccess={this.state.saved}
					message={this.state.message}
					notifyValid={this.validating}
					updateValue={this.handleUpdateCompany}

					onClose={this.handleClose}
					onUpdate={this.handleUpdate}
					data={this.state.settings}
					validating={this.state.validating}
					isPanel={true}
				/>
			</FullColumn>

			<FullColumn>
				<div style={{ position: "relative" }}>
					<Button
						style={{ marginTop: "6px", marginLeft: "6px" }}
						variant="fab"
						color="primary"
						className={buttonClassname}
						onClick={this.handleSave}
						disabled={loading}
					>
						{success ? <CheckIcon /> : (error ? <CrossIcon /> : <SaveIcon />)}
					</Button>
					{loading && <CircularProgress size={68} className={classes.fabProgress} style={{ left: "0px", bottom: "unset" }} />}
				</div>
			</FullColumn>
		</LayoutWrapper>
		)
	}
};

const appConect = connect(
	state => ({
		...state.MasterDetailsReducer,
	}),
	{ loadUserSettings, saveUserSettings, saveCompanySettings }
)(Settings);

export default withStyles(styles)(appConect);

