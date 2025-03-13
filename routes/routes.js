
const express = require('express');
const app = express();
const router = express.Router();
const {home} = require("../controllers/controllers.js");

router.route("/").get(home);

module.exports = router;