import React from 'react'

const Notification = ({store}) => {
  const message = store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return message.length > 0 
    ? (
    <div style={style}>
      {message}
    </div>
    ) 
    : <></>
}

export default Notification