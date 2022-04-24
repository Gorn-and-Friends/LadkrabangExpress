const userModel = require("../model/user.js");
const ticketModel = require("../model/ticket.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Train = require("./trainDAO.js");
const { default: mongoose } = require("mongoose");

class User {
  static async register(req, res) {
    try {
      console.log(req.body);

      const { firstname, lastname, email, username, password } = req.body;

      if (!(firstname && lastname && email && username && password)) {
        res.status(400).send("All input required");
      }

      const oldUser = await userModel.findOne({ email });
      const oldUsername = await userModel.findOne({ username });

      if (oldUser || oldUsername) {
        return res.status(409).send("User existed");
      }
      const encrytedPassword = await bcrypt.hash(password, 10);

      const user = new userModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: encrytedPassword,
      });

      const token = jsonwebtoken.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2d" }
      );

      user.token = token;
      user.save();

      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  static async login(req, res) {
    try {
      // console.log(req.body)
      const { username, password } = req.body;

      if (!(username && password)) {
        res.status(400).send("All input required");
      }

      //check is user input username or email
      let user = Object;
      if (username.includes("@")) {
        user = await userModel.findOne({ email: username });
      } else {
        user = await userModel.findOne({ username: username });
      }

      if (user === null) {
        res.status(400).send("username not found");
        return;
      }

      const email = user.email;
      // console.log("cat : " + email)
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jsonwebtoken.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2d",
          }
        );
        user.token = token;
        res.status(200).json(user);
        // res.status(200).send(token)
      } else {
        res.status(400).send("Invalid login");
      }
    } catch (err) {
      console.log(err);
      res.send("error in backend");
    }
  }

  static verifyTokenGetUserID(token) {
    try {
      const decoded = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
      // console.log(decoded)
      return decoded.user_id;
    } catch (err) {
      return false;
      console.log(err);
    }
  }

  static async showUserProfile(req, res) {
    try {
      // front ส่ง token เราเอา token มาหา id
      const userID = await User.verifyTokenGetUserID(req.body.token);
      // console.log(typeof(userID))
      // console.log(userID)
      const objUserID = mongoose.Types.ObjectId(userID);

      // foundTicket => array of document ทุก documenyt ที่มี id ตรงกับ ที่ login เข้ามา
      const foundTicket = await ticketModel.find({ user_id: objUserID });

      let result = [];
      for (let i = 0; i < foundTicket.length; i++) {
        let de = foundTicket[i].departureTime.split(":");
        let ar = foundTicket[i].arrivalTime.split(":");
        let duration = Train.calculateTravelDuration(
          Number(de[0]),
          Number(de[1]),
          Number(ar[0]),
          Number(ar[1])
        );

        const temp = foundTicket[i].toObject();
        temp.duration = duration;
        result.push(temp);
      }

      res.send(result);
    } catch (err) {
      console.log(err);
      res.send("Error from back");
    }
  }
}

module.exports = User;
