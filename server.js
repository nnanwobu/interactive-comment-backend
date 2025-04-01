const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
  // server.close(()=>process.exit())
});
// const Comment = require('./models/commentModel');

const DB = process.env.CONNECTION_STRING.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
// {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// }
mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log(' Remote connection established at this our...');
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
