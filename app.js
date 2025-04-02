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
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
});

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

app.use('/api/v2/users', userRouter);
app.use('/api/v2/replies', replyRouter);
app.use('/api/v2/comments', commentRouter);
app.all('*', (req, res, next) => {
  const err = new AppError(`can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
