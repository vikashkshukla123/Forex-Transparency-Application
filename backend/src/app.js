const express = require('express');
const cors = require('cors');

const transactionRoutes =
    require('./routes/transactionRoutes');

const authRoutes =
    require('./routes/authRoutes');

const chatBotRoutes = require('./routes/chatbotRoutes')

const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/transactions', transactionRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatBotRoutes) 
// Health Check
app.get('/', (req, res) => {
    res.send('API Working');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

module.exports = app;