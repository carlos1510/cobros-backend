import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword } from '../utils/auth';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            /*const { userId } = req.params;
            const companie = await Company.findOne({where: {userId}});
            if(!companie) {
                res.status(400).json({ ok: false, data: [], message: 'No se ha encontrado una empresa asociada al usuario.' });
            }*/
           
            const users = await User.findAll({where: {state: true}});
            res.status(200).json({
                ok: true,
                data: users,
                message: 'Usuarios obtenidos correctamente.'
            });
        } catch (error) {
            console.log(error);
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

            const user = await User.findOne({ where: { userName } });
            if(!user) {
                const passwordHash = hashPassword(password);
            
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
            } else {
                res.status(400).json({
                    ok: false,
                    message: 'El nombre de Usuario ya está en uso.'
                });
            } 
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
            const { id } = req.params;
            const { userName, numberDocument, fullName, phone, password, role } = req.body;
            
            const user = await User.findByPk(id);
            
            if (!user) {
                res.status(404).json({
                    ok: false,
                    message: 'Usuario no encontrado.'
                });
            } else {
                if (password) {
                    const passwordHash = hashPassword(password);
                    await user.update({
                        userName,
                        numberDocument,
                        fullName,
                        phone,
                        password: passwordHash,
                        role
                    });
                } else {
                    await user.update({
                        userName,
                        numberDocument,
                        fullName,
                        phone,
                        role
                    });
                }
                
                res.status(201).json({
                    ok: true,
                    data: user,
                    message: 'Usuario actualizado correctamente.'
                });
            }
            
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
            const { id } = req.params;
            await User.update({ state: false }, { where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Usuario eliminado correctamente.'
            });
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