import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Scanner from '../../../components/uielements/barcode'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../components/uielements/table';
import TextField from '../../../components/uielements/textfield';
import Button from '../../../components/uielements/button';
import ecommerceActions from '../../../redux/ecommerce/actions';
import SingleCart from '../../../components/cart/singleCart';
import ProductsTable from './cartTable.style';
import { rtl } from '../../../settings/withDirection';

const { changeProductQuantity } = ecommerceActions;

let totalPrice = 0;
class CartTable extends Component {
  constructor(props) {
    super(props);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.cancelQuantity = this.cancelQuantity.bind(this);
  }
  renderItems() {
    const { productQuantity, products } = this.props;
    totalPrice = 0;
    if (!productQuantity || productQuantity.length === 0) {
      return <TableRow className="noItemMsg">No item found</TableRow>;
    }
    return productQuantity.map(product => {
      totalPrice += product.quantity * products[product.objectID].price;
      return (
        <SingleCart
          key={product.objectID}
          quantity={product.quantity}
          changeQuantity={this.changeQuantity}
          cancelQuantity={this.cancelQuantity}
          {...products[product.objectID]}
        />
      );
    });
  }
  changeQuantity(objectID, quantity) {
    const { productQuantity } = this.props;
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.objectID !== objectID) {
        newProductQuantity.push(product);
      } else {
        newProductQuantity.push({
          objectID,
          quantity,
        });
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }
  cancelQuantity(objectID) {
    const { productQuantity } = this.props;
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.objectID !== objectID) {
        newProductQuantity.push(product);
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }
  render() {
    const { style } = this.props;
    const classname = style != null ? style : '';
    return (
      <ProductsTable className={`cartTable ${classname}`}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="itemRemove" />
              <TableCell className="itemImage" />
              <TableCell className="itemName">Name</TableCell>
              <TableCell className="itemPrice">Price</TableCell>
              <TableCell className="itemQuantity">Quantity</TableCell>
              <TableCell className="itemPriceTotal">Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.renderItems()}
            <TableRow className="totalBill">
              <TableCell className="itemRemove" />
              <TableCell className="itemImage" />
              <TableCell className="itemName" />
              <TableCell className="itemPrice" />
              <TableCell className="itemQuantity">Total</TableCell>
              <TableCell className="itemPriceTotal">
                ${totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>

          <tfoot>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell
                style={{
                  width: '220px',
                  marginLeft: `${rtl === 'rtl' ? '0' : 'auto'}`,
                  marginRight: `${rtl === 'rtl' ? 'auto' : '0'}`,
                  padding: 0,
                  paddingRight: `${rtl === 'rtl' ? '0' : '25px'}`,
                  paddingLeft: `${rtl === 'rtl' ? '25px' : '0'}`,
                }}
              >                
              </TableCell>

              <TableCell
                className="buttonsWrapper"
                style={{
                  padding: 0,
                }}
              >
                <Scanner
                  hideField={true}
                  variant="raised"
                  color="primary"
                  style={{ marginRight: 10 }}
                >
                  Scan
                </Scanner>

                <Button color="primary" className="cartCheckoutBtn">
                  <Link to={'/dashboard/checkout'}>Checkout</Link>
                </Button>
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </ProductsTable>
    );
  }
}
function mapStateToProps(state) {
  const { productQuantity, products } = state.Ecommerce;
  return { productQuantity, products };
}
export default connect(
  mapStateToProps,
  { changeProductQuantity }
)(CartTable);
