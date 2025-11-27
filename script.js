const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    // checkbox (visible and clickable)
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!task.completed;
    cb.addEventListener('change', () => {
      tasks[idx].completed = cb.checked;
      saveAndRender();
    });

    // text span
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text || '';
    // allow clicking text to toggle completed
    span.addEventListener('click', () => {
      tasks[idx].completed = !tasks[idx].completed;
      saveAndRender();
    });

    // delete button
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      tasks.splice(idx, 1);
      saveAndRender();
    });

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return; // empty ignored
  tasks.push({ text, completed: false });
  taskInput.value = '';
  saveAndRender();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// initial render
renderTasks();
