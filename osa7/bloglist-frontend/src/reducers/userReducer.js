// import blogService from '..services/blogs'
import loginService from '..services/login'
import userService from '..services/users'
import {setNotification} from './notificationReducer'

export const reducerLogin = (username, password) => {
  return async dispatch => {
    loginService.login(username, password)
      .then(res => {
        dispatch({
          type: 'LOGIN',
           data: {
             token: res.body.token,
             username: res.body.username,
             name: res.body.name
           }
        })
        userService.setToken(res.body.token)
        window.localStorage.setItem('bloglistLoginData', JSON.stringify(res.body))})
      .catch(err => {
        setNotification(err.response, 'error', 5)
      })
  }
}

export const reducerLogout = () => { 
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
    window.localStorage.removeItem('bloglistLoginData')
  }
}

export const useLocalStorage = (userJSON) => {
  return async dispatch => {
    dispatch({
      type: 'USE_LOCAL_STORAGE',
      data: userJSON
    })
  }
}

const userReducer = (state = {text: '', type: ''}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {token: action.data.token, username: action.data.username, name: action.data.name}
    case 'LOGOUT':
      return {token: '', username: '', name: ''}
    case 'USE_LOCAL_STORAGE':
      return action.data
    default: return state
  }
}

export default userReducer