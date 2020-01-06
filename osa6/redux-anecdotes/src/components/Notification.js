import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  const message = props.notification

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

const mapStateToProps = (state) => {
  console.log(state)
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
