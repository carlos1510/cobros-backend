import { Request, Response } from 'express';
import Service from '../models/Service';
import Company from '../models/Company';

class ServiceController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const companie = await Company.findOne({where: {userId}});
            if(!companie) {
                res.status(400).json({ ok: false, data: [], message: 'No se ha encontrado una empresa asociada al usuario.' });
            }
            const services = await Service.findAll({where: {state: true, companyId: companie?.id}});
            res.status(200).json({
                ok: true, 
                data: services,
                message: 'Servicios obtenidos correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al obtener los servicios.' });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { serviceName, period, porcentage, numberPeriod, userId } = req.body;
            const companie = await Company.findOne({where: {userId}});
            if(!companie) {
                res.status(400).json({ ok: false, message: 'No se ha encontrado una empresa asociada al usuario.' });
            }
            const newService = await Service.create({ serviceName, period, porcentage, numberPeriod, companyId: Number(companie?.id) });
            res.status(201).json({
                ok: true,
                data: newService,
                message: 'Servicio creado correctamente.'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, message: 'Error al crear el servicio.' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { serviceName, period, porcentage, numberPeriod } = req.body;
            await Service.update({ serviceName, period, porcentage, numberPeriod }, { where: { id } });
            const updatedService = await Service.findByPk(id);
            res.status(200).json({ ok: true, data: updatedService, message: 'Servicio actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al actualizar el servicio.' });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Service.update({ state: false },{ where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Servicio eliminado correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al eliminar el servicio.' });
        }
    }
}

export default new ServiceController();