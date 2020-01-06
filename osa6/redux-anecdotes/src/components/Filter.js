import React from 'react'
import {connect} from 'react-redux'
import {changeFilter, clearFilter} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }

  const handleClear = () => {
    props.clearFilter()
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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  changeFilter,
  clearFilter
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Filter)

export default ConnectedAnecdoteList