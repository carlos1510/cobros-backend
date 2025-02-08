import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';
import Company from '../models/Company';
import formatoFecha from '../utils/formatDate';
class DashboardController {
    public async getReporteGeneral(req: Request, res: Response){
        try {
            
            console.log(req.params);
            console.log(req.query);
            const { fecha_inicio, fecha_fin } = req.query;
            const companie = await Company.findOne({where: {userId: req.params.userId}});
            if(!companie){
                return res.status(404).json({message: 'No se encontró la empresa'});
            }

            const resulCredito = await sequelize.query(
                `SELECT SUM(cd.totalAmount) AS total_creditos
                FROM clients  c
                INNER JOIN credits cd ON c.id = cd.clientId
                inner join users u ON u.id = cd.userId 
                inner join companies cp ON u.id = cp.userId
                WHERE cd.state = 1 AND cp.id=${companie?.id} AND cd.creditDate = '${formatoFecha(fecha_inicio as string)}' `,
                { type: QueryTypes.SELECT }
            );

            // creditos del dia
            const resultMontoCredito = resulCredito[0]?resulCredito[0]:{total_creditos: 0};

            const resulTotalCredito = await sequelize.query(
                `SELECT SUM(cd.totalAmount) AS total_creditos
                FROM clients  c
                INNER JOIN credits cd ON c.id = cd.clientId
                inner join users u ON u.id = cd.userId 
                inner join companies cp ON u.id = cp.userId
                WHERE cd.state = 1 AND cp.id=${companie?.id}`,
                { type: QueryTypes.SELECT }
            );
            //creditos activos
            const resultMontoTotalCredito = resulTotalCredito[0]?resulTotalCredito[0]:{total_creditos: 0};

            const resulTotalCobro = await sequelize.query(
                `SELECT SUM(f.amount) AS total_cobros
                FROM fees f
                INNER JOIN credits cd ON f.creditId = cd.id
                inner join users u ON u.id = cd.userId 
                inner join companies cp ON u.id = cp.userId
                WHERE cd.state IN (1,2) AND f.state=1 AND cp.id=${companie?.id} AND f.payDate = '${formatoFecha(fecha_inicio as string)}' `,
                { type: QueryTypes.SELECT }
            );

            // cobros del dia
            const resultMontoCobro = resulTotalCobro[0]?resulTotalCobro[0]:{total_cobros: 0};

            const resulTotalCobroActivo = await sequelize.query(
                `SELECT SUM(f.amount) AS total_cobros_activos
                FROM fees f
                INNER JOIN credits cd ON f.creditId = cd.id
                inner join users u ON u.id = cd.userId 
                inner join companies cp ON u.id = cp.userId
                WHERE cd.state = 1 AND f.state=1 AND cp.id=${companie?.id}`,
                { type: QueryTypes.SELECT }
            );

            // cobros acumulados de los creditos activos
            const resultMontoCobroActivo = resulTotalCobroActivo[0]?resulTotalCobroActivo[0]:{total_cobros_activos: 0};

            const resulTotalClient = await sequelize.query(
                `SELECT COUNT(c.id) AS total_client
                FROM clients  c
                INNER JOIN credits cd ON c.id = cd.clientId
                inner join users u ON u.id = cd.userId 
                inner join companies cp ON u.id = cp.userId
                WHERE cd.state = 1 AND cp.id=${companie?.id}`,
                { type: QueryTypes.SELECT }
            );

            const resultCantClient = resulTotalClient[0]?resulTotalClient[0]:{total_client: 0};

            const resultsClients = await sequelize.query(
                `SELECT tb.id, tb.amounCredit, tb.amountPayment, tb.finishedDate, tb.fullName, tb.numberDocument, ROUND((tb.amountPayment/tb.amounCredit)*100,2) AS avance FROM 
                (SELECT cd.id, c.fullName, c.numberDocument, cd.totalAmount AS amounCredit, 
                IFNULL((SELECT SUM(f.amount) FROM fees f WHERE f.state=1 AND f.creditId=cd.id), 0) AS amountPayment,
                DATE_FORMAT(cd.endDate,'%d/%m/%Y') AS finishedDate
                    FROM clients  c
                    INNER JOIN credits cd ON c.id = cd.clientId
                    inner join users u ON u.id = cd.userId 
                    inner join companies cp ON u.id = cp.userId
                    WHERE cd.state = 1 AND cp.id=${companie?.id} AND (cd.endDate BETWEEN '${formatoFecha(fecha_inicio as string)}' AND DATE_ADD('${formatoFecha(fecha_inicio as string)}',INTERVAL 7 DAY))
                ) AS tb `,
                { type: QueryTypes.SELECT }
            )
            res.status(200).json({
                ok: true,
                data: {
                    resultMontoCobro,
                    resultMontoCredito,
                    resultMontoTotalCredito,
                    resultCantClient,
                    resultMontoCobroActivo,
                    clientsFinished: resultsClients
                }
            });
        } catch (err){
            console.log(err);
        }
    }
}

export default new DashboardController();