const express = require('express')

import bodyParser from 'body-parser';
import cors from 'cors';
import {sequelize} from './sequelize';
import { Application, Router, Request, Response } from 'express';
import { User } from './models/User';
import { AuthRouter, requireAuth } from './auth.router';

(async() => {
    const app: Application = express();

    const router: Router = Router();

    const V0_USER_MODEL = [User]

    await sequelize.addModels(V0_USER_MODEL)

    app.use('/auth', AuthRouter);

    app.use(router)
    
    app.use(bodyParser.json());

    app.use(cors({
        allowedHeaders: [
        'Origin', 'X-Requested-With',
        'Content-Type', 'Accept',
        'X-Access-Token', 'Authorization',
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        // origin: config.url,
        origin: 'http://lcoalhost:8080',
    }));

    router.get('/favicon.ico', (req, res) => res.status(204));
    
    router.get('/health', (req: Request, res: Response) => {
        res.send('USER SERVICE UP')
    });
    
    router.get('/:id', async (req: Request, res: Response) => {
      const {id} = req.params;
      const item = await User.findByPk(id);
      res.send(item);
    });

    app.listen(8080, () => {
        console.log('listening on 80')
    })
})();


