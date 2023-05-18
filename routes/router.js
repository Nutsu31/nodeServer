const express = require("express");
const router = new express.Router();
const cors = require("cors");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");

router.use(cors());

router.get("/exam", async (req, res) => {
  try {
    res.status(200).json({ status: 200, exam: "asdadsdasdasd" });
  } catch (err) {
    res.status(401).json({ status: 401 });
  }
});

// user register request

router.post("/join-us", async (req, res) => {
  const { name } = await req.body;
  const { lastname } = await req.body;
  const { email } = await req.body;
  const { password } = await req.body;
  const { re_password } = await req.body;
  const { developer } = await req.body;
  const { isAdmin } = await req.body;

  try {
    const doesUserExist = await userModel.find();
    console.log(doesUserExist);
    for (let i = 0; i < doesUserExist.length; i++) {
      if (doesUserExist[i].email === email) {
        return res
          .status(401)
          .json({ status: 401, user: "ასეთი მომხამრებელი უკვე არსებობს" });
      }
    }
    const userData = new userModel({
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      re_password: re_password,
      developer: developer,
      isAdmin: isAdmin,
    });
    const user = await userData.save();
    res
      .status(200)
      .json({ status: 200, user: "თქვენ წარმატებით გაიარეთ რეგისტრაცია" });
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(401)
        .json({ status: 401, user: "ასეთი მომხმარებელი არ არსებობს!" });
    }

    if (user.email === email && user.password !== password) {
      return res.status(401).json({ status: 401, user: "პაროლი არასწორია" });
    }

    res.status(200).json({ status: 200, user, isAdmin: user.isAdmin });
    console.log(user);
  } catch (error) {
    res.status(400).json({ status: 400, user: error });
  }
});

router.get("/admin-panel/general", async (req, res) => {
  try {
    const userList = await userModel.find({ isAdmin: true });
    res.status(200).json({ status: 200, users: userList });
  } catch (err) {
    res.status(400).json({ status: 400, users: err });
  }
});
router.get("/admin-panel/statistics", async (req, res) => {
  try {
    const userList = await userModel.find();
    res.status(200).json({ status: 200, users: userList });
  } catch (err) {
    res.status(400).json({ status: 400, users: err });
  }
});
router.get("/admin-panel/users", async (req, res) => {
  try {
    const userList = await userModel.find();
    res.status(200).json({ status: 200, users: userList });
  } catch (err) {
    res.status(400).json({ status: 400, users: err });
  }
});

module.exports = router;
