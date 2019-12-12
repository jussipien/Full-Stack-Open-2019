const dummy = (blogs) => {
  return 1
}

const likes = (blogs) => {
  return blogs.reduce((accumulator, {likes}) => accumulator + likes, 0)
}

const favoriteBlog  = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLikes = Math.max(...likes)
  const mostLiked = blogs.filter(blog => blog.likes === maxLikes)
  return mostLiked[0]
}

module.exports = {
  dummy,
  likes,
  favoriteBlog 
}