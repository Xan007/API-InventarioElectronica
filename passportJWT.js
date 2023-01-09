//Configurar la estrategia para passport
import dotenv from "dotenv"
dotenv.config()

import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import User from "./models/User.js"

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SECRET
}

const strategy = new JwtStrategy(opts, async(jwt_payload, done) => {
    await User.findOne({ _id: jwt_payload.sub })
        .then(user => done(null, user ? user : false))
        .catch(err => done(err, false))
})

passport.use(strategy)