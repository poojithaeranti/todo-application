import { useState } from "react";
import createList from "./createList";

function Modal({ setModalOpen }) {
  const [task, setTask] = useState("");
  const [todos, setTodo] = useState([]);
  const changeHandler = (e) => {
    setTask(e.target.value);
  };
  const addHandler = (e) => {
    e.preventDefault();
    const newTodo = [...todos, task];
    setTodo(newTodo);
    setTask("");
  };

  return (
    <>
      <button onClick={() => setModalOpen(false)} className="cancelX">
        X
      </button>
      <div className="modalBackGround">
        <form onSubmit={addHandler}>
          <h1 className="addtodo">Add TODO</h1>
          <label className="title">Title</label>
          <br></br>
          <input
            type="text"
            value={task}
            onChange={changeHandler}
            className="textbar"
          ></input>
          <br></br>
          <label className="title">Status</label>
          <br></br>
          <select className="textbar">
            <option>Incomplete</option>
            <option>Completed</option>
          </select>
          <div className="flex">
            <button value="submit" className="buttonAddTask toAddTodo">
              Add Todo
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="cancelButton"
            >
              Cancel
            </button>
          </div>
        </form>
        <createList data={todos}></createList>
      </div>
    </>
  );
}

export default Modal;
