import passport from "passport";
import { APIError } from "../utils/ApiError.js";
import { APIResponse } from "../utils/ApiResponse.js";

export const loginController = async (req , res , next) => {
    passport.authenticate('local' , (err, user, info) => {
        if(err) return next(err)

        if (!user) {
            return res.status(401).json({ message: info?.message || 'Invalid credentials' });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
      
            const sanitizedUser = { ...user.toObject(), password: undefined };
      
            return res.status(200).json({
                message: 'Login successful',
                user: sanitizedUser
            });
        });
    })(req, res, next);
}

export const logoutController = async (req,res) => {
    if(!req.isAuthenticated()) return new APIError(401, 'you are unauthorized').send(res);

    req.logout(err => {
        if(err) return next(err);

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return new APIResponse(200 , null , 'logout successfull').send(res);
        })
    })
}