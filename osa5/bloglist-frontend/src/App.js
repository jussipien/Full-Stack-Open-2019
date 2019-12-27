import React, {useState, useEffect} from 'react'
import {useField} from './hooks'
import Blog from './components/Blog'
import TableForm from './components/Form'
import Togglable from './components/Togglable'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const createFormRef = React.createRef()
const messageTimeout = 5000

const View = ({user, blogs, loginForm, createForm, logoutAction, messageText, messageType, setBlogs}) => {
  blogs.sort((a, b) => {return b.likes - a.likes})

  if (user === null) {
    return (
      <div>
        <TableForm states={loginForm.states} header={loginForm.header} buttonAction={loginForm.buttonAction} buttonLabel={loginForm.buttonLabel} messageText={messageText} messageType={messageType}/>
        <Message text={messageText} type={messageType}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <button className="form-btn" onClick={logoutAction}>logout</button>
      </div>
      <hr/>
      <Togglable buttonLabel="new note" messageText={messageText} messageType={messageType} ref={createFormRef}>
        <TableForm states={createForm.states} header={createForm.header} buttonAction={createForm.buttonAction} buttonLabel={createForm.buttonLabel}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} allBlogs={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [messageText, setMessageText] = useState('')
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const username = useField('text')
  const password = useField('password')

  const displayMessage = (text, type, timeout=messageTimeout) => {
    setMessageText(text)
    setMessageType(type)
    setTimeout(() => {
      setMessageText('')
    }, timeout)
  }

  // const changeUsername = (event) => setUsername(event.target.value)
  // const changePassword = (event) => setPassword(event.target.value)

  // const changeTitle = (event) => setNewTitle(event.target.value)
  // const changeAuthor = (event) => setNewAuthor(event.target.value)
  // const changeUrl = (event) => setNewUrl(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)
    try {
      const user = await loginService.login(username.value, password.value)
      console.log(user)
      setUser(user)
      window.localStorage.setItem(
        'bloglistLoginData', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      displayMessage('login successful!', 'success')
      username.reset()
      password.reset()
    } catch (error) {
      console.log(error.response.data.error)
      displayMessage(error.response.data.error, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('bloglistLoginData')
    displayMessage('logged out successfully', 'success')
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    createFormRef.current.toggleVisibility()
    console.log(`adding new blog with name ${newTitle.value}, author ${newAuthor.value}`)
    const newBlogData = {title: newTitle.value, author: newAuthor.value, url: newUrl.value, user: user.token}
    try {
      const blog = await blogService.createBlog(newBlogData)
      setBlogs(blogs.concat(blog))
      displayMessage(`a new blog ${blog.title} by ${blog.author} added`, 'success')
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch (error) {
      if (error.status === 401) {
        console.log({error})
        displayMessage({error}, 'error')
      } else {
        console.log(error.response.data.error)
        displayMessage(error.response.data.error.message, 'error')
      }
    }
  }

  // props for login form rows
  const loginFormStates = [
    {
      label: 'username',
      state: username,
      id: 1
    },
    {
      label: 'password',
      state: password,
      id: 2
    }
  ]

  // props for login form
  const loginForm = {
    states: loginFormStates,
    header: 'Log in to application',
    buttonAction: handleLogin,
    buttonLabel: 'login'
  }
  
  // props for create form rows
  const createFormStates = [
    {
      label: 'title',
      state: newTitle,
      id: 1
    },
    {
      label: 'author',
      state: newAuthor,
      id: 2
    },
    {
      label: 'url',
      state: newUrl,
      id: 3
    }
  ]

  // props for create form
  const createForm = {
    states: createFormStates,
    header: 'Add new blog',
    buttonAction: handleCreate,
    buttonLabel: 'add'
  }

  // get blogs from database when app is loaded
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        console.log({initialBlogs})
        setBlogs(initialBlogs)
      })
  }, [])

  // get login information from local storage when app is loaded
  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistLoginData')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div className="App">
      <View user={user} blogs={blogs} loginForm={loginForm} logoutAction={handleLogout} createForm={createForm} messageText={messageText} messageType={messageType} setBlogs={setBlogs}/>
    </div>
  )
}

export default App
