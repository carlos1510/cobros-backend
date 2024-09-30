import { Request, Response } from 'express';
import Fee from '../models/Fee';
import { where } from 'sequelize';

class FeeController {
    public async getFeeAll(req: Request, res: Response): Promise<void> {
        try {
            const fees = await Fee.findAll({ where: { state: true } });

            res.status(200).json({
                ok: true,
                data: fees,
                message: 'Cuotas obtenidas correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener las cuotas.',
                error
            });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { payDate, amount, remainingAmount, creditId, userId } = req.body;
            const newFee = await Fee.create({ payDate, amount, remainingAmount, creditId, userId });
            res.status(201).json({
                ok: true,
                data: newFee,
                message: 'Cuota creada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al crear la cuota.',
                error
            });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { payDate, amount, remainingAmount } = req.body;
            const updatedFee = await Fee.update({ payDate, amount, remainingAmount }, { where: { id } });
            res.status(200).json({
                ok: true,
                data: updatedFee,
                message: 'Cuota actualizada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar la cuota.',
                error
            });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Fee.destroy({ where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Cuota eliminada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al eliminar la cuota.',
                error
            });
        }
    }
}

export default new FeeController();