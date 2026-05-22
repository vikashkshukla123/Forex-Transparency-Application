const axios = require('axios');

const getAIResponse = async (message) => {

    try {

        const response = await axios.post(

            'https://openrouter.ai/api/v1/chat/completions',

            {
                model: 'openai/gpt-3.5-turbo',

                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a forex financial assistant.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ]
            },

            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    'Content-Type':
                        'application/json'
                }
            }
        );

        return response.data
            .choices[0]
            .message.content;

    } catch (error) {

    console.log(
        error.response?.data ||
        error.message
    );

    return JSON.stringify(
        error.response?.data ||
        error.message
    );
}
};

module.exports = {
    getAIResponse
};