const express=require('express');
const cookieParser=require("cookie-parser");
const authRoutes=require("./routes/auth.routes");
const editRoutes=require('./routes/edit.routes');
const cors=require("cors");


const app=express();
const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://portfolio-project-lake-xi.vercel.app' // For production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) 
    // or if the origin is in our allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/edit',editRoutes);

module.exports=app;
