import { Request, Response } from 'express';
import Service from '../models/Service';

class ServiceController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const services = await Service.findAll({where: {state: true}});
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
            const { serviceName, period, porcentage, numberPeriod, companyId } = req.body;
            const newService = await Service.create({ serviceName, period, porcentage, numberPeriod, companyId });
            res.status(201).json({
                ok: true,
                data: newService,
                message: 'Servicio creado correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al crear el servicio.' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { serviceName, period, porcentage, numberPeriod } = req.body;
            const updatedService = await Service.update({ serviceName, period, porcentage, numberPeriod }, { where: { id } });
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