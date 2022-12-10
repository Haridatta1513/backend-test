const users = require("../model/form.js");

exports.register = async (req, res) => {
  try {
    //validations
    if (!req.body.name)
      return res.status(400).send({ message: "please enter name" });
    if (!req.body.mobile)
      return res.status(400).send({ message: "please enter phone number" });
    if (!req.body.email)
      return res.status(400).send({ message: "please enter email" });
    if (!req.body.password)
      return res.status(400).send({ message: "please enter businessname" });
    if (!req.body.address)
      return res.status(400).send({ message: "please enter pan" });
    // check if user already exist
    const mobile = req.body.mobile;
    const oldUser = await users.findOne({ mobile });
    if (oldUser) {
      return res.status(400).json({ mes: "User Already Exist. Please Login" });
    } else {
      const user = new users({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        address: req.body.address,
      });
      var save = user.save();
      if (save) {
        // return new user
        return res.json({ message: "success" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { mobile, password } = req.body;
    // Validate user input
    if (!mobile) {
      return res.status(400).json({ msg: "Mobile number is required" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }
    // Validate if user exist in our database
    await users
      .findOne({ mobile: req.body.mobile, password: req.body.password })
      .then((user) => {
        //if user not exist than return status 400
        if (!user) {
          return res.status(400).json({ msg: "User not exist" });
        }
        //if user exist than return user
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(401).json({ msg: "Invalid credencial" });
        }
      });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.profile = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ mes: "Id is required" });
    }
    const profile = await users.findOne({ _id: req.params.id });
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(400).json({ message: "Internal Error" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
