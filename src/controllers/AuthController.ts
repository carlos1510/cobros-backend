import { Request, response, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { createAccessToken, createRefreshToken } from '../utils/jwt';

class AuthController {

    public signToken(id: number){
        return jwt.sign({ id }, String(process.env.JWT_SECRET), { expiresIn: '24h' });
    }

    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    ok: false,
                    message: 'Usuario no encontrado'
                });
            }

            const passwordCompare = await bcryptjs.compare(password, user.password);
            if (!passwordCompare) return res.status(400).send({ok: false, message: 'Datos incorrectos'});
            if(!user.isActive) return res.status(401).send({ ok: false, message: 'Usuario inactivo'});
            user.password = '';

            const token = createAccessToken(user);
            const refresh = createRefreshToken(user);
            
            const cookieOptions = {
                //expires: new Date(Date.now() + 3600000 * 24),
                expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIR_IN) * 24 * 60 * 60 * 1000), // 1 hour
                //httpOnly: true,
                secure: process.env.NODE_ENV === 'production'? true : false  // En producción debe ser true, en desarrollo false
            }

            // Configuración para el refresh token si quieres que tenga una duración diferente
            const refreshCookieOptions = {
                expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_EXPIR_IN) * 24 * 60 * 60 * 1000), // Duración del refresh token
                //httpOnly: true,
                secure: process.env.NODE_ENV === 'production'? true : false
            };

            res.cookie("access_token", token, cookieOptions);
            res.cookie("refresh_token", refresh, refreshCookieOptions);

            // Respuesta exitosa opcional
            res.status(200).json({
                ok: true,
                message: 'Tokens generados y almacenados en cookies correctamente'
            });

        } catch (error) {
            res.status(500).json({
                status: 'error',
                ok: false,
                message: 'Error al iniciar sesión',
                error
            });
        }
    }
}

export default new AuthController();