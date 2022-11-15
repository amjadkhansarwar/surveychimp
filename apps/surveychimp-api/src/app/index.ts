import * as express from 'express';
import {  handleGlobalErrors } from '@surveychimp/surveychimp-lib';
import surveyRouter from './routes/surveyRouter';
import * as cors from 'cors';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
const app = express();

Sentry.init({
    dsn: "https://4527f280937b4ed581b6dddadd9256f7@o4504162652258304.ingest.sentry.io/4504162687778816",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(cors())

//Required to parse json body
app.use(express.json());

//Routers
app.use(surveyRouter);

app.use(Sentry.Handlers.errorHandler());

//Global error handler
app.use(handleGlobalErrors);

export default app;