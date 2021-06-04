const { Router } = require("express");
const { Types } = require("mongoose");
const auth = require("../middleware/auth.middleware");
const CurrentNews = require("../models/CurrentNews");
const CustomPage = require("../models/CustomPage");
const router = Router();

// /api/current-news/:id
router.post("/:id", auth, async (req, res) => {
  try {
    const newCurrent = new CurrentNews({ _id: req.params.id });

    await newCurrent.save();
    res.status(201).json({ message: "Current news updated!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in current news route" });
  }
});

// /api/current-news/
router.get("/", async (req, res) => {
  try {
    const currentNews = await CurrentNews.find();
    const queryArr = currentNews.map((item) => Types.ObjectId(item._id));
    const pages = await CustomPage.find({ _id: { $in: queryArr } });

    res.status(201).json({ pages });
  } catch (error) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in current news route" });
  }
});

// /api/current-news/:id - delete page
router.delete("/:id", auth, async (req, res) => {
  try {
    await CurrentNews.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Current new successfully deleted!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in delete current news" });
  }
});

module.exports = router;
