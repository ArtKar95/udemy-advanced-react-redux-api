import mongoose from "mongoose";

const mongoConfigFunc = (mongoConfig) => {
  return mongoose.connect(mongoConfig.connection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default mongoConfigFunc;
