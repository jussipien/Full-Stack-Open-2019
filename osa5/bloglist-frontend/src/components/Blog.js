import React, {useState} from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import '../styles/Blog.css'

const Blog = ({user, blog, allBlogs, setBlogs}) => {
  const [viewDetails, setViewDetails] = useState(false)
  const detailsStyle = {display: viewDetails ? '' : 'none'}

  const handleDetailToggle = () => {
    setViewDetails(!viewDetails)
  }

  const handleLike = async () => { 
    let allBlogsCopy = [...allBlogs]
    const index = allBlogs.findIndex(b => b.id === blog.id)

    console.log({index})

    let blogUser = (blog.user) ? blog.user : null

    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blogUser.id,
      likes: blog.likes + 1
    }

    let updatedBlog = await blogService.updateBlog(blog.id, blogObject, 'addLike')
    console.log({updatedBlog})
    updatedBlog.user = blogUser
    console.log({updatedBlog})
    allBlogsCopy[index] = updatedBlog
    console.log({allBlogsCopy})
    setBlogs(allBlogsCopy)
  }

  const handleDelete = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      let allBlogsCopy = [...allBlogs]
      const index = allBlogs.findIndex(b => b.id === blog.id)
      const res = await blogService.deleteBlog(blog.id)
      if (res.status === 204) {
        allBlogsCopy.splice(index, 1)
        setBlogs(allBlogsCopy)
        console.log(`successfully deleted blog with id ${blog.id}`)
      }
    }
  }

  const userRow = (blog.user) ? <p>added by {blog.user.name}</p> : <></>
  const deleteButton = (blog.user && blog.user.username === user.username) ? <button onClick={handleDelete}>delete</button> : <></>

  return (
    <div className="Blog">
      <div onClick={handleDetailToggle}>
        <p>{blog.title} {blog.author}</p>
      </div>
      <div style={detailsStyle}>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
        {userRow}
        {deleteButton}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog