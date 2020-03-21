const listHelper = require('../utils/list_helper')
const testBlogs = require('./testBlogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total Likes:', () => {
  test('Empty list is zero', () => {
    const result = listHelper.totalLikes(testBlogs.emptyBlog)
    expect(result).toBe(0)
  })
  test('List with one blog is likes on blog', () => {
    const result = listHelper.totalLikes(testBlogs.oneBlog)
    expect(result).toBe(2)
  })
  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testBlogs.blogs)
    expect(result).toBe(36)
  })
})

describe('Favorite Blog:', () => {
  test('Empty list is empty for all', () => {
    const result = listHelper.favoriteBlog(testBlogs.emptyBlog)
    expect(result).toEqual({ title: '', author: '', likes: 0 })
  })
  test('List with one blog is only blog', () => {
    const result = listHelper.favoriteBlog(testBlogs.oneBlog)
    expect(result).toEqual({
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2
    })
  })
  test('List with multiple blogs is highest liked', () => {
    const result = listHelper.favoriteBlog(testBlogs.blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('Most Blogs:', () => {
  test.only('List', () => {
    const result = listHelper.mostBlogs(testBlogs.blogs)
    expect(result).toEqual({})
  })
})
