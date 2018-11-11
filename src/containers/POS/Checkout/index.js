import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import OrderInfo from './orderInfo';

import { connect } from 'react-redux';
import BillingForm from '../../../components/billingForm/billingForm';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';

import actions from '../../../redux/ecommerce/actions';


import {
  Row,
  OneThirdColumn,
  TwoThirdColumn,
  HalfColumn,
} from '../../../components/utility/rowColumn';
import CheckoutPageWrapper from './checkout.style';

const styles = theme => ({});
const { checkout } = actions;

class Checkout extends React.Component {
  handleChanged = (name, value) => {
    
  }
  render() {
    return (
      <LayoutWrapper>
        <CheckoutPageWrapper className="checkoutPageWrapper">
          <Row>
            <HalfColumn>
              <Papersheet>
                <h3 className="sectionTitle">Billing details</h3>
                <BillingForm />
              </Papersheet>
            </HalfColumn>

            <HalfColumn>
              <Papersheet>
                <OrderInfo />
              </Papersheet>
            </HalfColumn>
          </Row>
        </CheckoutPageWrapper>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
  }),
  { checkout }
)(withStyles(styles, { withTheme: true })(Checkout));

