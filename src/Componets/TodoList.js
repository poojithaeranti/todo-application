import { useState, useEffect } from 'react';
import deleteIcon from '../Images/deleteIcon.png'
import editimg from '../Images/editimg.png.png'

function TodoList({ todolist, deleteHandler, editHandler, filteredTodos, filterValue, setTodoList, setFilteredTodos }) {

  let todoData = filterValue === 'All' ? todolist : filteredTodos;
  // console.log()
  const handleOnChange = (index) => {
    let updatedTodoList = [...todolist];
    updatedTodoList[index].status = updatedTodoList[index].status === 'completed' ? 'incomplete' : 'completed';
    setTodoList(updatedTodoList);
  }

  useEffect(() => {
    const filtered = filterValue === 'All' ? todolist : todolist.filter((todo) => todo.status === filterValue);
    setFilteredTodos(filtered || []); // Ensure filteredTodos is an array
  }, [filterValue, todolist]);
  
  

  return (
    <div className="backgroundColorForTodo">
      {todoData?.map((todo, index) => (
        <div className="todoflex" key={index}>
          <div className="makeaToskFlex">
            <div>
              <input
                type="checkbox"
                checked={todo.status === "completed"}
                className="inputBox"
                onChange={() => handleOnChange(index)}
              />
            </div>
            <div className="setDate">
              <div
                className="tasktext"
                style={{
                  textDecoration:
                    todo.status === "completed"
                      ? "line-through" : "none"
                }}
              >
                {todo.task}
              </div>
              <div className="tomoveFlexelment">
                {todo.time} {todo.date}
              </div>
            </div>
          </div>
          <div className="buttonAndedit">
            <div className="deleButton">
              <img src={deleteIcon} onClick={() => deleteHandler(index)} style={{ width: '15px', height: '15px', padding: '8px' }} />
            </div>
            <div className="deleButton">
              <img src={editimg} onClick={() => editHandler(todo, index)} style={{ width: '15px', height: '15px', padding: '8px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
