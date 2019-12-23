import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Tester',
    url: 'test.js',
    likes: 250
  }

  const component = render(
    <SimpleBlog blog={blog}/>
  )

  expect(component.container.querySelector('.title')).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container.querySelector('.author')).toHaveTextContent(
    'Tester'
  )

  expect(component.container.querySelector('.likes')).toHaveTextContent(
    '250'
  )
})