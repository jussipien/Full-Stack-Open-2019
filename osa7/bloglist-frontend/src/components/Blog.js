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

    console.log({blogObject})

    // update with type addLike in header updateType; backend in part 4 modified to
    // make updating possible by any logged in user when updateType is addLike;
    // not very secure for real use
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

  const userRow = (blog.user) ? <p>added by <b>{blog.user.name}</b></p> : <></>
  const deleteButton = (blog.user && blog.user.username === user.username) ? <button onClick={handleDelete}>delete</button> : <></>

  return (
    <div className="Blog">
      <div className="blog-min" onClick={handleDetailToggle}>
        <p>{blog.title} <b>{blog.author}</b></p>
      </div>
      <div className="blog-detailed" style={detailsStyle}>
        <a href={blog.url}>{blog.url}</a>
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