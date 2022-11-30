import express from 'express';
import User from '../models/UserModel.js';
import { AuthenticateCustomer, generateToken } from '../utils.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid username or password!' });
});

userRouter.post('/signup', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    email: req.body.email,
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: generateToken(user),
  });
});

userRouter.put('/editinfo', AuthenticateCustomer, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.password = bcrypt.hashSync(req.body.password) || user.password;
    const editedUser = await user.save();
    res.send({
      _id: editedUser._id,
      name: editedUser.name,
      email: editedUser.email,
      username: editedUser.username,
      token: generateToken(editedUser),
    });
  } else {
    res.status(404).send({ message: 'The user does not exist!' });
  }
});

export default userRouter;
