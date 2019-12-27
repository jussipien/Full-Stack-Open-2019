import React from 'react'
import {render, waitForElement} from '@testing-library/react'
jest.mock('./services/blogs')
import {prettyDOM} from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    ) 

    const blogs = component.container.querySelectorAll('.Blog')
    expect(blogs).toEqual(expect.arrayContaining([]))
    
  })

  test('if a user is logged in, blogs are rendered', async () => {

      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Donald Tester'
      }

      localStorage.setItem('bloglistLoginData', JSON.stringify(user))

      const component = render(
        <App />
      )

      component.rerender(<App />)

      await waitForElement(
        () => component.getByText('blogs')
      ) 

      const blog = component.container.querySelector('.Blog')

      console.log(prettyDOM(blog))

      expect(blog).toHaveTextContent(
        'Component testing is done with react-testing-library Tester'
      )

  })
})