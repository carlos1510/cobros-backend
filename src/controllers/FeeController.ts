import { Request, Response } from 'express';
import Fee from '../models/Fee';
import Credit from '../models/Credit';
import Client from '../models/Client';
import formatoFecha from '../utils/formatDate';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class FeeController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const payDate = req.query.payDate;
            
            const fees = await Fee.findAll({ where: { state: true, 
                    payDate
                }, 
                include: [
                    {
                        model: Credit,
                        as: 'credit',
                        attributes:[
                            'totalAmount',
                            [
                                Sequelize.literal(`
                                    IFNULL((
                                        SELECT SUM(f1.amount) 
                                        FROM fees f1 
                                        WHERE f1.creditId = Credit.id AND f1.state = 1
                                    ), 0)
                                `),
                                'totalPago'
                            ],
                        ],

                        include: [
                            {
                                model: Client,
                                as: 'client',
                                attributes: ['numberDocument', 'fullName', 'address', 'reference', 'phone'],
                            }
                        ]
                    }
                ]
            });

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
            const { payDate, amount, creditId, userId } = req.body;
            
            const payDateNew = formatoFecha(payDate);
            console.log(payDateNew);
            const newFee = await Fee.create({ payDate: payDateNew, amount: Number(amount), remainingAmount: 0, creditId, userId });

            const credit = await Credit.findOne({where: { id: creditId },
                attributes: [
                    'totalAmount',
                    [
                        Sequelize.literal(`
                            IFNULL((
                                SELECT SUM(f1.amount) 
                                FROM fees f1 
                                WHERE f1.creditId = Credit.id AND f1.state = 1
                            ), 0)
                        `),
                        'totalPago'
                    ],
                ]
            });

            const restantAmount = Number(credit.totalAmount) - Number(credit.dataValues.totalPago);

            await Fee.update({ remainingAmount: restantAmount }, { where: { id: newFee.id } });

            if (restantAmount === Number(amount)) {
                await Credit.update({ state: 2 }, { where: { id: creditId } });
            }

            res.status(201).json({
                ok: true,
                data: newFee,
                message: 'Cuota creada correctamente.'
            });
        } catch (error) {
            console.log(error);
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
            const { payDate, amount, creditId} = req.body;

            const updatedFee = await Fee.update({ payDate: formatoFecha(payDate), amount: Number(amount) }, { where: { id } });

            const credit = await Credit.findOne({where: { id: creditId },
                attributes: [
                    'totalAmount',
                    [
                        Sequelize.literal(`
                            IFNULL((
                                SELECT SUM(f1.amount) 
                                FROM fees f1 
                                WHERE f1.creditId = Credit.id AND f1.state = 1
                            ), 0)
                        `),
                        'totalPago'
                    ],
                ]
            });

            const restantAmount = Number(credit.totalAmount) - Number(credit.dataValues.totalPago);

            await Fee.update({ remainingAmount: restantAmount }, { where: { id } });

            if (restantAmount === Number(amount)) {
                await Credit.update({ state: 2 }, { where: { id: creditId } });
            }else {
                await Credit.update({ state: 1 }, { where: { id: creditId } });
            }
            
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
            await Fee.update({ state: false },{ where: { id } });
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

    public async findPaymentsByCredit(req: Request, res: Response): Promise<void> { 
        try {
            const { creditId } = req.params;
            const fees = await Fee.findAll({ where: { state: true, creditId } });

            res.status(200).json({
                ok: true,
                data: fees,
                message: 'Cuotas obtenidas correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                data: [],
                message: 'Error no se pudo acceder a los datos.',
                error
            });
        }
    }
}

export default new FeeController();