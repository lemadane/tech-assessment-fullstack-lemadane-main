/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import express, { Response } from 'express';
import { rolesController, usersController } from './controllers';
import authController from './controllers/authController';
import notFoundMiddleware from './middlewares/notFoundMiddleware';
import contentTypeJson from './middlewares/contentTypeJson';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors'

const app = express();

//app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/api', (_, res: Response) => {
  res.send({ message: 'Welcome to backend!' });
});
app.use(cors({ origin: '*'}))
app.use(contentTypeJson);
app.use('/api/auth', authController);
app.use('/api/users', usersController);
app.use('/api/roles', rolesController);
app.use(notFoundMiddleware);
app.use(errorHandler);

const server = app.listen(process.env.port, () => {
  console.info(`Listening at http://localhost:${process.env.port}/api`);
});
server.on('error', console.error);

// async function cleanup() {
//   console.info('Disconnecting from database')
//   await db?.$disconnect()
//   console.info('Server closing...')
//   await server?.close()
// }

// process.on('SIGTERM', async (signal) => {
//   console.warn(`SIGTERM signal received: ${signal.toString()}`)
//   await cleanup()
//   process.exit(0)
// })

// process.on('SIGINT', async (signal) => {
//   console.warn(`Caught interrupt signal: ${signal.toString()}`)
//   await cleanup()
//   process.exit(0)
// })

// process.on('uncaughtException', async (err: Error) => {
//   console.error(`Uncaught Exception: ${err.toString()}`)
//   await cleanup()
//   process.exit(1)
// })

// process.on('unhandledRejection', async (reason, promise) => {
//   // const error = { reason, promise }
//   console.error(`Unhandled Rejection: ', ${reason}`)
//   await cleanup()
//   process.exit(1)
// })
