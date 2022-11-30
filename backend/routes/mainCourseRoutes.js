import express from 'express';
import MainCourse from '../models/MainCourseModel.js';

const mainCourseRouter = express.Router();

mainCourseRouter.get('/', async (req, res) => {
  const mainCourseItems = await MainCourse.find();
  res.send({ mainCourseItems });
});

export default mainCourseRouter;
