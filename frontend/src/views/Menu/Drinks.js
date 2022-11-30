import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Item from '../../components/Item';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import { fetchError } from '../../utils.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DRINKS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_DRINKS_SUCCESS':
      return { ...state, drinks: action.payload, loading: false };
    case 'FETCH_DRINKS_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function Drinks() {
  const [{ loading, drinks, error }, dispatch] = useReducer(reducer, {
    loading: true,
    drinks: [],
    error: '',
  });

  useEffect(() => {
    const fetchDrinks = async () => {
      dispatch({ type: 'FETCH_DRINKS_REQUEST' });
      try {
        const result = await axios.get('/api/drinks');
        dispatch({
          type: 'FETCH_DRINKS_SUCCESS',
          payload: result.data.drinksItems,
        });
      } catch (error) {
        dispatch({ type: 'FETCH_DRINKS_FAIL', payload: fetchError(error) });
      }
    };
    fetchDrinks();
  }, []);
  return (
    <div>
      <div className="food">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          drinks.map((item) => <Item item={item} key={item.slug}></Item>)
        )}
      </div>
    </div>
  );
}
