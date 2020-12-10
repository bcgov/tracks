import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';
import {notFound} from "./apis/common";
import {operatorsList} from "./apis/operators";

const prefix = '/api/v1';

const app = express()
    .use(helmet())
    .use(cors())
    .use(morgan('tiny'))

    .get(`${prefix}/operators`, operatorsList)

    .get('*', notFound);


http.createServer(app).listen(6005, () => {
    console.log(`listening on port 6005`)
    // pgPool.connect((err, client) => {
    //     const server = `${process.env.POSTGRES_SERVER_HOST ?? 'localhost'}:${process.env.POSTGRES_SERVER_PORT ?? 5432}`;
    //     if (err) {
    //         console.log(`error connecting to postgresql server host at ${server}:\n\t${err}`);
    //     } else console.log(`postgres server successfully connected at ${server}`);
    //     client.release();
    // });
});
