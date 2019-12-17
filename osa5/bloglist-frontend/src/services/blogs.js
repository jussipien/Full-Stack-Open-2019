import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken =>{
  token = `bearer ${newToken}`  
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createBlog = async blogData => {
  const res = await axios.post(baseUrl, blogData, {headers: {Authorization: token}})
  return res.data
}

export default {setToken, getAll, createBlog} 