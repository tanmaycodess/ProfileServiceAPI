import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.model.js";

passport.use(new LocalStrategy(
    {usernameField: 'email'},

    async (email , password , done) => {
        try{
            const user = await User.findOne({email}).select('+password')
            if(!user) return done(null , false , {message: 'user not found'})

            const isMatch = await user.comparePasswords(password);
            if(!isMatch) return done(null , false , {message: 'password does not match'})

            return done(null, user)
        } catch(e) {
            return done(e);
        }
    }
))

// session handeling 

passport.serializeUser((user , done) => {
    done(null , user.id)
})

passport.deserializeUser(async (id , done) => {
    try{
        const user = await User.findById(id).select('-password')
        done(null , user)
    }catch(e) {
        done(e)
    }
})

export default passport