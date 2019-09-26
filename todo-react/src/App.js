import React, { useState, useEffect } from 'react';
import Counter from './utils/counter';
import { getTasks } from './apis/task';
import { addTask, removeTask, toggleTask } from './functions';

const initialState = {
  counter: Counter(),
  tasks: [],
  taskTitle: '',
}

const fetchTasks = async ({ state, setState }) => {
  const tasks = await getTasks();
  const maxId = Math.max(0, ...tasks.map(task => task.id));
  console.log({...state, taskTitle: "ddd"});
  setState({
    ...state,
    counter: Counter(maxId + 1),
    tasks: tasks.slice(0, 9), 
  });
};

const App = () => {
  const [state, setState] = useState(initialState);
  const { tasks, taskTitle } = state;

  useEffect(() => {
    fetchTasks({ state, setState });
  }, []);

  const setTaskTitle = taskTitle => {
    setState({ ...state, taskTitle });
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      setState({...addTask(state, taskTitle), taskTitle: '' });
    }
  };

  const handleRemoveTask = taskId => {
    setState(removeTask(state, taskId));
  };

  const handleToggleTask = taskId => {
    setState(toggleTask(state, taskId));
  };

  return (
    <>
      <ul>
        {tasks.map(task =>
          <li key={task.id}>
            <input type="checkbox" checked={task.completed}
              onChange={e => handleToggleTask(task.id)}
            />
            {task.title}
            {task.completed && <span>[DONE]</span>}
            <button type="button"
              onClick={() => handleRemoveTask(task.id)}
            >
              Remove
            </button>
          </li>
          )}
      </ul>
      <div>
        <input type="text" value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />
        <button type="button"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </>
  );
};

export default App;