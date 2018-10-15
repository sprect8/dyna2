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

let id = 0;
function createData(name, item, units, unitcosts, total) {
	id += 1;
	return { id, name, item, units, unitcosts, total };
}

const data = [
	createData('Jones', 'Pencil', 95, 1.99, 189.05),
	createData('Kivell', 'Binder', 50, 19.99, 999.5),
	createData('Jardine', 'Pencil', 36, 4.99, 179.64),
	createData('Gill', 'Pen', 27, 19.99, 539.73),
	createData('Sorvino', 'Pencil', 56, 2.99, 167.44),
];

/**
 * This tool is for data entry into the system based on an underlying database model 
 **/

export default class MasterView extends React.Component {
	state = {
        open: false,
    };
	handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
	
	render() {
		let {config} = this.props;
	return (<LayoutWrapper>
		<FullColumn>
			<Papersheet title={config.displayName}>
				<Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="add" style={{ "float": "right", "marginRight": "auto", "marginLeft": "8px" }}><Icon>add</Icon></Button>
				<p style={{"float":"left"}} className="description">{config.description}</p>
				<TableView config={config} data={data}/>
			</Papersheet>
		</FullColumn>
		<FullColumn>
			<HistoryView config={config} data={data}/>
		</FullColumn>
		<FormEditView config={config} open={this.state.open} onClose={this.handleClose}/>
	</LayoutWrapper>
	)
	}
};
