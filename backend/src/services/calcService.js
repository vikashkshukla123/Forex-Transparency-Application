const calculateFinalAmount = ({
    amount,
    exchangeRate,
    markup,
    fee,
    atmFee = 0
}) => {

    const baseAmount = amount * exchangeRate;

    const markupAmount =
        (baseAmount * markup) / 100;

    const total =
        baseAmount +
        markupAmount +
        fee +
        atmFee;

    return {

        baseAmount:
            Number(baseAmount.toFixed(2)),

        markupAmount:
            Number(markupAmount.toFixed(2)),

        fee:
            Number(fee.toFixed(2)),

        atmFee:
            Number(atmFee.toFixed(2)),

        total:
            Number(total.toFixed(2))
    };
};

module.exports = {
    calculateFinalAmount
};