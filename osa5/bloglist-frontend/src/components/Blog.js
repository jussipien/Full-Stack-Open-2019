import React from 'react'
import '../styles/Blog.css'

const Blog = ({ blog }) => (
  <div className="Blog">
    {blog.title} {blog.author}
  </div>
)

export default Blog