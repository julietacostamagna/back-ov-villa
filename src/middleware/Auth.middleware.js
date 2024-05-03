const passport = require('passport')
const passportJWT = require('../config/auth.conf.js')

passport.use(passportJWT)

exports.requireAuth = passport.authenticate('jwt', { session: false })
