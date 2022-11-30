import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store.js';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';

export default function FoodCart() {
  const { state, dispatch } = useContext(Store);
  const {
    foodCart: { foodItems },
  } = state;
  const navigate = useNavigate();
  const changeItemCount = async (item, count) => {
    dispatch({
      type: 'ORDER_FOOD',
      payload: { ...item, count },
    });
  };
  const handleDeleteItem = (item) => {
    dispatch({
      type: 'DELETE_FOOD',
      payload: item,
    });
  };
  const handleCheckout = () => {
    navigate('/signin?redirect=/ordertype');
  };
  const handleViewMenu = () => {
    navigate('/');
  };

  return (
    <div>
      <Helmet>
        <title>My Cart</title>
      </Helmet>
      <Typography variant="h3" gutterBottom mb={5}>
        My Cart
      </Typography>
      {foodItems.length === 0 ? (
        <Card sx={{ width: 1120 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 25 }}
              color="text.secondary"
              gutterBottom
              mt={3}
              mb={5}
            >
              Dear customer, your cart is empty. You can start to order your
              meal now!
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="327"
            image="/images/background-img.png"
            alt="background image"
          />
          <CardActions>
            <Stack mt={12} mb={2} ml={8}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleViewMenu}
              >
                View menu
              </Button>
            </Stack>
          </CardActions>
        </Card>
      ) : (
        <div>
          <Grid container>
            {foodItems.map((item) => (
              <Grid item key={item.name} xs={9} sm={9} md={9} lg={9}>
                <Link to={`/item/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="small-image"
                  />
                </Link>
                <Typography sx={{ display: 'inline-block', width: 240 }} ml={7}>
                  {item.name}
                </Typography>
                <Button
                  disabled={item.count === 1}
                  onClick={() => changeItemCount(item, item.count - 1)}
                >
                  <RemoveCircleOutlineIcon />
                </Button>{' '}
                <Typography sx={{ display: 'inline-block' }}>
                  {item.count}
                </Typography>{' '}
                <Button
                  disabled={item.count === 100}
                  onClick={() => changeItemCount(item, item.count + 1)}
                >
                  <AddCircleOutlineIcon />
                </Button>{' '}
                <Typography sx={{ display: 'inline-block', width: 130 }} ml={5}>
                  ${item.price}
                </Typography>{' '}
                <Button onClick={() => handleDeleteItem(item)}>
                  <DeleteForeverIcon />
                </Button>
              </Grid>
            ))}
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Card
                sx={{
                  position: 'absolute',
                  top: 233,
                  width: 300,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom mb={4}>
                    {foodItems.reduce((a, c) => a + c.count, 0)}{' '}
                    {foodItems.reduce((a, c) => a + c.count, 0) > 1
                      ? 'ITEMS'
                      : 'ITEM'}
                  </Typography>
                  <Typography mb={2}>
                    Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                    {foodItems.reduce((a, c) => a + c.price * c.count, 0)}
                  </Typography>
                  <Divider />
                  <Typography mt={1} mb={2}>
                    GST Included
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack mb={1} sx={{ width: '100%' }}>
                    <Button variant="contained" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
