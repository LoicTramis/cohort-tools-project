const students = require("../students.json");
const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json(students);
});

module.exports = router;
