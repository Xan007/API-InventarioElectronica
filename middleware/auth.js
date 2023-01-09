import jwt from "jsonwebtoken";
import passport from "passport";

//Short para passport.authenticate
export const authenticate = passport.authenticate("jwt", {session: false})

//Hacer token, establecerlo en el header
export const signToken = (id) => {
    const token = jwt.sign({sub: id}, process.env.SECRET, {
        "expiresIn": "1d"
    })

    return token
}