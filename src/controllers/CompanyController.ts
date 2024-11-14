import { Request, Response } from 'express';
import Company from '../models/Company';

class CompanyController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const companies = await Company.findAll({where: {state: true}});
            res.status(200).json({
                ok: true,
                data: companies,
                message: 'Empresas obtenidas correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener las Empresas.',
                error
            });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { companyName, numberDocument, address, phone, userId } = req.body;
            const newCompany = await Company.create({ companyName, numberDocument, address, phone, userId });
            res.status(201).json({
                ok: true,
                data: newCompany,
                message: 'Empresa creada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al crear la Empresa.',
                error
            });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { companyName, numberDocument, address, phone, userId } = req.body;
            const updatedCompany = await Company.update({ companyName, numberDocument, address, phone, userId }, { where: { id } });
            res.status(200).json({
                ok: true,
                data: updatedCompany,
                message: 'Empresa actualizada correctamente.'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar la Empresa.',
                error
            });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Company.update({ state: false },{ where: { id } });
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

export default new CompanyController();