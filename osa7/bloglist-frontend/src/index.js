
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import {initializeBlogs} from './reducers/blogReducer'
import blogservice from './services/blogs'
import store from './store'

blogservice.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)