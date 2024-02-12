import React from 'react'

function createList(data) {
  return (
    <div>
      {data.map((todos)=>{
        <li>{todos}</li>
      }
      )}
    </div>
  )
}

export default createList
