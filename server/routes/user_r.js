import express from 'express'
const router = express.Router()

import { register, login, generateAccessToken, logout, uploadDocument, createDocument, getDocument, verify, create_request_response, get_request_response } from '../controllers/user_c.js'

import { authenticateUser } from '../middleware/authentication.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/generateAccessToken').post(generateAccessToken)
router.route('/logout').get(authenticateUser, logout)
router.route('/uploadDocument').post(authenticateUser, uploadDocument)
router.route('/createDocument').post(authenticateUser, createDocument)
router.route('/getDocument').get(authenticateUser, getDocument)
router.route('/verify').post(authenticateUser, verify)
router.route('/create_request_response').post(authenticateUser, create_request_response)
router.route('/get_request_response').get(authenticateUser, get_request_response)


export default router