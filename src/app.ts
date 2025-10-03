import express, {json} from 'express';
import cors from 'cors';
import { router } from './routes';

export const createApp = () => {
    const app = express();
    app.use(json());
    app.use("/api", router);
    app.use(cors());
    
    return app;
}