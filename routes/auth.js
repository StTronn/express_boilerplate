import { Router } from "express"; // Express web server framework
import User from "../models/user";
const router = Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next({
      message: "Please Provide email and password",
      statusCode: 400,
    });

  const user = await User.findOne({ email });
  const match = user ? await user.checkPassword(password) : false;
  if (!user || !match) {
    return next({
      message: "The email and password don't match",
      statusCode: 400,
    });
  }

  const token = user.getJwtToken();
  res.status(200).json({ success: true, token });
});

router.post("/register", async (req, res, next) => {
  try {
    const { fullname, username, password, email } = req.body;
    const user = User({ fullname, username, password, email });

    user.save((err) => {
      if (err) next(err);
      else {
        const token = user.getJwtToken();

        res.status(200).json({ success: true, token });
      }
    });
  } catch (err) {
    next({ statusCode: 400, message: "something went wrong" });
  }
});

export default router;
