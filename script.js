document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addTaskBtn');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const tasksCountSpan = document.getElementById('tasksCount');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const currentDateSpan = document.getElementById('currentDate');

    function setCurrentDate() {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        currentDateSpan.textContent = `${day}.${month}.${year}`;
    }

    function updateProgress() {
        const tasks = taskList.querySelectorAll('.task-item');
        const total = tasks.length;
        
        tasksCountSpan.textContent = `Всего: ${total}`;
        
        if (total === 0) {
            progressFill.style.width = '0%';
            progressPercent.textContent = '0%';
            return;
        }

        let completed = 0;
        tasks.forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            if (checkbox.checked) {
                completed++;
                task.classList.add('completed');
            } else {
                task.classList.remove('completed');
            }
        });

        const percent = Math.round((completed / total) * 100);
        progressFill.style.width = percent + '%';
        progressPercent.textContent = percent + '%';
    }

    function createTask(text, isChecked = false) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = isChecked;

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '✕';

        deleteBtn.addEventListener('click', function() {
            li.remove();
            updateProgress();
        });

        checkbox.addEventListener('change', updateProgress);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    function addNewTask() {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Введите название задачи');
            return;
        }

        const newTask = createTask(text, false);
        taskList.appendChild(newTask);
        taskInput.value = '';
        updateProgress();
    }

    function clearCompletedTasks() {
        const tasks = taskList.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            if (checkbox && checkbox.checked) {
                task.remove();
            }
        });
        updateProgress();
    }

    function setupExistingTasks() {
        const tasks = taskList.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            const deleteBtn = task.querySelector('.delete-btn');

            if (checkbox) {
                checkbox.addEventListener('change', updateProgress);
            }

            if (deleteBtn) {
                deleteBtn.addEventListener('click', function() {
                    task.remove();
                    updateProgress();
                });
            }
        });
        updateProgress();
    }

    addBtn.addEventListener('click', addNewTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTasks);

    setCurrentDate();
    setupExistingTasks();
});