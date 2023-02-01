const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

// Load env files
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();

//Route Files
const auth = require('./routes/auth')
const users = require('./routes/users')

const app = express();

// Body parser
app.use(express.json())

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet());

// prevent XSS attacks
app.use(xss());

// Prevent hppt param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Mount Routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
})