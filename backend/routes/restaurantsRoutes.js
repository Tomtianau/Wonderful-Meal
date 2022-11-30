import express from 'express';
import Restaurant from '../models/RestaurantModel.js';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/:slug', async (req, res) => {
  const restaurantResult = await Restaurant.findOne({ slug: req.params.slug });
  if (restaurantResult) {
    res.send(restaurantResult);
  } else {
    res.status(404).send({ message: 'No restaurants found' });
  }
});

export default restaurantsRouter;
