const app = require('./index');
const commentRouter = require('../routers/commentRouter');
app.use('/api/v2/comments', commentRouter);

module.exports = app;
