import express from 'express';
import Drinks from '../models/DrinksModel.js';

const drinksRouter = express.Router();

drinksRouter.get('/', async (req, res) => {
  const drinksItems = await Drinks.find();
  res.send({ drinksItems });
});
export default drinksRouter;
