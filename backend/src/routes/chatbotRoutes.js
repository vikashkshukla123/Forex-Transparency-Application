const express = require('express');

const {
    chatbot,
    getChatHistory
} = require('../controllers/chatbotController');

const {
    protect
} = require('../middlewares/authMiddleware');

const router = express.Router();

// Chatbot API
router.post(
    '/',
    protect,
    chatbot
);

// Chat History API
router.get(
    '/history',
    protect,
    getChatHistory
);

module.exports = router;