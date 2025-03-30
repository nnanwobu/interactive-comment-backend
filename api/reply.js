const app = require('../app');
const replyRouter = require('../routers/replyRouter');
app.use('/api/v2/replies', replyRouter);

module.exports = app;
