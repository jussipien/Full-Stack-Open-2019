import {useState} from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const returned = {
    type,
    value,
    onChange,
    reset
  }

  // remove reset from spread syntax
  Object.defineProperty(returned, 'reset', {
    enumerable: false
  })

  return returned
}