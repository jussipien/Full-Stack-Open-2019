import React from 'react'
import {changeFilter, clearFilter} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.store.dispatch(changeFilter(event.target.value))
  }

  const handleClear = () => {
    props.store.dispatch(clearFilter())
    document.getElementsByName('filter')[0].value = ''
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} name="filter"/>
      <div>
        <button onClick={handleClear}>clear</button>
      </div>
    </div>
  )
}

export default Filter