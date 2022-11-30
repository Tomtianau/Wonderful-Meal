import express from 'express';
import Restaurant from '../models/RestaurantModel.js';

const pickUpRouter = express.Router();

pickUpRouter.get('/', async (req, res) => {
  const restaurantsList = await Restaurant.find();
  res.send({ restaurantsList });
});

export default pickUpRouter;
