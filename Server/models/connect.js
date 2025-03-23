import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connectDatabase = () => connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected Successfully"))
  .catch(err => console.log(err));

export default connectDatabase ;
