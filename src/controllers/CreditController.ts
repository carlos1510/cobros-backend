import { Request, Response } from 'express';
import Credit from '../models/Credit';
import Client from '../models/Client';
import formatoFecha from '../utils/formatDate';
import Service from '../models/Service';
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';

class CreditController { 
    public async index(req: Request, res: Response): Promise<void> { 
        try {
            const creditDate = req.params.creditDate;
            const credits = await Credit.findAll({
                where: { state: 1, creditDate },
                include: [
                  {
                    model: Client,
                    as: 'client', // Asegúrate de usar el alias definido en la asociación
                    attributes: ['numberDocument', 'fullName', 'address', 'reference', 'phone'],
                  },
                  {
                    model: Service,
                    as:'service', // Asegúrate de usar el alias definido en la asociación
                    attributes: ['serviceName', 'period', 'porcentage', 'numberPeriod'],
                  }
                ],
              });
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
            const { clientId, userId, serviceId, creditDate, amount, endDate, interestAmount, totalAmount, numberDocument, fullName, address, reference, phone } = req.body;

            let clientIdNew = clientId;
            const client = await Client.findOne({ where: { id: clientIdNew } });
            if (!client) {
                const newClient = await Client.create({ numberDocument, fullName, address, reference, phone });
                clientIdNew = newClient?.id;
            } else {
                await Client.update({ numberDocument, fullName, address, reference, phone }, { where: { id:clientIdNew } })
            }

            const creditDateNew = formatoFecha(creditDate); // Formateo la fecha
            const endDateNew = formatoFecha(endDate);  // Formateo la fecha de fin de plazo para la base de datos
            
            const newCredit = await Credit.create({ creditDate: creditDateNew, amount, endDate: endDateNew, interestAmount, totalAmount, clientId:clientIdNew, userId, serviceId });
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
            const { clientId, serviceId, creditDate, amount, endDate, interestAmount, totalAmount, numberDocument, fullName, address, reference, phone } = req.body;
            
            let clientIdNew = clientId;
            const client = await Client.findOne({ where: { id: clientIdNew } });
            if (!client) {
                const newClient = await Client.create({ numberDocument, fullName, address, reference, phone });
                clientIdNew = newClient?.id;
            } else {
                await Client.update({ numberDocument, fullName, address, reference, phone }, { where: { id:clientIdNew } })
            }

            const updatedCredit = await Credit.update({ creditDate, amount, endDate, interestAmount, totalAmount, clientId:clientIdNew, serviceId }, { where: { id } });
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
            await Credit.update({ state: 0 },{ where: { id } });
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

    public async listCreditPay(req: Request, res: Response): Promise<void> {
        try {
            const results = await sequelize.query(`SELECT a.id, a.clientId, a.serviceId, a.userId, a.amount, a.totalAmount, DATE_FORMAT(a.creditDate, '%d/%m/%Y') AS creditDate, 
                    DATE_FORMAT(a.endDate, '%d/%m/%Y') AS endDate,
                    b.numberDocument, b.fullName, b.address, b.phone, b.reference,
                    c.period,
                    IFNULL((SELECT SUM(f1.amount) total FROM fees f1 WHERE f1.creditId=a.id AND a.state=1), 0) AS totalpago,
                    DATE_FORMAT(IFNULL((SELECT MAX(f1.payDate) FROM fees f1 WHERE f1.creditId=a.id AND f1.state=1), a.creditDate), '%d/%m/%Y') AS payDateMax,
                    IF(IFNULL((SELECT MAX(f1.payDate) FROM fees f1 WHERE f1.creditId=a.id AND f1.state=1 AND CAST(f1.payDate AS date) >= DATE_SUB(CURDATE(), INTERVAL 1 DAY)), 0) = 0,'NO','SI') AS ispago,
                    CURDATE() AS fecha_actual,
                    DATE_SUB(CURDATE(), INTERVAL 1 DAY) as fecha_calculado
                    FROM credits a JOIN clients b ON a.clientId=b.id 
                    JOIN services c ON a.serviceId=c.id
                    WHERE a.state=:state`, {
                        replacements: { state: 1 },
                        type: QueryTypes.SELECT,
                    });
            
            res.status(200).json({
                ok: true,
                data: results,
                message: 'Créditos obtenidos correctamente.'
            });
        } catch (error){
            res.status(500).json({
                ok: false,
                message: 'Error al obtener los Créditos.',
                error
            });
        }
    }
}

export default new CreditController();