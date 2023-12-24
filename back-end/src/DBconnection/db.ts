import mongoose, { ConnectOptions } from 'mongoose';

mongoose.set('strictQuery', true);

const DBconnect = (): void => {
  mongoose.connect(
    process.env.MONGO_URL || '',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
    (err: any) => {
      if (err) throw err;
      console.log('Mongodb connection established');
    }
  );
};

export default DBconnect;
