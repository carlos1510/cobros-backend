import { Request, Response } from 'express';
import Client from '../models';

class ClientController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const clients = await Client.findAll();
            res.status(200).json({
                ok: true,
                data: clients,
                message: 'Clientes obtenidos correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al obtener los clientes.' });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { name, lastName, documentType, documentNumber, email, phone } = req.body;
            const newClient = await Client.create({ name, lastName, documentType, documentNumber, email, phone });
            res.status(201).json({
                ok: true,
                data: newClient,
                message: 'Cliente creado correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al crear el cliente.' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, lastName, documentType, documentNumber, email, phone } = req.body;
            const updatedClient = await Client.update({ name, lastName, documentType, documentNumber, email, phone }, { where: { id } });
            res.status(200).json({
                ok: true,
                data: updatedClient,
                message: 'Cliente actualizado correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al actualizar el cliente.' });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Client.destroy({ where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Cliente eliminado correctamente.'
            });
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al eliminar el cliente.' });
        }
    }
}