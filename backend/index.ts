import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const users = require("./routes/users");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.use('/users', users);

app.listen(5000, () => {
  console.log('Server is starting on port 5000');
});
