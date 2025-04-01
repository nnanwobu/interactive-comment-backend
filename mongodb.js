const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
const DB = process.env.CONNECTION_STRING.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log(' Remote connection established at this time...');
});
