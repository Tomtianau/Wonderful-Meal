import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  foodCart: {
    foodItems: localStorage.getItem('foodItems')
      ? JSON.parse(localStorage.getItem('foodItems'))
      : [],
    paymentOption: localStorage.getItem('paymentOption')
      ? localStorage.getItem('paymentOption')
      : '',
  },
  customerInfo: localStorage.getItem('customerInfo')
    ? JSON.parse(localStorage.getItem('customerInfo'))
    : null,
  pickupRestaurant: localStorage.getItem('pickupRestaurant')
    ? JSON.parse(localStorage.getItem('pickupRestaurant'))
    : {},
  deliveryInfomation: localStorage.getItem('deliveryInfomation')
    ? JSON.parse(localStorage.getItem('deliveryInfomation'))
    : {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'ORDER_FOOD': {
      const newItem = action.payload;
      const orderedItem = state.foodCart.foodItems.find(
        (item) => item._id === newItem._id
      );
      const foodItems = orderedItem
        ? state.foodCart.foodItems.map((item) =>
            item._id === orderedItem._id ? newItem : item
          )
        : [...state.foodCart.foodItems, newItem];
      localStorage.setItem('foodItems', JSON.stringify(foodItems));
      return {
        ...state,
        foodCart: { ...state.foodCart, foodItems },
      };
    }
    case 'DELETE_FOOD': {
      const foodItems = state.foodCart.foodItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('foodItems', JSON.stringify(foodItems));
      return { ...state, foodCart: { ...state.foodCart, foodItems } };
    }
    case 'EMPTY_FOODCART':
      return { ...state, foodCart: { ...state.foodCart, foodItems: [] } };
    case 'SIGN_IN':
      return { ...state, customerInfo: action.payload };
    case 'SIGN_OUT':
      return {
        ...state,
        customerInfo: null,
        foodCart: { foodItems: [], paymentOption: '' },
        deliveryInfomation: {},
        pickupRestaurant: {},
      };
    case 'SAVE_SELECTED_RESTAURANT': {
      const selectedRestaurant = action.payload;
      localStorage.setItem(
        'pickupRestaurant',
        JSON.stringify(selectedRestaurant)
      );
      return { ...state, pickupRestaurant: action.payload };
    }
    case 'SAVE_DELIVERY_INFOMATION':
      return {
        ...state,
        deliveryInfomation: action.payload,
      };
    case 'SELECT_PAYMENT_OPTION':
      return {
        ...state,
        foodCart: { ...state.foodCart, paymentOption: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
