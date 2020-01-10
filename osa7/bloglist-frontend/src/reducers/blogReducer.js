import blogService from '../services/blogs'

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const addLike = blogObject => {
  return async dispatch => {
    const likedBlog = await blogService.update(blogObject.id, blogObject, 'addLike')
    dispatch({
      type: 'LIKE',
      data: likedBlog
    }) 
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
      console.log({newBlog})
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
      console.log(index)
      if (index !== -1) {
        stateCopy = [...state]
        stateCopy[index] = action.data
        return stateCopy
      }
      return state
    default: return state
  }
}

export default blogReducer