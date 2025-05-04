import { User } from "../models/user.model.js"
import { APIError } from "../utils/ApiError.js"
import { APIResponse } from "../utils/ApiResponse.js"

export const fetchProfileById = async (req , res ) => {
    try{
        const {id} = req.params

        const data = await User.findById(id)
        if(!data) return new APIError(404 , 'data not found for this user').send(res);

        return new APIResponse(200 , data , 'data fetched successfully').send(res);
    } catch(e) {
        return new APIError(500 , ['something went wrong' , e.message]).send(res);
    }
}

export const editProfileById = async (req , res) => {
    try {

        const {id} = req.params

        const data = req.body

        const updatedData = await User.findByIdAndUpdate(id , data , {new: true})

        if (!updatedData)
            return new APIError(404, 'User not found').send(res);

        return new APIResponse(200, updatedData , 'data updated').send(res);

    } catch(e) {
        return new APIError(500 , ['something went wrong' , e.message]).send(res);
    }
}

// upload profile pic controller 
// export const uploadProfilePicCOntroller = async (req,res) => {
//     try{
//         const {id} = req.params

//         if(!req.file || !req.file.path) return new APIError(404 , 'profile pic does not found').send(res)

//         const user = await User.findByIdAndUpdate(id, {profilePic : req.file.path },{ new: true })

//         if(!user) return new APIError(401, 'user not found').send(res)

//         return new APIResponse(200 , user , 'profilePic uploaded successfully').send(res)

//     } catch(e) {
//         return new APIError(500 , ['there has bees some error' , e.message]).send(res);
//     }
// }

export const uploadProfilePicCOntroller = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("🧑 User ID:", id);
        console.log("📸 File received from multer-cloudinary:", req.file);

        const profilePicUrl = req.file?.path || req.file?.secure_url;

        if (!profilePicUrl)
            return new APIError(404, 'Profile picture upload failed').send(res);

        const user = await User.findByIdAndUpdate(id, { profilePic: profilePicUrl }, { new: true });

        // const user = await User.findByIdAndUpdate(id, { profilePic: req.file.path }, { new: true });

        if (!user)
            return new APIError(401, 'User not found').send(res);

        return new APIResponse(200, user, 'Profile pic uploaded successfully').send(res);
    } catch (e) {
        console.error("❌ Error uploading profile pic:", e);
        return new APIError(500, ['There has been some error', e.message]).send(res);
    }
}

