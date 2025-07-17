const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const totalTimeEl = document.getElementById('totalTime');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
  tasks.forEach(task => renderTask(task));
  updateTotalTime();
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('taskName').value.trim();
  const time = parseInt(document.getElementById('taskTime').value.trim());
  const category = document.getElementById('taskCategory').value;

  if (name && time) {
    const task = {
      name,
      time,
      category,
      createdAt: new Date().toLocaleString()
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(task);
    updateTotalTime();
    form.reset();
  }
});

function renderTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <div>
      <strong>${task.name}</strong> – ${task.time} min
      <div class="task-meta">${task.category} | ${task.createdAt}</div>
    </div>
    <button class="delete-btn">❌</button>
  `;

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    tasks = tasks.filter(t => t.createdAt !== task.createdAt);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTotalTime();
  });

  taskList.appendChild(li);
}

function updateTotalTime() {
  const total = tasks.reduce((acc, t) => acc + t.time, 0);
  totalTimeEl.innerText = total;
}
