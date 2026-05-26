import API from './api'

export const simulateTransaction = async (payload) => {
  return API.post('/transactions/simulate', payload)
}

export const compareBanks = async (payload) => {
  return API.post('/transactions/compare', payload)
}

export const getTransactionHistory = async () => {
  return API.get('/transactions/history')
}

export const getAnalytics = async () => {
  return API.get('/transactions/analytics')
}
