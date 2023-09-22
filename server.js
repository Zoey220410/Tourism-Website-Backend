/* eslint-disable no-console */
const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception. Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.set('strictQuery', true);
mongoose.connect(DB, (err) => {
  if (err) throw err;
  console.log('connected to MongoDB');
});

const app = require('./app');

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhanddled rejection. Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
