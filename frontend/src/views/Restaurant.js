import React, { useContext, useEffect, useReducer } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchError } from '../utils';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RESTAURANT_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_RESTAURANT_SUCCESS':
      return { ...state, loading: false, restaurant: action.payload };
    case 'FETCH_RESTAURANT_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Restaurant() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { customerInfo } = state;
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();
  const [{ loading, restaurant, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    restaurant: {},
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      dispatch({ type: 'FETCH_RESTAURANT_REQUEST' });
      try {
        const result = await axios.get(`/api/restaurants/${slug}`);
        dispatch({ type: 'FETCH_RESTAURANT_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_RESTAURANT_FAIL', payload: fetchError(error) });
      }
    };
    fetchRestaurant();
    if (!customerInfo) {
      navigate('/signin');
    }
  }, [customerInfo, navigate, slug]);
  const backToMenu = () => {
    navigate('/');
  };
  const backToRestaurants = () => {
    navigate('/pickup');
  };
  const handleSelect = () => {
    contextDispatch({ type: 'SAVE_SELECTED_RESTAURANT', payload: restaurant });
    navigate('/payment');
  };
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={backToMenu}
    >
      Menu
    </Link>,
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/pickup"
      onClick={backToRestaurants}
    >
      Restaurants
    </Link>,
    <Typography key="3" color="text.primary">
      {restaurant.name}
    </Typography>,
  ];
  return loading ? (
    <Loading />
  ) : error ? (
    <Message severity="error">{error}</Message>
  ) : (
    <div>
      <Helmet>
        <title>Restaurant</title>
      </Helmet>
      <Stack spacing={2} mb={12} mt={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom ml={7} mb={2} mt={4}>
            {restaurant.name}
          </Typography>
          <Typography variant="h5" gutterBottom ml={7} mb={2}>
            {restaurant.orderType}
          </Typography>
          <Typography variant="h5" gutterBottom ml={7} mb={2}>
            Address: {restaurant.address}
          </Typography>
          <Typography variant="h5" gutterBottom ml={7} mb={4}>
            Opening Hours: {restaurant.hours}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack mt={1} mb={4} ml={7}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              ml={7}
              onClick={handleSelect}
            >
              Select {restaurant.name}
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
