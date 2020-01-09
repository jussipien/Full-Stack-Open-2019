import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Tester',
  url: 'test.js',
  likes: 250
}

describe('<SimpleBlog/>', () => {

  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog}/>
    )
  })

  test('renders content', () => {

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

  test('pressing like button twice fires its event and executes handler function two times', () => {

    const mockHandler = jest.fn()

    const component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = component.container.querySelector('.btn-like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
    
  })
})