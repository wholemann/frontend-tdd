import { render } from './view';
import { getTasks, fetchTasks } from './services';
import { bindEvents } from './listener';

const bind = (id, eventType, callback) => {
  const el = document.getElementById(id);
  el.addEventListener(eventType, callback);
};

const getValue = id => {
  const el = document.getElementById(id);
  return el.value;
}

const update = () => {
  const state = {
    tasks: getTasks(),
  };
  
  const el = document.getElementById('app');
  el.innerHTML = render(state);

  bindEvents(state, { bind, getValue, update });
}

(async () => {
  await fetchTasks();
  update();
})();