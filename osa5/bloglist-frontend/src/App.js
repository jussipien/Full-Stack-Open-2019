import React, { useState, useEffect  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const messageTimeout = 5000

const Message = ({text, type}) => {
  if (!!text) {
    const classes = `Message ${type}`
    return (
    <div className={classes}>
      <p>{text}</p>
    </div>
    )
  } else {
    return <></>
  }
}

const FormRow = ({label, type, value, onChange}) => {
  return (
    <tr>
      <td>
        <label htmlFor={label}>{label}:</label> 
      </td>
      <td>
        <input type={type} id={label} onChange={onChange} value={value} required={true}/>
      </td>
    </tr>
  )
}

const TableForm = ({states, header, buttonAction, buttonLabel, messageText, messageType}) => {
  const getStateRows = () => states.map(state => <FormRow key={state.id} label={state.label} type={state.type} value={state.value} onChange={state.onChange}/>)

  return (
    <section>
      <h2>{header}</h2>
      <Message text={messageText} type={messageType}/>
        <form>
          <table>
            <tbody>
            {getStateRows()}
            </tbody>
          </table>
          <button className="form-btn" onClick={buttonAction}>{buttonLabel}</button>
        </form>
    </section>
  )
}

const View = ({user, blogs, loginForm, createForm, logoutAction, messageText, messageType}) => {
  if (user === null) {
    return (
      <TableForm states={loginForm.states} header={loginForm.header} buttonAction={loginForm.buttonAction} buttonLabel={loginForm.buttonLabel} messageText={messageText} messageType={messageType}/>
    )
  }

  return (
    <div>
      <TableForm states={createForm.states} header={createForm.header} buttonAction={createForm.buttonAction} buttonLabel={createForm.buttonLabel} messageText={messageText} messageType={messageType}/>
      <h2>blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <button className="form-btn" onClick={logoutAction}>logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [messageText, setMessageText] = useState('')
  const [messageType, setMessageType] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const displayMessage = (text, type, timeout=messageTimeout) => {
    setMessageText(text)
    setMessageType(type)
    setTimeout(() => {
    setMessageText('')
    }, timeout)
  }

  const changeUsername = (event) => setUsername(event.target.value)
  const changePassword = (event) => setPassword(event.target.value)

  const changeTitle = (event) => setNewTitle(event.target.value)
  const changeAuthor = (event) => setNewAuthor(event.target.value)
  const changeUrl = (event) => setNewUrl(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login(username, password)
      console.log(user)
      setUser(user)
      window.localStorage.setItem(
        'bloglistLoginData', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      displayMessage('login successful!', 'success')
      setUsername('')
      setPassword('')
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
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log(`adding new blog with name ${newTitle}, author ${newAuthor}`)
    const newBlogData = {title: newTitle, author: newAuthor, url: newUrl}
    try {
      const blog = await blogService.createBlog(newBlogData)
      setBlogs(blogs.concat(blog))
      displayMessage(`a new blog ${blog.title} by ${blog.author} added`, 'success')
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
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

  const loginFormStates = [
    {
      label: 'username',
      type: 'text',
      value: username,
      onChange: changeUsername,
      id: 1
    },
    {
      label: 'password',
      type: 'password',
      value: password,
      onChange: changePassword,
      id: 2
    }
  ]

  const loginForm = {
    states: loginFormStates,
    header: 'Log in to application',
    buttonAction: handleLogin,
    buttonLabel: 'login'
  }
  
  const createFormStates = [
    {
      label: 'title',
      type: 'text',
      value: newTitle,
      onChange: changeTitle,
      id: 1
    },
    {
      label: 'author',
      type: 'text',
      value: newAuthor,
      onChange: changeAuthor,
      id: 2
    },
    {
      label: 'url',
      type: 'text',
      value: newUrl,
      onChange: changeUrl,
      id: 3
    }
  ]

  const createForm = {
    states: createFormStates,
    header: 'Add new blog',
    buttonAction: handleCreate,
    buttonLabel: 'add'
  }

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

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
      <View user={user} blogs={blogs} loginForm={loginForm} logoutAction={handleLogout} createForm={createForm} messageText={messageText} messageType={messageType}/>
    </div>
  );
}

export default App;
