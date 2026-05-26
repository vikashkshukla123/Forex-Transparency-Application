import API from './api'
export const compareBanks = async(data)=>{
    return API.post('/transactions/compare',data)
}

export const simulateTransaction = async(data)=>{
    return API.post('/transactions/simulate',data);
}

export const getTransactionHistory = async () => {
    return API.get('/transactions/history');
};

export const getAnalytics = async () => {
    return API.get('/transactions/analytics');
};