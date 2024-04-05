const express = require("express");
const URL = require("../models/url.model");
const { restrictTo } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ });
  return res.render("home", {
    urls: allurls,
  })
});

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup"); // Rendering signup.ejs when accessing /signup
});
router.get("/login", (req, res) => {
  return res.render("login"); // Rendering signup.ejs when accessing /signup
});


module.exports = router;
