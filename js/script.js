const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const filterInput = document.getElementById('filter-input');
const deleteAllBtn = document.getElementById('delete-all');

const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const pendingTasks = document.getElementById('pending-tasks');
const progress = document.getElementById('progress');

let todos = [];

function renderTodos() {
    todoList.innerHTML = '';
    if (todos.length === 0) {
        todoList.innerHTML = '<tr><td colspan="4" class="empty">No tasks found</td></tr>';
    } else {
        todos.forEach((todo, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.date}</td>
                <td>${todo.completed ? 'Completed' : 'Pending'}</td>
                <td>
                    <button class="action-btn complete-btn" onclick="toggleComplete(${index})">✓</button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${index})">✗</button>
                </td>
            `;
            todoList.appendChild(tr);
        });
    }
    updateStats();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const progressPercent = total ? Math.round((completed / total) * 100) : 0;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    progress.textContent = progressPercent + '%';
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = dateInput.value;
    if (task === '' || date === '') {
        alert('Please fill task and date');
        return;
    }
    todos.push({ task, date, completed: false });
    todoInput.value = '';
    dateInput.value = '';
    renderTodos();
});

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

deleteAllBtn.addEventListener('click', () => {
    if (confirm('Delete all tasks?')) {
        todos = [];
        renderTodos();
    }
});

filterInput.addEventListener('keyup', (e) => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('#todo-list tr').forEach(row => {
        if (row.querySelector('td')) {
            const task = row.querySelector('td').textContent.toLowerCase();
            row.style.display = task.includes(text) ? '' : 'none';
        }
    });
});

renderTodos();

// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeSwitch.checked);
});
