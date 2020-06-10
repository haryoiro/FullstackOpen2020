const initialMessage = 'Hello Notification'

export const notific = (message) => {
  return {
    type: Notification,
    message,
  }
}

const notificationReducer = (state = initialMessage, aciton) => {
  console.log(state)
}

export default notificationReducer