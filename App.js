import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  // Initialize tasks from local storage if available
  const [toDo, setToDo] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(toDo));
  }, [toDo]);

  // Function to generate unique ID
  const generateId = () => {
    return Date.now(); // Simple unique ID generator
  };

  // Add task
  const addTask = () => {
    if (newTask) {
      let newEntry = { id: generateId(), title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  // Delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Mark task as done or completed
  const markDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTasks);
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  };

  // Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // Update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br /><br />
      <h2>To Do List App (ReactJS)</h2>
      <br /><br />
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-success mr-20"
                onClick={updateTask}
              >
                Update
              </button>
              <button
                className="btn btn-lg btn-warning"
                onClick={cancelUpdate}
              >
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-lg btn-success"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}
      {/* If there are no to-dos in state, display a message */}
      {toDo && toDo.length ? '' : 'No tasks...'}
      {/* Show to-dos */}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => (
          <div className="col taskBg" key={task.id}>
            <div
              className={task.status ? 'done' : ''}
            >
              <span className="taskNumber">{index + 1}</span>
              <span className="taskText">{task.title}</span>
            </div>
            <div className="iconsWrap">
              <span
                onClick={() => markDone(task.id)}
                title="Completed / Not Completed"
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              {task.status ? null : (
                <span
                  title="Edit"
                  onClick={() => setUpdateData({ id: task.id, title: task.title, status: task.status })}
                >
                  <FontAwesomeIcon icon={faPen} />
                </span>
              )}
              <span
                onClick={() => deleteTask(task.id)}
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;