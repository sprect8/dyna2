import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import OrderInfo from './orderInfo';
import BillingForm from '../../../components/billingForm/billingForm';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';
import {
  Row,
  OneThirdColumn,
  TwoThirdColumn,
} from '../../../components/utility/rowColumn';
import CheckoutPageWrapper from './checkout.style';

const styles = theme => ({});

class Checkout extends React.Component {
  render() {
    return (
      <LayoutWrapper>
        <CheckoutPageWrapper className="checkoutPageWrapper">
          <Row>
            <TwoThirdColumn>
              <Papersheet>
                <h3 className="sectionTitle">Billing details</h3>
                <BillingForm />
              </Papersheet>
            </TwoThirdColumn>

            <OneThirdColumn>
              <Papersheet>
                <OrderInfo />
              </Papersheet>
            </OneThirdColumn>
          </Row>
        </CheckoutPageWrapper>
      </LayoutWrapper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Checkout);
