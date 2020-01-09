import React from 'react'
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'

const Notification = (props) => {
  const text = props.notification.text
  const type = props.notification.type

  return (!!text)
    ? (
    <div className={`Message ${type}`}>
      {text}
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

// Notification.propTypes = {
//   text: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired
// }

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification