const _ = require('lodash')
const testBlogs = require('../tests/testBlogs')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const total = 0
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? total : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (fav, item) => {
    if (fav.likes < item.likes) {
      fav.title = item.title
      fav.author = item.author
      fav.likes = item.likes
    }
    return fav
  }
  const def = {
    title: '',
    author: '',
    likes: 0
  }

  return blogs.length === 0
    ? def
    : blogs.reduce(reducer, { title: '', author: '', likes: 0 })
}

const mostBlogs = blogs => {
  const results = blogs.map(blog => blog.author)
  const reducer = (bloggers, authors) => {
    if (_.findIndex(bloggers, [author, `${authors}`]) <= -1) {
      bloggers.push({ author: `${authors}`, blogs: 1 })
    }

    return bloggers
  }
  console.log(results.reduce(reducer, { author: '', blogs: 0 }))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
