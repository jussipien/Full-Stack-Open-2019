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

const updateBlog = async (id, blogData, updateType='fullUpdate') =>{
  const res = await axios.put(`${baseUrl}/${id}`, blogData, {headers: {Authorization: token, UpdateType: updateType}})
  return res.data
}

const deleteBlog = async (id) =>{
  const res = await axios.delete(`${baseUrl}/${id}`, {headers: {Authorization: token}})
  return res
}

export default {setToken, getAll, createBlog, updateBlog, deleteBlog} 