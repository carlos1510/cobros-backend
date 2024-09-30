import { Request, Response } from 'express';
import Company from '../models';

class CompanyController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const companies = await Company.findAll();
            res.status(200).json({
                ok: true,
                data: companies,
                message: 'Compañías obtenidas correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener las compañías.',
                error
            });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { name, description } = req.body;
            const newCompany = await Company.create({ name, description });
            res.status(201).json({
                ok: true,
                data: newCompany,
                message: 'Compañía creada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al crear la compañía.',
                error
            });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const updatedCompany = await Company.update({ name, description }, { where: { id } });
            res.status(200).json({
                ok: true,
                data: updatedCompany,
                message: 'Compañía actualizada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar la compañía.',
                error
            });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Company.destroy({ where: { id } });
            res.status(200).json({
                ok: true,
                message: 'Compañía eliminada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al eliminar la compañía.',
                error
            });
        }
    }
}

export default CompanyController;