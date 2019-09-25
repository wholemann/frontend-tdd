jest.mock('./utils/counter');
jest.mock('./apis/task');

import { setMockCount } from './utils/counter';
import { setMockTasks } from './apis/task';

import { clearTasks, getTasks, addTask, removeTask, toggleTask, fetchTasks } from './services';

import * as api from './apis/task';

beforeEach(() => {
  setMockCount(100);
  
  clearTasks();
});

test('addTask', () => {
  const tasks = addTask('Hello');

  expect(tasks).toEqual([
    { id: 100, title: 'Hello', completed: false },
  ])
});

test('getTasks', () => {
  expect(getTasks()).toEqual([]);
});

test('removeTask', () => {
  addTask('Hello');

  const tasks = removeTask(100);

  expect(tasks).toEqual([]);
});

test('toggleTask', () => {
  addTask('Hello');

  let tasks = toggleTask(100);

  expect(tasks).toEqual([
    {id: 100, title: 'Hello', completed: true },
  ]);

  tasks = toggleTask(100);

  expect(tasks).toEqual([
    {id: 100, title: 'Hello', completed: false },
  ]);
});

test('fetchTasks', async() => {
  api.getTasks = jest.fn().mockResolvedValue([
    { id: 100, title: 'Hello', completed: false },
  ]);

  // setMockTasks([
  //   { id: 100, title: 'Hello', completed: false },
  // ]);

  const tasks = await fetchTasks();

  expect(tasks).toEqual([
    { id: 100, title: 'Hello', completed: false },
  ]);
});