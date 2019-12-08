import React from 'react'

const Header = ({name}) => {
  return (
    <>
      <h2>{name}</h2>
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
    <ul style={{listStyle: 'none'}}>
        {listItems()}
    </ul>
  )
}

const Total = ({parts}) => {
   
  // calculate total amount of exercises for course
  const amount = parts.reduce((accumulator, {exercises}) => console.log(accumulator, exercises) || accumulator + exercises, 0)
  // let amount = 0
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

export default Course