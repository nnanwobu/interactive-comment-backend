const app = require('../app');
const userRouter = require('../routers/userRouter');

// app.use('/api/v2/users', userRouter);
app.use('/api/user', userRouter);

module.exports = app;
