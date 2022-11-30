import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import { fetchError } from '../utils';
import axios from 'axios';
import Loading from '../components/Loading';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_ORDER_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_ORDER_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function OrderInfomation() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    foodCart: { foodItems, paymentOption },
    pickupRestaurant,
    deliveryInfomation,
    customerInfo,
  } = state;
  const Subtotal =
    foodItems.reduce((a, c) => a + c.price * c.count, 0) -
    (foodItems.reduce((a, c) => a + c.price * c.count, 0) / 11).toFixed(2);
  const GST = (
    foodItems.reduce((a, c) => a + c.price * c.count, 0) / 11
  ).toFixed(2);
  const Total = foodItems.reduce((a, c) => a + c.price * c.count, 0);
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const handleContinue = async () => {
    try {
      dispatch({ type: 'CREATE_ORDER_REQUEST' });
      const { data } = await axios.post(
        '/api/orders',
        {
          foodItems: foodItems,
          pickupInfomation: pickupRestaurant,
          deliveryInfomation: deliveryInfomation,
          paymentOption: paymentOption,
          itemsTotal: Subtotal,
          gst: GST,
          totalPrice: Total,
        },
        {
          headers: {
            authorization: `Bearer ${customerInfo.token}`,
          },
        }
      );
      contextDispatch({ type: 'EMPTY_FOODCART' });
      dispatch({ type: 'CREATE_ORDER_SUCCESS' });
      localStorage.removeItem('foodItems');
      navigate(`/${paymentOption}/orderdetail/${data.order._id}`);
    } catch (error) {
      dispatch({ type: 'CREATE_ORDER_FAIL' });
      alert(fetchError(error));
    }
  };
  useEffect(() => {
    if (!paymentOption) {
      navigate('/payment');
    }
  }, [navigate, paymentOption]);

  return (
    <div>
      <Helmet>
        <title>Order Infomation</title>
      </Helmet>
      <Typography variant="h4" gutterBottom mb={6}>
        Order Infomation
      </Typography>
      <Grid container spacing={4}>
        {foodItems.map((item) => (
          <Grid item key={item.slug} xs={8} sm={8} md={8} lg={8}>
            <Link to={`/item/${item.slug}`}>
              <img src={item.image} alt={item.name} className="small-image" />
            </Link>
            <Typography sx={{ display: 'inline-block', width: 240 }} ml={7}>
              {item.name}
            </Typography>
            <Typography sx={{ display: 'inline-block' }} ml={7}>
              {item.count}
            </Typography>{' '}
            <Typography sx={{ display: 'inline-block', width: 130 }} ml={17}>
              ${item.price}
            </Typography>{' '}
          </Grid>
        ))}
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Card
            sx={{
              position: 'absolute',
              top: 440,
              width: 360,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom mb={3}>
                Order Summary
              </Typography>
              <Typography mb={2}>
                {foodItems.reduce((a, c) => a + c.count, 0)}{' '}
                {foodItems.reduce((a, c) => a + c.count, 0) > 1
                  ? 'ITEMS'
                  : 'ITEM'}
              </Typography>
              <Divider />
              <Typography mb={2} mt={1}>
                Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {Subtotal}
              </Typography>
              <Typography mb={2}>
                GST:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {GST}
              </Typography>

              <Divider />
              <Typography mt={1}>
                Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {Total}
              </Typography>
            </CardContent>
            <CardActions>
              <Stack mb={1} sx={{ width: '100%' }}>
                <Button variant="contained" onClick={handleContinue}>
                  Continue Ordering
                </Button>
              </Stack>
              {loading && <Loading></Loading>}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Card mb={4}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pick Up Infomation
              </Typography>

              {pickupRestaurant ? (
                <div>
                  <Typography>{pickupRestaurant.name}</Typography>
                  <Typography>{pickupRestaurant.address}</Typography>
                  <Link to="/pickup">Edit</Link>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Infomation
              </Typography>
              {deliveryInfomation ? (
                <div>
                  <Typography>
                    {deliveryInfomation.firstName} {deliveryInfomation.lastName}
                  </Typography>
                  <Typography>{deliveryInfomation.street}</Typography>
                  <Typography>
                    {deliveryInfomation.suburb} {deliveryInfomation.stateName}{' '}
                    {deliveryInfomation.postcode}
                  </Typography>
                  <Typography>{deliveryInfomation.country}</Typography>
                  <Typography>{deliveryInfomation.phone}</Typography>
                  <Link to="/delivery">Edit</Link>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Card
            sx={{
              position: 'absolute',
              top: 274,
              width: 360,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom mb={3}>
                Payment
              </Typography>
              <Typography mb={1}>
                Option:&nbsp;&nbsp;&nbsp;{paymentOption}
              </Typography>
              <Link to="/payment">Edit</Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
