import { User } from "../models/user.model.js";
import { APIError } from "../utils/ApiError.js"
import { APIResponse } from "../utils/ApiResponse.js";

export const signUpController = async (req , res) => {
    try{

        const body = req.body

        const existingUser = await User.findOne({email: body.email}) 

        if (existingUser) return new APIError(401 , 'user already exist try login').send(res); 
        
        const user = await User.create(body)

        user.password = undefined

        return new APIResponse(200 , user , 'signup is successfull').send(res);


    } catch (e) {
        return new APIError(500 , ['something went wrong while sign-up , try again later' , e.message]).send(res);
    }
}