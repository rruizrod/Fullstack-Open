const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum += blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {

    // Empty List Case
    if(blogs.length <= 0) return {}

    const maximum = blogs.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })

    return {
        title: maximum.title,
        author: maximum.author,
        likes: maximum.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}