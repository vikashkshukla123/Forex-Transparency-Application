import API from './api'
export const sendMessage = async(message)=>{
    return API.post('/chatbot',{
        message
    })
}

export const getChatHistory = async()=>{
    return API.get('/chatbot/history')
}