import blogService from '../services/blogs'


export const initializeBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: anecdotes,
    })
  }
}

export const handleLike = blogObject => {
  return async dispatch => {
    const likedBlog = await blogService.update(anecdoteObject.id, anecdoteObject, 'addLike')
    dispatch({
      type: 'LIKE',
      data: likedBlog
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

const blogReducer = (state = [], action) => {
  let stateCopy
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE':
      const newBlog = action.data
      console.log({newAnenewBlogcdote})
      stateCopy = [...state, newBlog]
      return stateCopy
    case 'LIKE':
      const index = state.findIndex(object => object.id === action.data.id)
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