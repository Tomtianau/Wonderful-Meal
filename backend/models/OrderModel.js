import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    foodItems: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        count: { type: Number, required: true },

        maincourse: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MainCourse',
        },
        sidedishes: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SideDishes',
        },
        drinks: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Drinks',
        },
      },
    ],

    pickupInfomation: {
      name: String,
      address: String,
    },
    deliveryInfomation: {
      firstName: String,
      lastName: String,
      street: String,
      suburb: String,
      state: String,
      postcode: Number,
      country: String,
      phone: Number,
    },
    paymentOption: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: String,
      email: String,
      status: String,
      updateTime: String,
    },
    itemsTotal: { type: Number, required: true },
    gst: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    isPaid: { type: Boolean, default: false },
    paidTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
