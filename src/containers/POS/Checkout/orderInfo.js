import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/uielements/button";
import SingleOrderInfo from "./singleOrder";

let totalPrice;

class OrderInfo extends Component {
  constructor(props) {
    super(props);
    this.renderProducts = this.renderProducts.bind(this);
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

          <Button variant="raised" color="primary" className="orderBtn">
            Place Order
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
