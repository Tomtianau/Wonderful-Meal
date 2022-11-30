import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { fetchError } from '../utils.js';
import { Store } from '../Store.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_FOODITEM_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_FOODITEM_SUCCESS':
      return { ...state, loading: false, foodItem: action.payload };
    case 'FETCH_FOODITEM_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function FoodItem() {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();
  const [{ loading, foodItem, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    foodItem: [],
  });

  useEffect(() => {
    const fetchFoodItem = async () => {
      dispatch({ type: 'FETCH_FOODITEM_REQUEST' });
      try {
        const result = await axios.get(`/api/foodItems/${slug}`);
        dispatch({ type: 'FETCH_FOODITEM_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FOODITEM_FAIL', payload: fetchError(error) });
      }
    };
    fetchFoodItem();
  }, [slug]);
  const backToMenu = () => {
    navigate('/');
  };
  const backToCategory = () => {
    navigate(`/menu/${foodItem.category}`);
  };
  const handleBack = () => {
    navigate(`/menu/${foodItem.category}`);
  };
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { foodCart } = state;
  const handleOrderItem = () => {
    const orderedItem = foodCart.foodItems.find(
      (item) => item._id === foodItem._id
    );
    const count = orderedItem ? orderedItem.count + 1 : 1;
    contextDispatch({
      type: 'ORDER_FOOD',
      payload: { ...foodItem, count },
    });
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
      key="2"
      color="inherit"
      href={`/menu/${foodItem.category}`}
      onClick={backToCategory}
    >
      {foodItem.category}
    </Link>,
    <Typography key="3" color="text.primary">
      {foodItem.name}
    </Typography>,
  ];

  return loading ? (
    <Loading />
  ) : error ? (
    <Message severity="error">{error}</Message>
  ) : (
    <div>
      <Stack spacing={2} mb={4}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={7} sm={7} md={7} lg={7}>
          <img
            className="large-img"
            src={foodItem.image}
            alt={foodItem.name}
          ></img>
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5}>
          <Helmet>
            <title>{foodItem.name}</title>
          </Helmet>
          <Typography variant="h4" gutterBottom ml={2} mb={4}>
            {foodItem.name}
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Basic Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{foodItem.introduction}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Nutrition Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{foodItem.weight}</Typography>
              <Divider />
              <Typography>{foodItem.protein}</Typography>
              <Divider />
              <Typography>{foodItem.fat}</Typography>
              <Divider />
              <Typography>{foodItem.carbohydrate}</Typography>
              <Divider />
              <Typography>{foodItem.Na}</Typography>
              <Typography>{foodItem.calories}</Typography>
            </AccordionDetails>
          </Accordion>
          <Stack spacing={2} mt={8} direction="column">
            <Button variant="contained" color="error" onClick={handleOrderItem}>
              Order this item
            </Button>
            <Button variant="outlined" color="error" onClick={handleBack}>
              Back to {foodItem.category}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
