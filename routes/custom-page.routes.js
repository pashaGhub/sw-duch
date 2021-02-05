const { Router } = require("express");
const config = require("config");
const auth = require("../middleware/auth.middleware");
const CustomPage = require("../models/CustomPage");
const router = Router();

// /api/custom-page
router.post("/", auth, async (req, res) => {
  try {
    const newPage = new CustomPage({ ...req.body });

    await newPage.save();
    res.status(201).json({ message: "Page successfully created!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in create custom page" });
  }
});

// /api/custom-page
router.get("/", auth, async (req, res) => {
  try {
    const type = req.query.type;
    const page = parseInt(req.query.page);
    const query = req.query.query;
    const limit = 10;
    let quantityOfPages = 0;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let regex = new RegExp(query, "i");

    const results = {};

    if (type !== "all") {
      results.pages = await CustomPage.find({ type, title: { $regex: regex } })
        .limit(limit)
        .skip(startIndex)
        .exec();

      quantityOfPages = await CustomPage.find({
        type,
        title: { $regex: regex },
      })
        .countDocuments()
        .exec();
    } else {
      results.pages = await CustomPage.find({ title: { $regex: regex } })
        .limit(limit)
        .skip(startIndex)
        .exec();
      quantityOfPages = await CustomPage.find({ title: { $regex: regex } })
        .countDocuments()
        .exec();
    }

    if (endIndex < quantityOfPages) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    res.json(results);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong in register" });
  }
});

// /api/custom-page/:id - update page
router.post("/:id", auth, async (req, res) => {
  try {
    await CustomPage.findByIdAndUpdate(req.params.id, { ...req.body });
    res.status(200).json({ message: "Page successfully updated!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in update custom page" });
  }
});

// /api/custom-page/:id - delete page
router.delete("/:id", auth, async (req, res) => {
  try {
    await CustomPage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Page successfully deleted!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong in delete custom page" });
  }
});

module.exports = router;
