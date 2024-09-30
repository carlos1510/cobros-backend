import jwt from 'jsonwebtoken';
const { JWT_SECRET_KEY, JWT_EXPIRES_IN, JWT_REFRESH_EXPIR_IN } = process.env;

const createAccessToken = (user: any) => {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + Number(JWT_EXPIRES_IN));
    return jwt.sign(_tokenPayload(user, expiration), String(JWT_SECRET_KEY));
}

const createRefreshToken = (user: any) => {
    const expiration = new Date();
    expiration.setHours(expiration.getMonth() + Number(JWT_REFRESH_EXPIR_IN));
    return jwt.sign(_tokenPayload(user, expiration), String(JWT_SECRET_KEY));
}

const decodeToken = (token: string) => {
    return jwt.verify(token, String(JWT_SECRET_KEY));
}

const cookieOptions = () => {
    return {
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIR_IN) * 24 * 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'? true : false,  // En producción debe ser true, en desarrollo false
    }
}

const _tokenPayload = (user: any, expiration: Date, tokenType = 'token') => {
    return {
        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }
}

export { 
    createAccessToken, 
    createRefreshToken, 
    decodeToken, 
    cookieOptions 
};