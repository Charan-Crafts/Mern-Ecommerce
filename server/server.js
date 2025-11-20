require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/MongoDB');
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))


// Routes

const authRoutes = require('./routes/auth.routes');

app.use("/api/v1/auth",authRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});