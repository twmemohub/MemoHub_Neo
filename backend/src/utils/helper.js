const transformMessages = (list) => {
    return list.map((message, index) => {
        // 0: system, 1: user, 2: assistant, 3: user...
        const role = index == 0 ? 'system' : (index % 2 !== 0 ? 'user' : 'assistant')
        return {
            role: role,
            content: message,
        }
    })
}

module.exports = transformMessages