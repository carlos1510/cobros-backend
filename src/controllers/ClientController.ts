import { Request, Response } from 'express';
import axios from 'axios';
import Client from '../models/Client';

class ClientController {
    public async index(req: Request, res: Response): Promise<void> {
        try {
            const clients = await Client.findAll({ where: {state: true} });
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
            const { numberDocument, fullName, address, reference, phone } = req.body;
            const newClient = await Client.create({ numberDocument, fullName, address, reference, phone  });
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

    public async searchByNumberDocument(req: Request, res: Response): Promise<void> {
        try {
            const { numberDocument } = req.params;
            const client = await Client.findOne({ where: { numberDocument: numberDocument } });
            if (!client) {
                if (numberDocument.length === 8){
                    const token = 'apis-token-10722.3IDaHrk5Ym4wMW5llqDGQqFpASMEKikA';  // Reemplaza con tu token real
                    //const dni = '46027897';  // Reemplaza con el DNI que deseas consultar
                    // Realiza la solicitud HTTP
                    axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${numberDocument}`, {
                        headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        // Maneja la respuesta exitosa
                        let clientApi = {
                            id: 0, 
                            numberDocument: response.data.numeroDocumento,
                            fullName: `${response.data.nombres} ${response.data.apellidoPaterno} ${response.data.apellidoMaterno}`,
                            address: "",
                            reference: "",
                            phone: ""
                        };

                        return res.status(200).json({
                            ok: true,
                            data: clientApi,
                            message: 'Cliente obtenido desde la Api externa de consulta DNI.'
                        });
                    })
                    .catch(error => {
                        // Maneja los errores
                        console.error('Error al realizar la consulta:', error);
                        res.status(400).json({ ok: false, message: 'El número de documento debe tener 8 dígitos.' });
                    });
                } else {
                    let clientBlank = {
                        id: 0, 
                        numberDocument,
                        fullName: "",
                        address: "",
                        reference: "",
                        phone: ""
                    };
                    res.status(200).json({ ok: true, data: clientBlank, message: 'Cliente no encontrado' });
                }
            } else {
                res.status(200).json({
                    ok: true,
                    data: client,
                    message: 'Cliente obtenido correctamente.'
                });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: 'Error al buscar el cliente.' + error });
        }
    }
}

export default new ClientController();