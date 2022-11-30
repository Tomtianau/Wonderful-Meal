import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Item from '../../components/Item';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import { fetchError } from '../../utils.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MAINCOURSE_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MAINCOURSE_SUCCESS':
      return { ...state, loading: false, mainCourse: action.payload };
    case 'FETCH_MAINCOURSE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function MainCourse() {
  const [{ loading, mainCourse, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    mainCourse: [],
  });

  useEffect(() => {
    const fetchMainCourse = async () => {
      dispatch({ type: 'FETCH_MAINCOURSE_REQUEST' });
      try {
        const result = await axios.get('/api/mainCourse');
        dispatch({
          type: 'FETCH_MAINCOURSE_SUCCESS',
          payload: result.data.mainCourseItems,
        });
      } catch (error) {
        dispatch({ type: 'FETCH_MAINCOURSE_FAIL', payload: fetchError(error) });
      }
    };
    fetchMainCourse();
  }, []);

  return (
    <div>
      <div className="food">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          mainCourse.map((item) => <Item item={item} key={item.slug}></Item>)
        )}
      </div>
    </div>
  );
}
