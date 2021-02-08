const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/custom-page", require("./routes/custom-page.routes"));
app.use("/api/uploads", require("./routes/uploads.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "front", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log(`Server error ${e.message}`);
    process.exit(1);
  }
};

start();
