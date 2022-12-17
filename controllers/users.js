const { response, request } = require("express");
const bcryptjs = require("bcryptjs"); //')
const User = require("../models/user");

//User Get
const usersGet = async (req = request, res = response) => {
  
  const { limit = 5, from = 0 } = req.query;

  const query = { status: true };
  
  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query ).skip(Number(from)).limit(Number(limit))
  ])

  res.json({
   total,
   users
  });
};
//User Post
const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar el password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);
  // Guardar ne DB

  await user.save();

  res.json({
    user,
  });
};
//User Put
const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encriptar el password
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);
  res.json(user);
};
//User Patch
const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - Controller",
  });
};
//User Delete
const usersDelete = async(req, res = response) => {

  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
