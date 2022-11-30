import React from 'react';
import { Helmet } from 'react-helmet-async';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useNavigate } from 'react-router-dom';

export default function OrderType() {
  const navigate = useNavigate();
  const handlePickUp = () => {
    navigate('/pickup');
  };
  const handleDelivery = () => {
    navigate('/delivery');
  };
  return (
    <div>
      <Helmet>
        <title>Order Type</title>
      </Helmet>
      <Card sx={{ width: 1120 }}>
        <CardMedia
          component="img"
          height="313"
          image="/images/ordertype-img.png"
          alt="ordertype image"
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 24 }}
            color="text.secondary"
            gutterBottom
            ml={27}
            mt={7}
          >
            Dear customer, how would you like to receive your order?
          </Typography>
        </CardContent>
        <CardActions>
          <Stack ml={42} spacing={4} mt={4} mb={6}>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<DeliveryDiningIcon />}
              sx={{ width: 400 }}
              onClick={handleDelivery}
            >
              Delivery
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<FastfoodIcon />}
              sx={{ width: 400 }}
              onClick={handlePickUp}
            >
              Pick Up
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
