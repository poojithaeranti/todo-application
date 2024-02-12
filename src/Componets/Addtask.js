import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./Style.css";
import { pngImage } from "../Images/Images";
import TodoList from "./TodoList";
import Status from "./Status";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModaljs from "./DeleteModaljs";
// import AlertMessage from "./AlertMessage";
const getLocalItems = () => {
  let list = localStorage.getItem('List')
  if (list) {
    return JSON?.parse(localStorage.getItem('List'))
  }
}
// let list = localStorage.getItem('List')
// console.log(list,'list')

// getLocalItems()

function Addtask() {

  const backGroundStyle = {
    modal: {
      background: "rgba(185, 220, 242, 0.0)",
      boxShadow: "none",
    },
  };
  // useEffect(() => {
  //   localStorage.setItem('List', JSON.stringify(todos))
  // }, [todos])

  const [modalOpen, setModal] = useState(false);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("completed");
  const [todos, setTodo] = useState(getLocalItems() || []);
  const [filteredTodos, setFilteredTodos] = useState([])
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTodoIndex, setEditedTodoIndex] = useState(null);
  const [filterValue, setFilterValue] = useState('All')
  const [isDeleteModal, setDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null);
  // console.log('filterValue', filterValue)
  useEffect(() => {
    setFilteredTodos(todos?.filter((todo) => todo.status === filterValue));
  }, [filterValue]);
  // console.log('filteredTodos:', filteredTodos);
  

  // console.log('filteredTodos =====', filteredTodos)
  useEffect(() => {
    localStorage.setItem('List', JSON.stringify(todos))
  }, [todos])

  const handleNotificationClick = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      // closeOnClick: true,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleNotificatiWarning = (message1) => {
    toast.error(message1, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      // closeOnClick: true,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
    });
  }

  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  const confirmDelete = () => {
    const newTodos = todos.filter((todo, index) => index !== deleteIndex);
    setTodo(newTodos);
    handleNotificationClick('Todo Deleted Successfully')
    setDeleteModal(false);
  };
  const deleteHandler = (indexValue) => {
    // setDeleteModal(true);
    // const newTodos = todos.filter((todo, index) => index !== indexValue);
    // setTodo(newTodos);
    // handleNotificationClick('Todo Deleted Successfully')
    setDeleteModal(true)
    setDeleteIndex(indexValue);
  };
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const time = current.toLocaleTimeString();
  const addHandler = (e) => {
    e.preventDefault();
    console.log({ time, date })
    const newTodo = [...todos, { task: task, status: status, time, date }];
    setTodo(newTodo);
    setTask("");
    setStatus("completed");
    handleNotificationClick('Task add successfully');
  };

  const UpdateTodo = (e) => {
    e.preventDefault();

    const updatedTodoList = [...todos];
    const updatedTodo = { task, status, time, date };
    updatedTodoList[editedTodoIndex] = updatedTodo;

    const isTodoUpdated =
      updatedTodo.task !== todos[editedTodoIndex].task ||
      updatedTodo.status !== todos[editedTodoIndex].status;

    if (isTodoUpdated) {
      setTodo(updatedTodoList);
      setTask("");
      setStatus("completed");
      setEditedTodoIndex(null);
      handleNotificationClick('Task Updated successfully');
    }
    else {
      setModal(true)
      handleNotificatiWarning('No changes made')
    }
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleAddNewTodo = () => {
    handleCloseModal();
    // handleNotificationClick();
  };

  const editHandler = (todoId, index) => {
    setTask(todoId.task);
    setStatus(todoId.status);
    setIsEditMode(true);
    setEditedTodoIndex(index);
    setModal(true);
  };

  return (
    // <AlertMessage></AlertMessage>
    <div>
      {/* <AlertMessage></AlertMessage> */}
      <div>
        <ToastContainer />
        <div className="flexContiner">
          <button
            className="buttonAddTask"
            onClick={() => {
              setModal(true);
              setIsEditMode(false);
              setTask("");
              setStatus("completed");
            }}
          >
            Add task
          </button>
          <Status filterValue={filterValue} setFilterValue={setFilterValue} />
        </div>
      </div>

      <Modal
        center
        styles={backGroundStyle}
        open={modalOpen}
        onClose={handleCloseModal}
        closeIcon={
          <img
            src={pngImage.iconImg}
            style={{ width: "25px", height: "25px" }}
            className="cancelX"
          />
        }
      >
        <div className="backGroundForm">
          <form onSubmit={(e) => {
            e.preventDefault()
            if (task) {
              isEditMode ? UpdateTodo(e) : addHandler(e)

            } else {
              handleNotificatiWarning('Please enter a title')
            }
          }}>
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
            <select
              value={status}
              className="textbar"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"incomplete"}>Incomplete</option>
              <option value={"completed"}>Completed</option>
            </select>
            <div className="flex">
              <button
                onClick={() => {
                  if (task) {
                    handleAddNewTodo('Please enter a title')
                  }

                }}
                value="submit"
                className="buttonAddTask toAddTodo"
              >
                {isEditMode ? "Update Todo" : `Add Task`}
              </button>
            </div>
          </form>
          <button className="cancelButton" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>
      <div className="backgroundForTodo">
        <div>
          <TodoList
            todolist={todos}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            status={Status}
            filteredTodos={filteredTodos}
            filterValue={filterValue}
            setTodoList={setTodo}
            setFilteredTodos={setFilteredTodos}
          />
          {!filteredTodos?.length &&
            ((filterValue === 'completed' && filteredTodos?.length === 0) ||
              (filterValue === 'incomplete' && filteredTodos?.length === 0) ||
              (filterValue === 'All' && todos?.length === 0)) && (
              <div>
                <div className="hiddenText">No Todos</div>
              </div>
            )}
          <DeleteModaljs isDeleteModal={isDeleteModal} setDeleteModal={setDeleteModal} confirmDelete={confirmDelete}></DeleteModaljs>
        </div>
      </div>
    </div>
  );
}

export default Addtask;
