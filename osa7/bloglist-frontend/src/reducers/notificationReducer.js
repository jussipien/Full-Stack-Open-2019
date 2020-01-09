export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_MESSAGE',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
        })
    }, seconds*1000)
  }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
    case 'CHANGE_MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return ''
    default: return state
  }
}

export default notificationReducer