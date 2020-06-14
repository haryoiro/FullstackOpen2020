const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER_WORD':
      return action.data
    default:
      return state
  }
}

export default filterReducer