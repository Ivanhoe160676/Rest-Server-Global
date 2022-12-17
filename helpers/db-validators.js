const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`The role ${role} is not registered in the DB`);
  }
};

// Verificar si el email existe
const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`The email: ${email} is already registered`);
  }
};
// Verificar si el ID existe
const userByIdExist = async ( id ) => {
  const userExist = await User.findById( id );
  if ( !userExist ) {
    throw new Error(`The ID: ${ id } not exist`);
  }
};

module.exports = {
  isValidRole,
  emailExist,
  userByIdExist,
};
