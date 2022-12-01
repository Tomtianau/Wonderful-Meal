import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import mainCourseRouter from './routes/mainCourseRoutes.js';
import sideDishesRouter from './routes/sideDishesRoutes.js';
import drinksRouter from './routes/drinksRoutes.js';
import foodItemRouter from './routes/foodItemRoutes.js';
import insertDataRouter from './routes/insertDataRoutes.js';
import userRouter from './routes/userRoutes.js';
import pickUpRouter from './routes/pickUpRoutes.js';
import restaurantsRouter from './routes/restaurantsRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.use('/api/mainCourse', mainCourseRouter);
app.use('/api/sideDishes', sideDishesRouter);
app.use('/api/drinks', drinksRouter);
app.use('/api/foodItems', foodItemRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/insertData', insertDataRouter);
app.use('/api/users', userRouter);
app.use('/api/pickUp', pickUpRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
