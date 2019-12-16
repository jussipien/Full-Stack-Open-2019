import React, { useState, useEffect  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
// import './App.css';

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

const TableForm = ({states, header, buttonAction, buttonLabel}) => {
  const getStateRows = () => states.map(state => <FormRow key={state.id} label={state.label} type={state.type} value={state.value} onChange={state.onChange}/>)

  return (
    <section>
      <h2>{header}</h2>
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

const TopView = ({user, blogs, form}) => {
  if (user === null) {
    return (
      <TableForm states={form.states} header={form.header} buttonAction={form.buttonAction} buttonLabel={form.buttonLabel}/>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user} logged in</p>
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
  // const [showAll, setShowAll] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [messageType, setMessageType] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const changeUsername = (event) => setUsername(event.target.value)
  const changePassword = (event) => setPassword(event.target.value)

  const changeTitle = (event) => setNewTitle(event.target.value)
  const changeAuthor = (event) => setNewAuthor(event.target.value)
  const changeUrl = (event) => setNewUrl(event.target.value)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    setUser(username)
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    console.log(`adding new blog with name ${newTitle}, author ${newAuthor}`)
    setNewTitle('')
    return setNewAuthor('')
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
  
  const newBlogFormStates = [
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

  const newBlogForm = {
    states: newBlogFormStates,
    header: 'Add new blog',
    buttonAction: handleBlogSubmit,
    buttonLabel: 'add'
  }

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  return (
    <div className="App">
      <TopView user={user} blogs={blogs} form={loginForm}/>
    </div>
  );
}

export default App;
