export const setNotification = (text, type='error', seconds=5) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      data: {
        text: text,
        type: type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
        })
    }, seconds*1000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return {text: action.data.text, type: action.data.type}
    case 'CLEAR_NOTIFICATION':
      return null
    default: return state
  }
}

export default notificationReducer