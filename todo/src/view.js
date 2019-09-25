export const render = ({ tasks }) => {
  return `
    <ul>
      ${tasks.map(task => `
        <li>
          <input type="checkbox"
            id="checkbox-task-${task.id}"
            ${task.completed ? 'checked' : ''}
          />
          ${task.title}
          <button type="button" 
            id="button-remove-task-${task.id}"
          >
            Remove
          </button>
        </li>
      `).join('')}
    </ul>
    <div> 
      <input type="text" id="input-task-title">
      <button type="button" id="button-add-task">Add Task</button>
    </div>
  `;
};