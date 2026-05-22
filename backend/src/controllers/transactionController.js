const Bank = require('../models/Bank');
const { calculateFinalAmount } = require('../services/calcService');
const { getExchangeRate } = require('../services/forexService');
const Transaction = require('../models/Transaction')
const supportedCurrencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD"
];

const simulateTransaction = async (req, res) => {
    try {
        const { amount, currency, bankId } = req.body;
        const userId = req.user.id;

        // validation
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        if (
            !supportedCurrencies.includes(currency)
        ) {

            return res.status(400).json({
                message:
                    "Unsupported currency"
            });
        }

        if (!currency) {
            return res.status(400).json({ message: "Currency is required" });
        }

        // get bank
        const bank = await Bank.findById(bankId);

        if (!bank) {
            return res.status(404).json({ message: "Bank not found" });
        }

        // exchange rate
        const rate = await getExchangeRate(currency);

        // calculate
        const result = calculateFinalAmount({
            amount,
            exchangeRate: rate,
            markup: bank.markupPercentage,
            fee: bank.fixedFee
        });

        // Saving the transaction
        const transaction = await Transaction.create({
            userId,
            bankId,
            amount,
            currency,
            finalAmount: result.total,
            breakdown: {
                baseAmount: result.baseAmount,
                markupAmount: result.markupAmount,
                fee: result.fee
            }
        });

        res.json({
            result,
            transactionId: transaction._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const compareBanks = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        if (!supportedCurrencies.includes(currency)) {

    return res.status(400).json({
        message: "Unsupported currency"
    });
}

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        if (!currency) {
            return res.status(400).json({ message: "Currency is required" });
        }

        // 1. get all banks
        const banks = await Bank.find();

        // 2. get exchange rate
        const rate = await getExchangeRate(currency);

        // 3. calculate for each bank
        const results = banks.map(bank => {
            const calc = calculateFinalAmount({
                amount,
                exchangeRate: rate,
                markup: bank.markupPercentage,
                fee: bank.fixedFee
            });
            const recommendationScore =

    (100 - bank.markupPercentage)

    +

    (bank.rating * 10)

    -

    bank.fixedFee

    -

    bank.atmWithdrawalFee;

return {

    bankName: bank.name,

    markup: bank.markupPercentage,

    fee: bank.fixedFee,

    atmFee: bank.atmWithdrawalFee,

    rating: bank.rating,

    recommendationScore:
        Number(recommendationScore.toFixed(2)),

    total:
        Number(calc.total.toFixed(2))
};

            
        });

         
        if (results.length === 0) {
        return res.status(404).json({ message: "No banks available" });
        }

        // sort by cheapest
        results.sort(

    (a, b) =>

    b.recommendationScore -

    a.recommendationScore
);
        

        //pick best -> first after sorting
        const bestOption = results[0];
        bestOption.reason =
"Best overall recommendation based on markup, fees, ATM charges, and bank rating.";

        // add saving insights
        const maxTotal = Math.max(...results.map(r=>r.total))
        bestOption.savings = Number((maxTotal - bestOption.total).toFixed(2))
        

        res.json({
            bestOption,
            allOptions: results
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserTransaction = async(req,res)=>{
    try {
        const userId = req.user.id;
        const transactions = await Transaction.find({ userId })
        .populate("bankId", "name")
        .sort({ createdAt: -1 });

        res.json(transactions);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}
const getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        const transactions = await Transaction.find({ userId });

        const totalTransactions = transactions.length;

        const totalSpent = transactions.reduce((sum, t) => sum + t.finalAmount, 0);

        const averageTransaction = totalTransactions > 0 
            ? totalSpent / totalTransactions 
            : 0;

        // most used bank
        const bankCount = {};

        transactions.forEach(t => {
            const bank = t.bankId.toString();
            bankCount[bank] = (bankCount[bank] || 0) + 1;
        });

        let mostUsedBankId = null;
        let maxCount = 0;

        for (let bank in bankCount) {
            if (bankCount[bank] > maxCount) {
                maxCount = bankCount[bank];
                mostUsedBankId = bank;
            }
        }

        let mostUsedBank = null;

        if (mostUsedBankId) {
            const bankDoc = await Bank.findById(mostUsedBankId);
            mostUsedBank = bankDoc?.name;
        }

        res.json({
            totalTransactions,
            totalSpent,
            averageTransaction,
            mostUsedBank
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { simulateTransaction,compareBanks ,getUserTransaction,getAnalytics};