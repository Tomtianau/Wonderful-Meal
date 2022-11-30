import express from 'express';
import Order from '../models/OrderModel.js';
import { AuthenticateCustomer } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post('/', AuthenticateCustomer, async (req, res) => {
  const newOrder = new Order({
    foodItems: req.body.foodItems.map((x) => ({
      ...x,
      fooditem: x._id,
    })),
    pickupInfomation: req.body.pickupInfomation,
    deliveryInfomation: req.body.deliveryInfomation,
    paymentOption: req.body.paymentOption,
    itemsTotal: req.body.itemsTotal,
    gst: req.body.gst,
    totalPrice: req.body.totalPrice,
    customer: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created Successfully!', order });
});

orderRouter.get('/:id', AuthenticateCustomer, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order does not exist!' });
  }
});

orderRouter.put('/:id/pay', AuthenticateCustomer, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidTime = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.update_time,
      email: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: 'Order is Paid', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'The Order Was Not Found!' });
  }
});

export default orderRouter;
