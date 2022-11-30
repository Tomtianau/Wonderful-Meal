import express from 'express';
import Drinks from '../models/DrinksModel.js';
import MainCourse from '../models/MainCourseModel.js';
import SideDishes from '../models/SideDishesModel.js';

const foodItemRouter = express.Router();

foodItemRouter.get('/:slug', async (req, res) => {
  const mainCourseResult = await MainCourse.findOne({ slug: req.params.slug });
  const sideDishesResult = await SideDishes.findOne({ slug: req.params.slug });
  const drinksResult = await Drinks.findOne({ slug: req.params.slug });
  if (mainCourseResult) {
    res.send(mainCourseResult);
  } else if (sideDishesResult) {
    res.send(sideDishesResult);
  } else if (drinksResult) {
    res.send(drinksResult);
  } else {
    res.status(404).send({ message: 'No items found' });
  }
});

export default foodItemRouter;
