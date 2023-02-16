//const path = require('path');
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/MongoDBAccess");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/course", require("./routes/courseRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/screen", require("./routes/screenRoutes"));
app.use("/api/section", require("./routes/sectionRoutes"));
app.use("api/element", require("./routes/elementRoutes"));
app.use("api/student", require("./routes/studentRoutes"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Ahoi Matrosen wir segeln zum Port Hamburg`.yellow.bold)
);
