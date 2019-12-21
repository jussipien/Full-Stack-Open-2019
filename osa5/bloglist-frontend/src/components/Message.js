import React from 'react'

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

export default Message