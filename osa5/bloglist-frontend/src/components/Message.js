import React from 'react'
import PropTypes from 'prop-types'

const Message = ({text, type}) => {
  if (!!text) {
    const classes = `Message ${type}`
    return (
      <div className={classes}>
        <p>{text}</p>
      </div>
    )
  } else {
    return <></>
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Message