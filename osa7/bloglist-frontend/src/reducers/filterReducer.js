export const changeFilter = (filter) => {
  console.log('change filter', filter)
  return {
    type: 'CHANGE_FILTER',
    data: {
      filter: filter
    }
  }  
}

export const clearFilter = () => {
  console.log('clear filter')
  return {
    type: 'CLEAR_FILTER'
  }  
}

const filterReducer = (state = '', action) => {
  console.log('action', action)
  
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data.filter
    case 'CLEAR_FILTER':
      return ''
    default: return state
  }
}

export default filterReducer