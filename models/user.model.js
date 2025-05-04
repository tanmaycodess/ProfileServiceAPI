import {Schema , model} from 'mongoose'
import bcrypt from 'bcrypt'

const userPreferenceSchema = new Schema({
    theme:{
        type: String,
        enum: ['light' , 'dark'],
        default: 'light'
    },
    language:{
        type: [String],
        enum: ['en' , 'hi' , 'espan'],
        default: ['en']
    }
}, { _id: false } )

const userSchema = new Schema({

    firstName:{
        type: String,
        required: true,
        minlength: [2, 'first name shall be of minimum length 2']
    },
    lastName:{
        type: String,
        minlength:[2, 'last name shall be of minimum length 2']
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [10 , 'email not valid'],
        match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'password shall be of minimum length 8'],
        select: false
    },
    profilePic: {
        type: String,
    },
    phoneNumber:{
        type: String,
        required: true,
        trim: true
    },
    userPreference : userPreferenceSchema
}, {timestamps: true})

userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) return next()

    try{
        const salts = 12
        this.password = await bcrypt.hash(this.password , salts)
        next()
    } catch (err){
        return next(err);
    }
})

userSchema.methods.comparePasswords = function(userPassword) {
    return bcrypt.compare(userPassword , this.password)
}

userSchema.virtual('fullname').get(function () {
    return `${this.firstName} ${this.lastName}`
})

export const User = model('User' , userSchema)