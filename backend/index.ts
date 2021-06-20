import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const users = require("./routes/users");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://William:Nob2231to@cluster0.lqe4g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
