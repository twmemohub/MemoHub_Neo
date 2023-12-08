const OpenAI = require('openai')

const transformMessages = require('./helper')

const openai = new OpenAI({
    //  apiKey: process.env.OPENAI_API_KEY, 
     apiKey: '', // The local model does not need api key.
     baseURL: process.env.OPENAI_API_BASE_URL})

// 傳入 messages，取得 OpenAI API 的回覆
const openAIChat = async (messages) => {
    // 輸入空訊息直接回傳
    if (messages.length == 0) {
        return
    } else {
        // 轉換成 openai 格式
        messages = transformMessages(messages)
        // 呼叫 openai api
        const call = {
            messages,
            // model: 'gpt-3.5-turbo',
            model: process.env.OPENAI_API_MODEL,
            //max_tokens: 80,
        }
        console.log(call)
        const completion = await openai.chat.completions.create(call)
        return completion.choices[0]
    }
}

module.exports = openAIChat