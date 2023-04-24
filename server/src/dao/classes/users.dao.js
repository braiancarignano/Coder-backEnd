const modelUser = require("../models/users.js");

class User {
  searchUser = async (username) => {
    try {
      const user = await modelUser.findOne({ email: username });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  searchUserById = async (id) => {
    try {
      const user = await modelUser.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  createUser = async (newUser) => {
    try {
      const user = await modelUser.create(newUser);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

module.exports = User;
