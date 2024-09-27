import { Request, Response } from 'express';
import Service from '../models';

class ServiceController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const services = await Service.findAll();
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
            const { name, description, amount } = req.body;
            const newService = await Service.create({ name, description, amount });
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
            const { name, description, amount } = req.body;
            const updatedService = await Service.update({ name, description, amount }, { where: { id } });
            res.status(200).json({ ok: true, data: updatedService, message: '' });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al actualizar el servicio.' });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Service.destroy({ where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Servicio eliminado correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al eliminar el servicio.' });
        }
    }
}

export default ServiceController;