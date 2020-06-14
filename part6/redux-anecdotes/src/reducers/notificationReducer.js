const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'PUSH_NOTIFICATION':
      return action.data
    default :
      return state
  }
}

export default notificationReducer