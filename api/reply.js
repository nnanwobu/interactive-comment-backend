const app = require('./index');
const replyRouter = require('../routers/replyRouter');
app.use('/api/v2/replies', replyRouter);

module.exports = app;
