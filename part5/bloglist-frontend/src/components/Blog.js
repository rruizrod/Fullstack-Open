import React, {useState} from 'react'
const Blog = ({ blog, onLike }) => {
    const [visible, setVisible] = useState(false)
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const showWhenVisible = {display: visible ? '' : 'none'}

    return (
        <div>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                <p>Likes: {blog.likes} <button onClick={onLike}>Like!</button></p>
            </div>
        </div>
    )
}

export default Blog
