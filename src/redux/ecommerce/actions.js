const actions = {
	INIT_DATA: 'ECOMMERCE_INIT_DATA',
	INIT_DATA_SAGA: 'ECOMMERCE_INIT_DATA_SAGA',
	UPDATE_DATA: 'ECOMMERCE_UPDATE_DATA',
	UPDATE_DATA_SAGA: 'ECOMMERCE_UPDATE_DATA_SAGA',
	CHANGE_VIEW: 'ECOMMERCE_CHANGE_VIEW',
	VIEW_TOPBAR_CART: 'ECOMMERCE_VIEW_TOPBAR_CART',
	CHECKOUT_SAGA: "ECOMMERCE_CHECKOUT_SAGA",
	CHECKOUT_SUCCESS: "ECOMMERCE_CHECKOUT_SUCCESS",
	CHECKOUT_FAIL: "ECOMMERCE_CHECKOUT_FAIL",
	checkout: payload => {
		return {
			type: actions.CHECKOUT_SAGA,
			payload: payload,
		}
	},	
	initData: () => ({ type: actions.INIT_DATA_SAGA }),
	changeView: view => ({
		type: actions.CHANGE_VIEW,
		view,
	}),
	changeViewTopbarCart: viewTopbarCart => {
		return {
			type: actions.VIEW_TOPBAR_CART,
			viewTopbarCart,
		};
	},
	changeProductQuantity: productQuantity => {
		return (dispatch, getState) => {
			const { products } = getState().Ecommerce;
			dispatch({
				type: actions.UPDATE_DATA_SAGA,
				products,
				productQuantity,
			});
		};
	},
	addToCart: product => {
		return (dispatch, getState) => {
			const { products, productQuantity } = getState().Ecommerce;
			const objectID = product.objectID;
			productQuantity.push({ objectID, quantity: 1 });
			const productInfo = {
				name: product._highlightResult.name.value,
				description: product._highlightResult.description.value,
			};
			const newProduct = {
				...product,
				...productInfo,
			};
			products[objectID] = newProduct;
			dispatch({
				type: actions.UPDATE_DATA_SAGA,
				products,
				productQuantity,
			});
		};
	},
};
export default actions;
