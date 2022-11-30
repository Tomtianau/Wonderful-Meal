import mongoose from 'mongoose';

const drinksSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true, unique: true },
  introduction: { type: String, required: true },
  calories: { type: String, required: true },
});

const Drinks = mongoose.model('Drinks', drinksSchema);
export default Drinks;
