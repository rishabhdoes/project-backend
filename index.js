const express = require("express");
const app = express();
const db = require("./db");
const { PORT, CLIENT_URL } = require("./config");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

require("./middleware/passport-middleware");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

const publicRoutes = require("./routes/publicRoutes");
const secureRoutes=require('./routes/secureRoutes')




app.use("/public/api", publicRoutes);
app.use("/secure/api",secureRoutes);

app.get("/", async (req, res) => {
  const results = await db.query("select * from users");
  console.log(results);
  res.send("hi");
});

app.listen(PORT, () => {
  console.log("listening on port 5000");
});
