import jwt from "jsonwebtoken";
import passport from "passport";

//Short para passport.authenticate
export const authenticate = passport.authenticate("jwt", { session: false });

//Hacer token, establecerlo en el header
export const signToken = (id) => {
  const token = jwt.sign({ sub: id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const userHasRole = (user, ...roles) => {
  return roles.some((role) => user.roles.includes(role));
};

//Auto authenticate
export const checkRole = (...roles) => {
  return [authenticate, async function (req, res, next) {
    const hasPermission = userHasRole(req.user, ...roles);
    if (hasPermission) return next();

    res.status(403).send(`Endpoint only for: ${roles.join(", ")}`);
  }]
};
