//Configurar la estrategia para passport

import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import User from "./models/User.js"


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "a"
}

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.sub}, (err, user) => {
        if (err)
            return done(err, false)

        return done(null, user ? user : false)
    })
})

passport.use(strategy)