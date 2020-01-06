export const changeMessage = (message) => {
  console.log('change notification message', message)
  return {
    type: 'CHANGE_MESSAGE',
    data: {
      message: message
    }
  }  
}

export const clearMessage = () => {
  console.log('clear notification message')
  return {
    type: 'CLEAR_MESSAGE'
  }  
}

const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'CHANGE_MESSAGE':
      return action.data.message
    case 'CLEAR_MESSAGE':
      return ''
    default: return state
  }
}

export default notificationReducer