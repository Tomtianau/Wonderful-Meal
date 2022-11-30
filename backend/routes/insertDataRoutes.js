import express from 'express';
import MainCourse from '../models/MainCourseModel.js';
import SideDishes from '../models/SideDishesModel.js';
import Drinks from '../models/DrinksModel.js';
import User from '../models/UserModel.js';
import Restaurant from '../models/RestaurantModel.js';
import data from '../data.js';

const insertDataRouter = express.Router();

insertDataRouter.get('/', async (req, res) => {
  await MainCourse.remove({});
  const createdMainCourse = await MainCourse.insertMany(data.mainCourse);
  await SideDishes.remove({});
  const createdSideDishes = await SideDishes.insertMany(data.sideDishes);
  await Drinks.remove({});
  const createdDrinks = await Drinks.insertMany(data.drinks);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  await Restaurant.remove({});
  const createdRestaurants = await Restaurant.insertMany(data.restaurants);

  res.send({
    createdMainCourse,
    createdSideDishes,
    createdDrinks,
    createdUsers,
    createdRestaurants,
  });
});
export default insertDataRouter;
