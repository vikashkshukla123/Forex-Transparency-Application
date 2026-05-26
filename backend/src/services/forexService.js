const axios = require('axios');

let cache = {};

const supportedCurrencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY"
];

const getExchangeRate = async (currency) => {

    try {

        if (!supportedCurrencies.includes(currency)) {
            throw new Error("Unsupported currency");
        }

        const now = Date.now();

        // Cache Validity: 1 hour
        if (
            cache[currency] &&
            (now - cache[currency].timestamp <
                60 * 60 * 1000)
        ) {
            return cache[currency].rate;
        }

        const res = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${currency}`
        );

        const rate = res.data.rates["INR"];

        cache[currency] = {
            rate,
            timestamp: now
        };

        return rate;

    } catch (error) {

        console.error("Forex API Error:", error.message);

        throw new Error("Unable to fetch exchange rate");
    }
};

module.exports = {
    getExchangeRate
};