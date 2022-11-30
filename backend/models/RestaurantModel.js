import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  orderType: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  hours: { type: String, required: true },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
