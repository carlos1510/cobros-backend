import { Request, Response } from 'express';
import Credit from '../models';

class CreditController { 
    public async index(req: Request, res: Response): Promise<void> { 
        try {
            const credits = await Credit.findAll();
            res.status(200).json({
                ok: true,
                data: credits,
                message: 'Créditos obtenidos correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener los créditos.',
                error
            });
        }
    }
    
    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { clientId, userId, serviceId, amount } = req.body;
            const newCredit = await Credit.create({ clientId, userId, serviceId, amount });
            res.status(201).json({
                ok: true,
                data: newCredit,
                message: 'Crédito creado correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al crear el crédito.',
                error
            });
        } 

    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { clientId, userId, serviceId, amount } = req.body;
            const updatedCredit = await Credit.update({ clientId, userId, serviceId, amount }, { where: { id } });
            res.status(200).json({
                ok: true,
                data: updatedCredit,
                message: 'Crédito actualizado correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar el crédito.',
                error
            });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Credit.destroy({ where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Crédito eliminado correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al eliminar el crédito.',
                error
            });
        }
    }
}

export default CreditController;