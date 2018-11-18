import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import OrderInfo from './orderInfo';

import { connect } from 'react-redux';
import BillingForm from '../../../components/billingForm/billingForm';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';
import swal from 'sweetalert2';

import actions from '../../../redux/ecommerce/actions';

import LinearProgress from '@material-ui/core/LinearProgress';

import {
  Row,
  OneThirdColumn,
  TwoThirdColumn,
  HalfColumn,
} from '../../../components/utility/rowColumn';
import CheckoutPageWrapper from './checkout.style';


function getDate() {
  let val = new Date().toISOString()

  val = val.substring(0, val.indexOf("."));

  return val;
}

const styles = theme => ({});
const { checkout, clearCart } = actions;

class Checkout extends React.Component {
  state = {
    loading: false,
    timestamp: getDate()
  }
  handleChanged = (name, value) => {
    this.setState({ [name]: value })
  }

  componentWillReceiveProps(props) {
    console.log(props);
    if (props.success && !this.props.success) {
      // done!
      this.setState({loading: false});
      swal(
        'Checkout Completed Successfully',
        'Successfully Checkout the Cart, your items have been sold',
        'success'
      )
    }
    else if (!props.success && this.state.loading) {      
      this.setState({loading: false});
      swal(
        'Failed to Checkout',
        'Failed to checkout, internal error : ' + props.message,
        'error'
      );
    }
  }

  handleCheckout = () => {
    let that = this;
    if (this.props.productQuantity.length === 0) {
      swal(
        'Failed to Checkout',
        'Cannot checkout an empty cart!',
        'error'
      )
      return;
    }
    navigator.geolocation.getCurrentPosition(function (position) {

      // Get the coordinates of the current position.
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      let state = {
        customerEmail: that.state.recp_customer_email,
        customerName: that.state.recp_customer,
        "longitude": lng,
        "latitude": lat,
        "staff_id": that.state.recp_staff_id,
        "staffName": that.state.staffName,
        "sales": [],
        "timestamp": that.state.recp_timestamp,
      }

      that.props.productQuantity.forEach(x => {
        // objectID

        let obj = that.props.products[x.objectID];
        let quantity = x.quantity;
        
        state.sales.push({
           inventoryId : obj.inventoryID,
           sale_inv_id : obj.inventoryID,
           sale_price: obj.price,
           sale_total_purchase: quantity,
           prod_name: obj.name
        })
      });

      console.log("items", state);
      console.log("Checkout", that.props.checkout);

      that.props.checkout(state); // lets checkout!
      that.setState({loading: true})

    });


  }
  render() {
    return (
      <LayoutWrapper>
        <CheckoutPageWrapper className="checkoutPageWrapper">
          <LinearProgress style={{ display: this.state.loading ? "block" : "none" }} />

          <Row>
            <HalfColumn>
              <Papersheet>
                <h3 className="sectionTitle">Billing details</h3>
                <BillingForm notifyChange={this.handleChanged} />
              </Papersheet>
            </HalfColumn>

            <HalfColumn>
              <Papersheet>
                <OrderInfo notifyChange={this.handleChanged} clearCart={this.props.clearCart} checkingOut={this.state.loading} notifyCheckout={this.handleCheckout} />
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
    ...state.Ecommerce
  }),
  { checkout, clearCart }
)(withStyles(styles, { withTheme: true })(Checkout));

