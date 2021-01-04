import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title,
            author,
            url,
        })

        setTitle('')
        setAuthor('')
        setURL('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>Title: 
                    <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>Author: 
                    <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>URL: 
                    <input type="text" value={url} onChange={({target}) => setURL(target.value)}/>
                </div>
                <button type="submit">Add Blog</button>
            </form>
        </div>
    )
}

export default BlogForm