import jwt from 'jsonwebtoken';

const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};

const isTokenValid = (token) => {
    // console.log(token);
    return jwt.verify(token, process.env.JWT_SECRET)
};

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ plyload: user });
    return token;
    // console.log('*-*');
    // console.log(token);
    // const oneDay = 1000 * 60 * 60 * 24;

    // res.cookie('accessToken', token, {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + oneDay),
    //     secure: process.env.NODE_ENV === 'production',
    //     signed: true,
    // });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}


export { createJWT, isTokenValid, attachCookiesToResponse, createRefreshToken, createAccessToken };