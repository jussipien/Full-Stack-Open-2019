import blogService from '../services/blogs'
import {setNotification} from './notificationReducer'

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
    const newBlog = await blogService.createBlog(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
    setNotification(`a new blog ${content.title} by ${content.author} added`, 'success')
    } catch (err) {
      console.log(err)
      if (err.status === 401) {
        setNotification(err.response.data.error, 'error')
      } 
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE',
        data: id
      })
      setNotification('successfully deleted blog', 'success')
    } catch (err) {
      console.log(err)
      if (err.status === 401) {
        setNotification(err.response.data.error, 'error')
      } 
    }
  }
}

export const addLike = blogObject => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.updateBlog(blogObject.id, blogObject, 'addLike')
      dispatch({
        type: 'LIKE',
        data: JSON.parse(likedBlog)
      })
      setNotification(`liked blog ${likedBlog.title}`, 'success')
    } catch (err) {
      console.log(err)
      if (err.status === 401) {
        setNotification(err.response.data.error, 'error')
      } 
    }
  }
}

const blogReducer = (state = [], action) => {
  let stateCopy
  let index
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE':
      const newBlog = action.data
      stateCopy = [...state, newBlog]
      return stateCopy
    case 'DELETE':
      index = state.findIndex(object => object.id === action.data)
      if (index !== -1) {
        stateCopy = [...state]
        stateCopy.splice(index, 1)
        return stateCopy
      }
    case 'LIKE':
      index = state.findIndex(object => object.id === action.data.id)
      if (index !== -1) {
        console.log({index})
        stateCopy = [...state]
        stateCopy[index] = action.data
        return stateCopy
      }
      return state
    default: return state
  }
}

export default blogReducer