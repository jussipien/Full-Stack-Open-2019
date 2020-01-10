import blogService from '../services/blogs'
import loginService from '../services/login'
import {setNotification} from './notificationReducer'

export const reducerLogin = (username, password) => {
  return async dispatch => {
    try {
      const data = await loginService.login(username, password)
      dispatch({
        type: 'LOGIN',
        data: data
      })
      blogService.setToken(data.token)
      window.localStorage.setItem('bloglistLoginData', JSON.stringify(data))
      setNotification('logged in successfully', 'success')
     } catch (err) {
        console.log(err)
        if (err.status === 401) {
          setNotification(err.response.data.error, 'error')
        }
      }
  }
}

export const reducerLogout = () => { 
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
    window.localStorage.removeItem('bloglistLoginData')
    setNotification('logged out successfully', 'success')
  }
}

export const useLocalStorage = (userJSON) => {
  return async dispatch => {
    const user = JSON.parse(userJSON)
    dispatch({
      type: 'USE_LOCAL_STORAGE',
      data: user
    })
    blogService.setToken(user.token)
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {token: action.data.token, username: action.data.username, name: action.data.name}
    case 'LOGOUT':
      return null
    case 'USE_LOCAL_STORAGE':
      return action.data
    default: return state
  }
}

export default userReducer