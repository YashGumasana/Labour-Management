import { UnauthenticatedError, UnauthorizedError } from "../errors/index.js";
import { isTokenValid } from "../utils/index.js";
import Users from "../models/user_m.js";

const authenticateUser = async (req, res, next) => {
    // console.log(req);
    // console.log(req.signedCookies);
    // console.log(req.signedCookies.token);
    // console.log('+++');
    let token = req.header("Authorization");

    if (!token) {
        return res.status(400).json({ msg: "Invalid Authentication." })
    }
    token = token.split(' ')[1]
    // console.log(token);

    try {

        const decodedData = isTokenValid(token);
        // console.log(decodedData, '++');

        if (!decodedData) {
            return res.status(400).json({ msg: "Invalid Authentication." })
        }

        // console.log(decodedData.ply);
        req.user = await Users.findById(decodedData.plyload.id)
        // console.log('+++');

        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
};


const authorizePermissions = (...roles) => {

    return (req, res, next) => {
        console.log('***');
        console.log(req.user.role);
        console.log('--');
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

export { authenticateUser, authorizePermissions };