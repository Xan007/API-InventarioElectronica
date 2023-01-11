import { Router } from "express";
import { validateRegister, validateLogin } from "../validators/users.js";
import User from "../models/User.js";
import { signToken, authenticate, checkRole } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  res.send("Bienvenido a InventarioElectronica");
});

router.post("/login", validateLogin, async (req, res) => {
  const { name, email, password } = req.body;

  let user = null;

  if (name) {
    user = await User.findOne({ name: name });
  } else if (email) {
    user = await User.findOne({ email: email });
  }

  if (!user)
    return res
      .status(404)
      .send("Couldn't find a user that match with name or email");

  const passwordValid = await user.validatePassword(password);
  if (!passwordValid) return res.status(401).send("Password is not valid");

  const token = signToken(user._id);

  res.set("Authorization", `JWT ${token}`);
  res.send({
    user: user.safeReturn(),
    token: token,
  });
});

router.post("/register", validateRegister, async (req, res) => {
  const { name, email, password } = req.body;

  let createdUser = new User({
    name: name,
    email: email,
    password: password,
  });
  await createdUser.encryptPassword();

  try {
    await createdUser.save();
    createdUser = createdUser.toObject();
    delete createdUser.password;
    delete createdUser.__v;

    const token = signToken(createdUser._id);

    res.set("Authorization", `JWT ${token}`);
    res.send({
      user: createdUser.safeReturn(),
      token: token,
    });
  } catch (err) {
    res.status(400).send(`Sucedio un error: ${err}`);
  }
});

export default { router: router, endpoint: "/" };
