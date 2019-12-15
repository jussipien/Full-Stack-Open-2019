const dummy = (blogs) => {
  return 1
}

const likes = (blogs) => {
  return blogs.reduce((accumulator, {likes}) => accumulator + likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLikes = Math.max(...likes)
  const mostLiked = blogs.filter(blog => blog.likes === maxLikes)
  return mostLiked[0]
}

const mostBlogs = (blogs) => {
  // let authors = new Set()
  let authors = []
  blogs.forEach(blog => {
    let authorIndex = authors.findIndex(author => author.name === blog.author)
    if (authorIndex === -1) {
      authors.push({name: blog.author, blogs: 1})
    } else {
      authors[authorIndex].blogs++
    }
    // authors.add(blog.author)
  })
  authors.sort((a, b) => {return b.blogs - a.blogs})
  console.log(authors[0], authors[1])
  return authors[0]
}

const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    let authorIndex = authors.findIndex(author => author.name === blog.author)
    if (authorIndex === -1) {
      authors.push({name: blog.author, likes: blog.likes})
    } else {
      authors[authorIndex].likes += blog.likes
    }
  })
  authors.sort((a, b) => {return b.likes - a.likes})
  console.log(authors[0], authors[1])
  return authors[0]
}

module.exports = {
  dummy,
  likes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}