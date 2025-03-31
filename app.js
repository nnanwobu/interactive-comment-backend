const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const AppError = require('./utilities/apperror');

const hpp = require('hpp');
const userRouter = require('./routers/userRouter');
const replyRouter = require('./routers/replyRouter');
const commentRouter = require('./routers/commentRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
});
// const DB = process.env.CONNECTION_STRING.replace(
//   '<db_password>',
//   process.env.DATABASE_PASSWORD
// );
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then((con) => {
//     // console.log(con.connections);
//     console.log(' Remote connection established...');
//   });

app.use(
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
);

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());
app.use(mongoSanitizer());
app.use(xss());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests! Pls try again in an hour',
});
app.use('/api', limiter);
app.use((req, res, next) => {
  req.requestedTime = new Date().toDateString();
  console.log(req.cookies);
  next();
});
//  Routes
// app.use('/api/v2/comments', userRouter);
// app.use('/api/v2/comments', replyRouter);
// app.use('/api/v2/comments', commentRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/replies', replyRouter);
app.use('/api/comment', commentRouter);
app.all('*', (req, res, next) => {
  const err = new AppError(`can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

app.use(globalErrorHandler);

const DB = process.env.CONNECTION_STRING.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log(' Remote connection established...');
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

module.exports = app;
