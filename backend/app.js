let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  dbConfig = require("./database/db");


global.__basedir = __dirname;
var indexRouter = require("./routes/index");
var catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site
var userRouter = require("./routes/user");

// Connecting with mongo db
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database sucessfully connected!"))
  .catch(() => console.log("Database could not connected !"));

const app = express();
app.use(express.json());

//Manage CORS for data
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Static directory path
app.use(express.static(path.join(__dirname, "dist/local-library")));
app.use('/images', express.static(path.join(__dirname, 'images')));

//API root
app.use("/", indexRouter);
app.use("/api/auth", userRouter);
app.use("/api/catalog", catalogRouter);

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/local-library/index.html"));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
