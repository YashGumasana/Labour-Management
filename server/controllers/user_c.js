import Users from "../models/user_m.js";
import cloudinary from 'cloudinary'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import { createTokenUser, attachCookiesToResponse, createRefreshToken, createAccessToken, isTokenValid } from '../utils/index.js'


const register = async (req, res) => {

    try {


        const { fullname, username, email, phoneNumber, category, password, confirmPassword, gender } = req.body

        let newUserName = username.toLowerCase().replace(/ /g, '')

        const user_name = await Users.findOne({
            username: newUserName
        })

        if (user_name) {
            return res.status(400).json({ msg: "This user name already exists" })
        }

        const user_email = await Users.findOne({
            email
        })

        if (user_email) {
            return res.status(400).json({ msg: "This email already exists" })
        }

        if (password != confirmPassword) {
            return res.status(400).json({ msg: "password does not match" })
        }


        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = await Users.create({
            fullname, username: newUserName, email, phoneNumber, category, password: passwordHash, gender
        })

        const tokenUser = createTokenUser(newUser)


        const token = attachCookiesToResponse({ res, user: tokenUser })

        // const refresh_token = createRefreshToken({ id: newUser._id })

        // res.cookie('refreshtoken', refresh_token, {
        //     httpOnly: true,
        //     path: '/api/v1/auth/refresh_token',
        //     maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
        // })

        return res.status(200).json({ newUser, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error')
    }
}


const login = async (req, res) => {
    try {

        console.log('login');
        const { email, password } = req.body

        const user = await Users.findOne({ email })

        console.log(user);
        if (!user) {
            return res.status(400).json({ msg: "This email does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        console.log(isMatch);
        if (isMatch == false) {
            return res.status(400).json({ msg: "Password is incorrect" })
        }

        const tokenUser = createTokenUser(user)


        const token = attachCookiesToResponse({ res, user: tokenUser })
        // const refresh_token = createRefreshToken({ id: user._id })

        // res.cookie('refreshtoken', refresh_token, {
        //     httpOnly: true,
        //     path: '/api/v1/auth/refresh_token',
        //     maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
        // })

        return res.status(200).json({ user, token })


    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error')

    }
}


const generateAccessToken = async (req, res) => {
    console.log('+++');
    try {
        const { token } = req.body

        console.log(token);
        if (!token) {
            return res.status(400).json({ msg: "Invalid Authentication." })
        }
        // token = token.split(' ')[1]
        // console.log(token);
        const decodedData = isTokenValid(token);
        // console.log(decodedData, '++');

        if (!decodedData) {
            return res.status(400).json({ msg: "Invalid Authentication." })
        }

        // console.log(decodedData.ply);
        const user = await Users.findById(decodedData.plyload.id)

        if (!user) {
            return res.status(400).json({ msg: "This user does not exist." })
        }

        return res.status(200).json({ user, token })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: err.message })
    }
}


const logout = async (req, res) => {
    try {
        const user = Users.findOne({ _id: req.user._id })
        if (!user) {
            return res.status(400).json({ msg: "This user does not exist." })
        }
        return res.status(200).json({ msg: "Logged out!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: err.message })
    }
}

const uploadDocument = async (req, res) => {

    try {
        // console.log(req.user);
        if (!req.files.image) {
            return res.status(400).json({ msg: 'Fill the all detail' })

        }

        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'Folders/file-upload',
            }
        );

        fs.unlinkSync(req.files.image.tempFilePath)
        // console.log(secure_url, '+');
        return res.status(200).json({ image: { src: result.secure_url } })

    }
    catch (error) {

        console.log(error);
        return res.status(500).json('Internal server error')

    }
}

const createDocument = async (req, res) => {

    try {
        const { images } = req.body
        const file = await Users.updateOne(
            {
                _id: req.user._id
            }, {
            images: images,
            approveStatus: 0
        })
        res.status(200).json({ msg: 'successfully created' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
}

const getDocument = async (req, res) => {
    try {
        console.log('**');
        const officer = await Users.findOne({ _id: req.user._id })

        console.log('+++');

        if (officer.category != 'officer') {
            return res.status(400).json({ msg: 'You are not officer' })
        }
        console.log('*-*-');

        const labours = await Users.find({ category: 'labour', approveStatus: 0 })

        // console.log(labours);
        console.log('++');
        if (!labours) {
            return res.status(200).json({ msg: 'There is no pending request' })
        }

        return res.status(200).json({ labours })

    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
}

const verify = async (req, res) => {
    try {
        const { verify, id, num } = req.body

        let isVerify = (verify === 'true');
        let approveStatus;

        const officer = await Users.findOne({ _id: req.user._id })
        if (officer.category != 'officer') {
            return res.status(400).json({ msg: 'You are not officer' })
        }

        const labour = await Users.findOne({ _id: id })

        // let x = [1, 2, 3]
        // x[2] = 4
        // console.log(x);

        for (let i = 0; i < 4; i++) {
            if (i == num) {
                labour.docVerify[i] = isVerify
            }
        }



        if (labour.docVerify[0] && labour.docVerify[1] && labour.docVerify[2] && labour.docVerify[3]) {
            console.log(labour.docVerify, '++');
            approveStatus = 1
        }
        else {
            console.log(labour.docVerify);
            approveStatus = 2
        }
        let docVerify = labour.docVerify
        // console.log(docVerify);
        // req.user.docVerify[key] = verify 
        await Users.findOneAndUpdate({
            _id: id,
        }, {
            docVerify: docVerify,
            approveStatus: approveStatus
        }
        )

        return res.status(200).json({ msg: 'success' })
        // console.log(labour);
        // labour.docVerify[key] = verify



    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}


const create_request_response = async (req, res) => {
    try {
        const { id } = req.body

        const officer = await Users.findOne({ _id: req.user._id })

        if (officer.category != 'officer') {
            return res.status(400).json({ msg: 'You are not officer' })
        }

        const labour = await Users.findOne({ _id: id })

        if (!labour) {
            return res.status(400).json({ msg: 'There is no labour with this id' })
        }

        return res.status(200).json({ labour })



    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const get_request_response = async (req, res) => {
    try {
        const labour = await Users.findOne({ _id: req.user._id })

        if (!labour) {
            return res.status(400).json({ msg: 'There is no labour with this id' })
        }
        return res.status(200).json({ labour })


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });

    }
}

export { register, login, logout, uploadDocument, createDocument, getDocument, verify, create_request_response, get_request_response, generateAccessToken }

// const getLabourList = async (req, res) => {
//     try {
//         const user = await User.find()
//         // console.log(user);
//         return res.status(200).send({ user })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json('Internal server error')
//     }
// }