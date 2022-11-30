import mongoose from 'mongoose';

const sideDishesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true, unique: true },
  introduction: { type: String, required: true },
  weight: { type: String, required: true },
  protein: { type: String, required: true },
  fat: { type: String, required: true },
  carbohydrate: { type: String, required: true },
  Na: { type: String, required: true },
});

const SideDishes = mongoose.model('SideDishes', sideDishesSchema);
export default SideDishes;
