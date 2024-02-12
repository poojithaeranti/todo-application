import React from 'react'
import './Style.css'
import Addtask from './Addtask'
function Heading() {
  return (
    <div>
      <h1 className='heading'>todo list</h1>
      <from className='flexContiner'>
        <Addtask></Addtask>
        </from>
    </div>
  )
}

export default Heading
