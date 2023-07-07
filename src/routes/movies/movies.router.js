const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const services = require("./movies.services");

router.route("/").get(controller.list);

module.exports = router;
