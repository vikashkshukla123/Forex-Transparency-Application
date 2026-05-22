const { getAIResponse } =
require('../services/chatbotService');

const Bank =
require('../models/Bank');

const Chat =
require('../models/Chat');

const chatbot = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({
                message: 'Message is required'
            });
        }

        const lowerMessage =
            message.toLowerCase();

        // =========================
        // Rule-Based Responses
        // =========================

        // Forex Markup
        if (lowerMessage.includes('markup')) {

            const reply =
                'Forex markup is the extra percentage charged by banks above the real exchange rate during international transactions.';

            await Chat.create({

                userId: req.user.id,

                message,

                reply
            });

            return res.json({ reply });
        }

        // Hidden Charges
        if (
            lowerMessage.includes('hidden charges') ||
            lowerMessage.includes('hidden fees')
        ) {

            const reply =
                'Hidden charges may include forex markup fees, ATM withdrawal fees, conversion fees, and fixed bank charges.';

            await Chat.create({

                userId: req.user.id,

                message,

                reply
            });

            return res.json({ reply });
        }

        // Save Money
        if (
            lowerMessage.includes('save money') ||
            lowerMessage.includes('reduce charges')
        ) {

            const reply =
                'You can reduce forex charges by choosing banks with lower markup percentages and avoiding unnecessary ATM withdrawals abroad.';

            await Chat.create({

                userId: req.user.id,

                message,

                reply
            });

            return res.json({ reply });
        }

        // Best Bank
        if (
            lowerMessage.includes('best bank') ||
            lowerMessage.includes('cheapest bank')
        ) {

            const banks =
                await Bank.find().sort({
                    markupPercentage: 1
                });

            if (banks.length === 0) {

                const reply =
                    'No bank data available.';

                await Chat.create({

                    userId: req.user.id,

                    message,

                    reply
                });

                return res.json({ reply });
            }

            const bestBank = banks[0];

            const reply =
                `${bestBank.name} currently appears to have the lowest forex markup and transaction cost.`;

            await Chat.create({

                userId: req.user.id,

                message,

                reply
            });

            return res.json({ reply });
        }

        // =========================
        // AI Fallback
        // =========================

        const aiReply =
            await getAIResponse(message);

        await Chat.create({

            userId: req.user.id,

            message,

            reply: aiReply
        });

        return res.json({
            reply: aiReply
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const getChatHistory =
async (req, res) => {

    try {

        const chats =
            await Chat.find({
                userId: req.user.id
            }).sort({
                createdAt: -1
            });

        res.json(chats);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    chatbot,
    getChatHistory
};