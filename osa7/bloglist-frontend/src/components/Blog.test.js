import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Tester',
  url: 'test.js',
  likes: 250
}

describe('<Blog/>', () => {

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog}/>
    )
  })

  test('on initial render, component only displays blog title and author', () => {

    const blogMin = component.container.querySelector('.blog-min')
    const blogDetailed =  component.container.querySelector('.blog-detailed')

    console.log(prettyDOM(blogMin))

    expect(blogMin).toHaveTextContent(
      'Component testing is done with react-testing-library Tester'
    )

    expect(blogDetailed).toHaveStyle('display: none')

  })

  test('pressing initial div shows the full blog data', () => {

    const blogDiv = component.container.querySelector('.Blog')
    const blogMin = component.container.querySelector('.blog-min')
    const blogDetailed =  component.container.querySelector('.blog-detailed')

    fireEvent.click(blogMin)

    console.log(prettyDOM(blogDiv))

    expect(blogDetailed).not.toHaveStyle('display: none')

  })
})