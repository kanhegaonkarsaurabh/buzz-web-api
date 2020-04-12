import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import feedRouter from './routes/feed';

let app = express();

let knexBind = knex(knexConfig.development);

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knexBind);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/feed', feedRouter);

export default app;