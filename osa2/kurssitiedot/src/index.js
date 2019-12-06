import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = ({part}) => {
  return (
    <>
      <li>
        {part.name} {part.exercises}
      </li>
    </>
  )
}    

const Content = ({parts}) => {
  const listItems = () =>
    parts.map(part => <Part key={part.id} part={part}/>)
  return (
    <ul>
        {listItems()}
    </ul>
  )
}

const Total = ({parts}) => {
  // let amount = 0 
  const amount = parts.reduce((accumulator, {exercises}) => console.log(accumulator, exercises) || accumulator + exercises, 0)
  // parts.forEach(part => {
  //   amount += part.exercises
  // })
  return (
    <>
      <b>Number of exercises {amount}</b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const courseItems = (courses) =>
    courses.map(part => <Course key={course.id} course={course}/>)

  return (
    <div>
      {courseItems}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))