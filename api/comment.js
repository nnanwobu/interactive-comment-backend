const app = require('../app');
const commentRouter = require('../routers/commentRouter');
// app.use('/api/v2/comments', commentRouter);
app.use('/api/comments', commentRouter);

module.exports = app;
