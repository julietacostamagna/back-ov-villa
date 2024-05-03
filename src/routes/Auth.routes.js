const express = require("express");
const router = express.Router();
const AuthService = require("../services/AuthService");

router.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;
    const email = { email: mail };
    const token = await AuthService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
