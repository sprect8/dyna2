import actions from './actions';

const initState = {
  loadingInitData: false,
  view: 'gridView',
  viewTopbarCart: false,
  productQuantity: [],
  products: {}
};
export default (state = initState, action) => {
  switch (action.type) {
    case actions.INIT_DATA:
      return {
        ...state,
        productQuantity: action.payload.productQuantity,
        products: action.payload.products,
        loadingInitData: true
      };
    case actions.CLEAR_CART:
      return {
        ...state,
        productQuantity: [],
        products: {}
      }
    case actions.CHANGE_VIEW:
      return {
        ...state,
        view: action.view
      };
    case actions.VIEW_TOPBAR_CART:
      return {
        ...state,
        viewTopbarCart: action.viewTopbarCart
      };

    case actions.UPDATE_DATA:
      return {
        ...state,
        products: action.products,
        productQuantity: action.productQuantity
      };
    case actions.CHECKOUT_SAGA:
      return {
        ...state,
        success: false,
        message: ""
      }
    case actions.CHECKOUT_FAIL:
      return {
        ...state,
        success: false,
        message: action.message
      }
      
    case actions.CHECKOUT_SUCCESS:
    return {
      ...state,
      success: true,
      message: action.message
    }
    default:
      return state;
  }
};
