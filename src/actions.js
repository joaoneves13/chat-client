const ALL_MESSAGES = 'ALL_MESSAGES'
const NEW_MESSAGE = 'NEW_MESSAGE'

export function allMessages (messages) {
    return {
        type: ALL_MESSAGES,
        payload: messages
    }
}

export const NEW_MESSAGE = 'NEW_MESSAGE'

export function newMessage (message) {
    return {
        type: NEW_MESSAGE,
        payload: message
    }
}