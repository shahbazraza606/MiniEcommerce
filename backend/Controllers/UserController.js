const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const { name, email, phonenumber, address, gender, username, password, type } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const newUser = new User({
      name,
      email,
      phonenumber,
      address,
      gender,
      username,
      password,
      type,
    });

    const savedUser = await newUser.save();

    welcomeemail(savedUser.email);

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      success: true,
      token,
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


function welcomeemail(email){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "i201761@nu.edu.pk",
            pass: process.env.pass
        } 
    });
    const mailOptions = {
        from: "MiniDraz",
        to: email,
        subject: "Welcome to MiniDraz",
        text: "Welcome to MiniDraz. We are glad to have you on board. We hope you have a great experience with us."
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Email sent to : " + email);
        }
    });


}

exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return res.status(400).json({ error: "Username is not registered" });
          }
          const isMatch = bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ error: "Password is incorrect" });
          }
  
          // Assuming you have a field named 'userType' in the User schema
          const userType = user.userType || "user"; // If userType is not set, default to "user"
  
          const token = jwt.sign({ id: user._id, userType: userType }, process.env.JWT_SECRET);
          res.status(200).json({
            success: true,
            token,
            userType: user.type, // Include the userType in the response
            message: "Welcome Welcome",
            
          });
          console.log(token);
        })
        .catch((error) => {
          res.status(500).json({ message: "No such User", error: error });
        });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error });
    }
  };
  

