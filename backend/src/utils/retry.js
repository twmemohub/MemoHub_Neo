const openAIChat = require('./openai')

const getMessageUntilSuccess = async ( note ) => {
    count = 0
    while(count <= 5) {
        console.log(`OpenAI API calling: attempt #${count}.`)
        prompt = "You are an experienced life mentor to help people figure out themselves or achieve some goal.\
        In the following chat, I will give some thoughts to you. \
        Please guide me to come up an main idea and make myself create some plans\
        Please reply using the following rules, which you should always comply:\
        1. Do Not reply other sentences such as “Yes, I can help you…”. \
        2. Provide a pratical guiding, and\
        3. generate 5 questions based on the format below, and add some more detail for each question you came up. \
        4. Do not contain newline and please reply with the following format in zh-tw:\
        {\"question1\": \" 1. question1 sentence\",\"question2\": \" 2. question2 sentence\",\"question3\": \" 3. question3 sentence\",\"question4\": \" 4. question4 sentence\",\"question5\": \" 5. question5 sentence\"}\
        This format should compatible with JSON, please be aware.\
        Please strictly comply with reply rule given every time you response, and remember to reply in zh-tw. Thank you for your cooperation."
        message = note.join(', ')

        console.log(prompt)
        console.log(message)
        const openAIResponse = await openAIChat([prompt, message])
        console.log(openAIResponse.message.content)
        // Use regular expression to extract JSON
        longString = openAIResponse.message.content;
        const jsonRegex = /{.*?}/s;
        const match = longString.match(jsonRegex);
        // console.log(match)
        if (match) {
        // 2. Extract the JSON substring
            const jsonSubstring = match[0];
            try {
                // 3. Parse the JSON
                const jsonObject = JSON.parse(jsonSubstring);
                console.log(jsonObject);
                return jsonObject
                // const questions = Object.values(jsonObject).join('\n');
                // console.log(questions)
                // res.send({ 'ans': questions})
            } 
            catch (error) {
                console.log("Error parsing JSON: " + error + ", retrying.");
            }
        } 
        console.log("API did not respond in JSON, retrying.")
        count++
    }
    return null
}

module.exports = getMessageUntilSuccess