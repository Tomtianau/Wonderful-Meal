import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Store } from '../Store.js';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import GooglePayButton from '@google-pay/button-react';
import { fetchError } from '../utils.js';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_ORDERDETAIL_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_ORDERDETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        error: '',
        orderdetail: action.payload,
      };
    case 'FETCH_ORDERDETAIL_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function GooglePayOrderDetails() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { customerInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const [{ loading, error, orderdetail }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orderdetail: {},
  });

  useEffect(() => {
    const fetchOrderdetail = async () => {
      try {
        dispatch({ type: 'FETCH_ORDERDETAIL_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${customerInfo.token}` },
        });
        dispatch({ type: 'FETCH_ORDERDETAIL_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_ORDERDETAIL_FAIL',
          payload: fetchError(error),
        });
      }
    };
    if (!customerInfo) {
      navigate('/signin');
    }
    if (!orderdetail._id || (orderdetail._id && orderdetail._id !== orderId)) {
      fetchOrderdetail();
    }
  }, [customerInfo, navigate, orderId, orderdetail._id]);

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Message severity="error">{error}</Message>
  ) : (
    <div>
      <Helmet>
        <title>Order Detail</title>
      </Helmet>
      <Typography variant="h4" gutterBottom mb={6}>
        Order {orderId}
      </Typography>
      <Grid container spacing={4}>
        {orderdetail.foodItems.map((item) => (
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
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment
              </Typography>
              <Typography mb={1}>
                Option:&nbsp;&nbsp;&nbsp;{orderdetail.paymentOption}
              </Typography>
              {orderdetail.isPaid ? (
                <Message severity="success">
                  The order is paid at {orderdetail.paidTime}
                </Message>
              ) : (
                <Message severity="error">
                  The order is not paid, please pay your order!
                </Message>
              )}
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
                Order Summary
              </Typography>
              <Typography mb={2} mt={1}>
                Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {orderdetail.itemsTotal}
              </Typography>
              <Divider />
              <Typography mb={2} mt={1}>
                GST:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {orderdetail.gst}
              </Typography>
              <Divider />
              <Typography mt={1}>
                Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {orderdetail.totalPrice}
              </Typography>
            </CardContent>
            <CardActions>
              {!orderdetail.isPaid && (
                <Stack ml={6}>
                  <GooglePayButton
                    environment="TEST"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: 'CARD',
                          parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                          },
                          tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                              gateway: 'example',
                              gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                          },
                        },
                      ],
                      merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Demo Merchant',
                      },
                      transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: `${orderdetail.totalPrice}`,
                        currencyCode: 'AUD',
                        countryCode: 'AU',
                      },
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                      console.log('load payment data', paymentRequest);
                    }}
                    buttonColor="default"
                    buttonType="Buy"
                  />
                </Stack>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
