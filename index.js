require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./models";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/auth";
import auth from "./routes/auth";
import passport from "passport";

const app = express();

//global variables
const port = process.env.PORT;
export const URL = `http://localhost:${port}`;

// middleware
app.use("*", cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", auth);

connectDB();

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.send({ token: req.user.token });
  }
);

app.get("/", authenticate ,(req, res) => res.send("hello"));

app.get("/test", (req, res) => res.send("Hello Test"));
app.get("/me", authenticate, (req, res) => res.send(req.user));

//error handler middleware
app.use(errorHandler);

//start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
