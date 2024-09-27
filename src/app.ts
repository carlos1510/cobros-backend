import express from 'express';
import cors from 'cors';
import router from './routes';
import http from 'http';

const { API_VERSION, API_NAME } = process.env;

const app = express();

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = new Set(
    (process.env.ALLOWED_ORIGINS ?? '').split(',').map(origin => origin.trim())
);

//Cors configuration
app.use(cors({
    origin: function(origin, callback) {
      console.log('Request from origin:', origin);
      // Permite solicitudes sin origen (aplicaciones móviles o curl)
      if (!origin) return callback(null, true);
  
      if (!allowedOrigins.has(origin)) {
        const msg = `CORS policy does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true
}));

// Exponer rutas
const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, router);

export default server;