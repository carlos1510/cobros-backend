import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../utils/auth';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            res.status(200).json({
                ok: true,
                data: users,
                message: 'Usuarios obtenidos correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener los usuarios.',
                error
            });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        try {
            const {userName,numberDocument,fullName,phone,password,role} = req.body;
            console.log(userName,numberDocument,fullName,phone,password,role);
            const passwordHash = hashPassword(password);
            console.log("hash: ", passwordHash);
            const newUser = await User.create({
                userName,
                numberDocument,
                fullName,
                phone,
                password: passwordHash,
                role,
                isActive: true,
                state: true
            });
            res.status(200).json({
                ok: true,
                data: newUser,
                message: 'Usuario registrado correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al registrar el usuarios.',
                error
            });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            //
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar el usuarios.',
                error
            });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            //
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al eliminar el usuarios.',
                error
            });
        }
    }

    public async getUserName(userName: string) {
        const user = await User.findOne({ where: { userName } });
        return user;
    }
}

export default new UserController();