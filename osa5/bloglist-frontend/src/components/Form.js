import React from 'react'
import Message from './Message'

const FormRow = ({label, type, value, onChange}) => {
  return (
    <tr>
      <td>
        <label htmlFor={label}>{label}:</label> 
      </td>
      <td>
        <input type={type} id={label} onChange={onChange} value={value} required={true}/>
      </td>
    </tr>
  )
}
  
const TableForm = ({states, header, buttonAction, buttonLabel, messageText, messageType}) => {
  const getStateRows = () => states.map(state => <FormRow key={state.id} label={state.label} type={state.type} value={state.value} onChange={state.onChange}/>)

  return (
    <section>
      <h2>{header}</h2>
      <Message text={messageText} type={messageType}/>
        <form>
          <table>
            <tbody>
              {getStateRows()}
            </tbody>
          </table>
          <button className="form-btn" onClick={buttonAction}>{buttonLabel}</button>
        </form>
    </section>
  )
}

export default TableForm