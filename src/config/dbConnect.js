import mongoose, { Mongoose } from "mongoose";

async function conectaBD() {
      await mongoose.connect(process.env.DB_CONNECTION_STRING);

      return mongoose.connection;
};

export default conectaBD;


