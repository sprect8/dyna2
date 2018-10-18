import React from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import CartTable from './cart-table';

class CartPage extends React.Component {
  render() {
    return (
      <LayoutWrapper>
        <CartTable />
      </LayoutWrapper>
    );
  }
}
export default CartPage;
