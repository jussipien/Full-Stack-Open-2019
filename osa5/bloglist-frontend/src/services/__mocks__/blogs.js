const blogs = [
  {
    title: 'Component testing is done with react-testing-library',
    author: 'Tester',
    url: 'test.js',
    likes: 250
  }
]

let token = null

const setToken = newToken =>{
  token = `bearer ${newToken}`  
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default {getAll, setToken}
