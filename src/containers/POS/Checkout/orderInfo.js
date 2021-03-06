import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/uielements/button";
import Autocomplete from "../../../components/masterdetail/autocomplete"
import SingleOrderInfo from "./singleOrder";
import TextField from '@material-ui/core/TextField';


function getDate() {
  let val = new Date().toISOString()

  val = val.substring(0, val.indexOf("."));

  return val;
}
let totalPrice;

class OrderInfo extends Component {
  constructor(props) {
    super(props);
    this.renderProducts = this.renderProducts.bind(this);
    this.state = {validating: false, staff: ""}
  }

  handleChange = (table) => (e) => {
    console.log("Done");
    this.setState({staff: e.target.value, validating: false});

    if (this.props.notifyChange) {
      this.props.notifyChange("recp_staff_id", e.target.id)      
      this.props.notifyChange("staffName", e.target.value)
    }
  }

  handleChangeDate = (table) => (e) => {
    
    this.setState({checkoutDate: e.target.value, validating: false});

    if (this.props.notifyChange) {
      this.props.notifyChange("recp_timestamp", e.target.value)
    }
  }

  renderProducts() {
    const { productQuantity, products } = this.props;
    totalPrice = 0;
    return productQuantity.map(product => {
      totalPrice += product.quantity * products[product.objectID].price;
      return (
        <SingleOrderInfo
          key={product.objectID}
          quantity={product.quantity}
          {...products[product.objectID]}
        />
      );
    });
  }

  handleClicked = () => {
    console.log(this.props.products);  
    if (this.state.staff === "" || !this.state.staff) {
      this.setState({validating: true});
      return;
    }  
    this.props.notifyCheckout();
  }

  render() {
    return (
      <div className="orderInfo">
        <div className="orderTable">
          <div className="orderTableHead">
            <span className="tableHead">Product</span>
            <span className="tableHead">Total</span>
          </div>

          <div className="orderTableBody">{this.renderProducts()}</div>
          <div className="orderTableFooter">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>   
          
          
          <Autocomplete config="staffs" label={"Staff"} value={this.state.staff ? this.state.staff : ""} error={this.state.validating} onChange={this.handleChange("staffs")}/>
      
          <TextField
          style={{marginTop: "5px", marginBottom:"5px"}}
              fullWidth
              id="dateCheckout"
              label={"Date"}
              type="datetime-local"
              onChange={this.handleChangeDate("table")}
              value={this.state.checkoutDate? this.state.checkoutDate : getDate()}
              InputLabelProps={{
                  shrink: true,
              }}
          />

          <Button disabled={this.props.productQuantity.length === 0} variant="raised" color="primary" className="orderBtn" onClick={this.handleClicked}>
            Place Order
          </Button>
          <Button onClick={this.props.clearCart}>
            Next Order
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.Ecommerce
  };
}
export default connect(mapStateToProps)(OrderInfo);
