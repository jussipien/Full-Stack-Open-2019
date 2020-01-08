// const changeMessage = (message) => {
//   console.log('change notification message', message)
//   return {
//     type: 'CHANGE_MESSAGE',
//     data: {
//       message: message
//     }
//   }  
// }

// const clearMessage = () => {
//   console.log('clear notification message')
//   return {
//     type: 'CLEAR_MESSAGE'
//   }  
// }

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
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'CHANGE_MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return ''
    default: return state
  }
}

export default notificationReducer