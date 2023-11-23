const express = require("express");
const jwt = require("jsonwebtoken");
 
const { UserModel } = require("../modal/authModal");
const dotenv = require("dotenv");
dotenv.config();
const authRouter = express.Router();
const SCRET_KEY_TOKEN = process.env.TOKEN_SECRET_KEY 

authRouter.post("/register", async (req, res) => {
  const { name, email, password,country} = req.body;

  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    return res
      .status(400)
      .json({ message: "User already exists, please log in." });
  }
  

  const user = new UserModel({ name, email, password,country });

  await user.save();
  res.status(200).json({ message: "user registred successfully." });
});



authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "user is not exist" });
  }

   

  if (password===user.password) {
    const token = jwt.sign({ userId: user._id }, SCRET_KEY_TOKEN);
    res.status(200).json({ message: "Login successful.", token });
  } else {
    res.status(400).json({ message: "Wrong Password" });
  }
});
 

 

 
 
module.exports = { authRouter };
