import React from 'react'

const FormRow = ({label, state}) => {

  return (
    <tr>
      <td>
        <label htmlFor={label}>{label}:</label> 
      </td>
      <td>
        <input {...state} id={label} required={true}/>
      </td>
    </tr>
  )
}
  
const TableForm = ({states, header, buttonAction, buttonLabel}) => {
  const getStateRows = () => states.map(state => <FormRow key={state.id} state={state.state} label={state.label}/>)

  return (
    <section>
      <h2>{header}</h2>
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