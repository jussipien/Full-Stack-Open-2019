export const setNotification = (text, type, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_MESSAGE',
      data: {
        text: text,
        type: type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
        })
    }, seconds*1000)
  }
}

const notificationReducer = (state = {text: '', type: ''}, action) => {
  switch (action.type) {
    case 'CHANGE_MESSAGE':
      return {text: action.data.text, type: action.data.type}
    case 'CLEAR_MESSAGE':
      return {text: '', type: ''}
    default: return state
  }
}

export default notificationReducer