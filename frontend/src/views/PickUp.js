import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { fetchError } from '../utils.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RESTAURANTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_RESTAURANTS_SUCCESS':
      return { ...state, loading: false, restaurants: action.payload };
    case 'FETCH_RESTAURANTS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function PickUp() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { customerInfo } = state;
  const [{ loading, restaurants, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    restaurants: [],
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      dispatch({ type: 'FETCH_RESTAURANTS_REQUEST' });
      try {
        const result = await axios.get('/api/pickUp');
        dispatch({
          type: 'FETCH_RESTAURANTS_SUCCESS',
          payload: result.data.restaurantsList,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_RESTAURANTS_FAIL',
          payload: fetchError(error),
        });
      }
    };
    fetchRestaurants();
    if (!customerInfo) {
      navigate('/signin');
    }
  }, [customerInfo, navigate]);

  return (
    <div>
      <Helmet>
        <title>Pick Up</title>
      </Helmet>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }} mb={6}>
        Please select a restaurant in your area
      </Typography>
      <Grid container direction="column" spacing={4}>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          restaurants.map((item) => (
            <Grid item key={item.name}>
              <Card>
                <CardContent>
                  <Typography ml={7}>{item.name}</Typography>
                  <Typography ml={7}>{item.orderType}</Typography>
                </CardContent>
                <CardActions>
                  <Stack mt={1} mb={1} ml={7}>
                    <Link
                      to={`/restaurants/${item.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="contained" color="error">
                        Select this restaurant
                      </Button>
                    </Link>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
