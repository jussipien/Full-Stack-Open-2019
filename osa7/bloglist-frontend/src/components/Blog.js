import React, {useState} from 'react'
import {connect} from 'react-redux'
import {addLike, deleteBlog} from '../reducers/blogReducer'
import '../styles/Blog.css'

const Blog = (props) => {
  const blog = props.blog
  const [viewDetails, setViewDetails] = useState(false)
  const detailsStyle = {display: viewDetails ? '' : 'none'}

  const handleDetailToggle = () => {
    setViewDetails(!viewDetails)
  }

  const handleLike = () => { 
    props.addLike(blog)
  }

  const handleDelete = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.deleteBlog(blog.id)
      console.log(`successfully deleted blog with id ${blog.id}`)
    }
  }

  const userRow = (blog.user) ? <p>added by <b>{blog.user.name}</b></p> : <></>
  const deleteButton = (blog.user && blog.user.username === props.user.username) ? <button onClick={handleDelete}>delete</button> : <></>

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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  addLike,
  deleteBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog