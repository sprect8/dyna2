import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { FullColumn } from '../../components/utility/rowColumn';
import Button from '../../components/uielements/button';
import Icon from '../../components/uielements/icon';

import TableView from '../../components/masterdetail/tableview';
import FormEditView from '../../components/masterdetail/formedit';
import HistoryView from '../../components/masterdetail/historyview';

import 'react-vertical-timeline-component/style.min.css';
import actions from '../../redux/masterdetails/actions';
import { connect } from 'react-redux';

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

const { loadData, saveData, updateData, deleteData } = actions;


class MasterView extends React.Component {
	state = {
		open: false,
		records: [],
		sel: {}
	};

	componentDidMount = () => {
		this.props.loadData(this.props.config);
	}

	componentWillReceiveProps = (props) => {
		console.log(props);
		if (props.rows) {
			this.setState({records:props.rows})
		}
		else {
			this.setState({records:[]})
		}
	}

	handleClickOpen = () => {
		// clear items
		let data = {};
		this.props.config.columns.forEach(x => {
			data[x.name] = "";
		});
		this.setState({ open: true, sel: data });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleUpdate = (record) => {
		this.props.saveData(this.props.config, record);
		//let st = this.state.records;
		//st.push(record);
		//this.setState({records:st, open: false});
	}

	render() {
		let { config } = this.props;
		return (<LayoutWrapper>
			<FullColumn>
				<Papersheet title={config.displayName}>
					<Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="add" style={{ "float": "right", "marginRight": "auto", "marginLeft": "8px" }}><Icon>add</Icon></Button>

					<TableView config={config} data={this.state.records} />
				</Papersheet>
			</FullColumn>
			<FullColumn>
				<HistoryView config={config} data={this.state.records} />
			</FullColumn>
			<FormEditView config={config} open={this.state.open} onClose={this.handleClose} onUpdate={this.handleUpdate} data={this.state.sel} />
		</LayoutWrapper>
		)
	}
};

const appConect = connect(
	state => ({
		...state.MasterDetailsReducer,
	}),
	{ loadData, updateData, saveData, deleteData }
)(MasterView);
export default appConect;

