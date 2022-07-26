export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.filter((item) =>
          item._id === action.payload._id
            ? (item.qty = action.payload.qty)
            : item.qty
        ),
      };
      case "EMPTY_CART":{
        return{
          ...state,
          cart:[]
        }
      }
    default:
      return state;
  }
};
