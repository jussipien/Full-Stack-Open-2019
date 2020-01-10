import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useField} from './hooks'
import Blog from './components/Blog'
import TableForm from './components/Form'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import {createBlog} from './reducers/blogReducer'
import {setNotification}  from './reducers/notificationReducer'
import {reducerLogin, reducerLogout, useLocalStorage}  from './reducers/userReducer'
import './App.css'

const createFormRef = React.createRef()

const View = ({user, blogs, loginForm, createForm, logoutAction}) => {
  blogs.sort((a, b) => {return b.likes - a.likes})

  if (user === null) {
    return (
      <div>
        <TableForm states={loginForm.states} header={loginForm.header} buttonAction={loginForm.buttonAction} buttonLabel={loginForm.buttonLabel}/>
        <Notification/>
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
      <Togglable buttonLabel="new blog" ref={createFormRef}>
        <TableForm states={createForm.states} header={createForm.header} buttonAction={createForm.buttonAction} buttonLabel={createForm.buttonLabel}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} allBlogs={blogs}/>
      )}
    </div>
  )
}

const App = (props) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)
    props.reducerLogin(username.value, password.value)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    props.reducerLogout()
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    createFormRef.current.toggleVisibility()
    console.log(`adding new blog with name ${newTitle.value}, author ${newAuthor.value}`)
    const newBlogData = {title: newTitle.value, author: newAuthor.value, url: newUrl.value, user: props.user.token}
    props.createBlog(newBlogData)
    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
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

  // get login information from local storage when app is loaded
  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistLoginData')
    console.log(userJSON)
    if (userJSON) {
      props.useLocalStorage(userJSON)
    }
  }, [])

  return (
    <div className="App">
      <View user={props.user} blogs={props.blogs} loginForm={loginForm} logoutAction={handleLogout} createForm={createForm}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
  reducerLogin,
  reducerLogout,
  useLocalStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
