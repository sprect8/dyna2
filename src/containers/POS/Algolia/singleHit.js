import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import ecommerceActions from '../../../redux/ecommerce/actions';
import {
  GridListViewWrapper,
  Button,
  CartIcon,
  Rate,
} from '../../../components/algolia/algoliaComponent.style';

const { addToCart, changeViewTopbarCart } = ecommerceActions;

class Hit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCartLoading: false,
    };
  }
  render() {
    const { hit } = this.props;
    const className =
      this.props.view === 'gridView'
        ? 'algoliaGrid GridView'
        : 'algoliaGrid ListView';
    let addedTocart = false;
    this.props.productQuantity.forEach(product => {
      if (product.objectID === hit.objectID) {
        addedTocart = true;
      }
    });
    return (
      <GridListViewWrapper className={className}>
        <div className="alGridImage">
          <img alt="#" src={hit.image} />
          {!addedTocart ? (
            <Button
              onClick={() => {
                this.setState({ addCartLoading: true });
                const update = () => {
                  this.props.addToCart(hit);
                  this.setState({ addCartLoading: false });
                };
                setTimeout(update, 1500);
              }}
            >
              <CartIcon>shopping_cart</CartIcon>
              Add to cart
            </Button>
          ) : (
            <Button
              onClick={() => this.props.changeViewTopbarCart(true)}
              type="primary"
            >
              View Cart
            </Button>
          )}
        </div>
        <div className="alGridContents">
          <div className="alGridName">
            <Highlight attribute="name" hit={hit} />
          </div>

          <div className="alGridPriceRating">
            <span className="alGridPrice">${hit.price}</span>

            <div className="alGridRating">
              <Rate
                disabled
                starCount={6}
                value={hit.rating}
                name="algoliaRating"
              />
            </div>
          </div>

          <div className="alGridDescription">
            <Snippet attribute="description" hit={hit} />
          </div>
        </div>
      </GridListViewWrapper>
    );
  }
}
function mapStateToProps(state) {
  const { view, productQuantity } = state.Ecommerce;
  return {
    view,
    productQuantity,
  };
}
export default connect(
  mapStateToProps,
  { addToCart, changeViewTopbarCart }
)(Hit);
