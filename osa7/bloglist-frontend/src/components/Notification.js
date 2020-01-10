import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  return !!notification
    ? (
    <div className={`Message ${notification.type}`}>
      {notification.text}
    </div>
    ) 
    : <></>
}

const mapStateToProps = (state) => {
  console.log(`state in notification: ${state.notification}`)
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification