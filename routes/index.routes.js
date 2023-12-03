const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const profileRouter = require("./profile.routes");
router.use("/profile", profileRouter);

const uploadRouter = require("./upload.routes");
router.use("/upload", uploadRouter);

const movieRouter = require("./movie.routes");
router.use("/movie", movieRouter);

module.exports = router;
