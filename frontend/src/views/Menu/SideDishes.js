import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Item from '../../components/Item';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import { fetchError } from '../../utils.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SIDEDISHES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SIDEDISHES_SUCCESS':
      return { ...state, loading: false, sideDishes: action.payload };
    case 'FETCH_SIDEDISHES_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SideDishes() {
  const [{ loading, sideDishes, error }, dispatch] = useReducer(reducer, {
    loading: true,
    sideDishes: [],
    error: '',
  });
  useEffect(() => {
    const fetchSideDishes = async () => {
      dispatch({ type: 'FETCH_SIDEDISHES_REQUEST' });
      try {
        const result = await axios.get('/api/sideDishes');
        dispatch({
          type: 'FETCH_SIDEDISHES_SUCCESS',
          payload: result.data.sideDishesItems,
        });
      } catch (error) {
        dispatch({ type: 'FETCH_SIDEDISHES_FAIL', payload: fetchError(error) });
      }
    };
    fetchSideDishes();
  }, []);
  return (
    <div>
      <div className="food">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          sideDishes.map((item) => <Item item={item} key={item.slug}></Item>)
        )}
      </div>
    </div>
  );
}
