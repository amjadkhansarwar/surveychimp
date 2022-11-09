import * as express from 'express';
import {  handleGlobalErrors } from '@surveychimp/surveychimp-lib';
import surveyRouter from './routes/surveyRouter';
import * as cors from 'cors';
const app = express();
app.use(cors())

//Required to parse json body
app.use(express.json());

//Routers
app.use(surveyRouter);

//Global error handler
app.use(handleGlobalErrors);

export default app;