import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  // -- BLOGS PROP --
  const [blogs, setBlogs] = useState([])

  // -- USER FORM --
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // -- GET INITIAL BLOGS FROM SERVER --
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // -- CHECKS FOR LOGGED IN USER --
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username, password)
  
    try{
      const loggedUser = await loginService.login({username, password,})
  
      //--Saving to local storage so login persists
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      //--Set token in blog service for future use
      blogService.setToken(loggedUser.token)
  
      //--Update state of app
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    }catch(exception){
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
        />
        </div>
        <div>
            <input
                type="text"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)} 
            />
        </div>
        <button type="submit">Login</button>
    </form>
)

  const handleBlog = async (blogObj) => {
    try{
      const addedBlog = await blogService.create(blogObj)

      const newBlogs = blogs.concat(addedBlog)
      setBlogs(newBlogs)
      
    }catch(exception){
      console.log(exception)
    }
  }

  const handleLike = async (blogObj) => {
    try{
        const blogSent = {
            user: blogObj.user.id,
            title: blogObj.title,
            author: blogObj.author,
            url: blogObj.url,
            likes: blogObj.likes++
        }
        const updatedBlog = await blogService.update(blogSent)
        setBlogs(blogs.map(blog => blog.id !== blogObj.id ? blog : updatedBlog ))
    }catch(exception){
        console.log(exception)
    }
  }

  if(user === null){
    return (
      <div>
        <h2>Login to Blogs App</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <p>{user.name} is logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <Togglable buttonLabel='Add Blog'>
            <BlogForm createBlog={handleBlog}/>
        </Togglable>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onLike={() => handleLike(blog)} />
        )}
      </div>
    </div>
  )
}

export default App
