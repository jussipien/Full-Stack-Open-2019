import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
  // filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
