const { Router } = require("express");
const { Types } = require("mongoose");
const auth = require("../middleware/auth.middleware");
const Events = require("../models/Events");
const CustomPage = require("../models/CustomPage");
const router = Router();

// /api/events/:id
router.post("/:id", auth, async (req, res) => {
  try {
    const newEvents = new Events({ _id: req.params.id });

    await newEvents.save();
    res.status(201).json({ message: "Events updated!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong in events route" });
  }
});

// /api/events/
router.get("/", async (req, res) => {
  try {
    const events = await Events.find();
    const queryArr = events.map((item) => Types.ObjectId(item._id));
    const pages = await CustomPage.find({ _id: { $in: queryArr } });

    res.status(201).json({ pages });
  } catch (error) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong in events route" });
  }
});

// /api/events/:id - delete page
router.delete("/:id", auth, async (req, res) => {
  try {
    await Events.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event successfully deleted!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong in delete events" });
  }
});

module.exports = router;
