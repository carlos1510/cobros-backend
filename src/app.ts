import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import cors from 'cors';
import router from './routes';
import http from 'http';
import cookieParser from 'cookie-parser';

// Extender la interfaz de SessionData para incluir `user`
/*declare module 'express-session' {
  interface SessionData {
    user: any; // Cambia 'any' por el tipo adecuado si sabes qué datos devuelve `jwt.verify`
  }
}*/

const { JWT_SECRET } = process.env;

const { API_VERSION, API_NAME } = process.env;

const app = express();

const server = http.createServer(app);

//Cors configuration

const corsOptiones = {
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true // Permitir el uso de credenciales
  /*optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: false*/
};

app.use(cors(corsOptiones));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/*app.use((req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if(!req.session.user){
    req.session.user = null;
  }

  if (!token) {
    // Si no hay token, simplemente pasa al siguiente middleware
    return next();
  }

  try {
    const data = jwt.verify(token, String(JWT_SECRET));
    req.session.user = data
  } catch (error) {
    console.error('Error al verificar el token:', error); 
  }

  next() // seguir a la siguiente ruta o middleware
});*/

// Exponer rutas
const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, router);

export default server;