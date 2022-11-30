import express from 'express';
import SideDishes from '../models/SideDishesModel.js';

const sideDishesRouter = express.Router();

sideDishesRouter.get('/', async (req, res) => {
  const sideDishesItems = await SideDishes.find();
  res.send({ sideDishesItems });
});

export default sideDishesRouter;
