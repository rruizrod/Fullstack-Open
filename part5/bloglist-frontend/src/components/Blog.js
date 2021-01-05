import React, {useState} from 'react'
const Blog = ({ blog, onLike, onDelete }) => {
    const [visible, setVisible] = useState(false)
    
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const showWhenVisible = {display: visible ? '' : 'none'}

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
             <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>Likes: {blog.likes} <button onClick={onLike}>Like!</button></p>
                <p>User: {(!blog.user) ? 'No User' : blog.user.name}</p>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Blog
