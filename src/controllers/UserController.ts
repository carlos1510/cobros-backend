import { Request, Response } from 'express';
import User from '../models';

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
            res.status(200).json({
                ok: true,
                data: null,
                message: 'Usuario registrado correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener los usuarios.',
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
}

export default UserController;