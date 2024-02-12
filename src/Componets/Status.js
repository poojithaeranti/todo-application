import React from 'react'

function Status({ filterValue, setFilterValue }) {
  return (
    <>
      <div className='spaceToAddTask'>
        <select className='drapDown' value={filterValue} onChange={(e) => setFilterValue(e.target.value)} >
          <option className='option' value={'All'} >All</option>
          <option className='option' value={'incomplete'} >Incomplete</option>
          <option className='option' value={'completed'}>Completed</option>
        </select>
      </div>
    </>
  )
}

export default Status
