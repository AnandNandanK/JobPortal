import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import connectdb from "./config/database.js";
import dotenv from "dotenv";
import companyRoute from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import applicationRoute from './routes/applicationRoutes.js'


dotenv.config({});

const app = express();

// Middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Home page fetched successfully",
  });
});

// Connect to Database
connectdb();

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening at port number", PORT);
});

// APIs
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoutes);
app.use('/api/v1/application',applicationRoute);
