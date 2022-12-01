import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    phoneNumber: {
        type: Number,
        required: true

    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true

    },

    category: {
        type: String,
        enum: ['labour', 'contractor', 'officer', 'builder'],
        required: true
    },

    images: {
        type: Array,
        required: true,
        default: []
    },

    docVerify: {
        type: Array,
        default: [false, false, false, false]
    },

    approveStatus: {
        type: Number,
        enum: [0, 1, 2], //0 = pending,1 = approve //resibmit
        default: 0
    }


}, {
    timestamps: true
})

export default mongoose.model('user', userSchema)