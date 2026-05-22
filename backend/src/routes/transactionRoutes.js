const express = require('express')
const { simulateTransaction, compareBanks, getUserTransaction, getAnalytics } = require('../controllers/transactionController')
const {protect} = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/simulate',protect,simulateTransaction)
router.post('/compare',protect,compareBanks)
router.get('/history',protect,getUserTransaction)
router.get('/analytics',protect,getAnalytics)
module.exports = router