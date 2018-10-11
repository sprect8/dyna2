import React from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import { FullColumn } from '../../components/utility/rowColumn';
import IntlMessages from '../../components/utility/intlMessages';
import Button from '../../components/uielements/button';
import Icon from '../../components/uielements/icon';

export default () => (
	<LayoutWrapper>
		<FullColumn>
			<Papersheet title="Staff Management">
				<Button variant="fab" color="primary" aria-label="add" style={{"float":"right", "marginRight":"auto", "marginLeft":"8px"}}><Icon>add</Icon></Button>

			</Papersheet>
		</FullColumn>
	</LayoutWrapper>
);
