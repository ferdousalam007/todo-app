
//load document
document.body.onload = function () {
    const tasks = loadTask();
    showUitasks(tasks);
}

// selecting the required elements
function getById(id) {
    return document.getElementById(id)
}

//get id
const addNewBtn = getById("addNewBtn");
const newTaskInp = getById("newTaskInp");
const task_list = getById("task_list");

//01 load all tasks
function loadTask() {
    const data = localStorage.getItem('tasks');
    let tasks;
    if (data) {
        tasks = JSON.parse(data);
    } else {
        tasks = [];
    }
    return tasks;
}
//01.01 load all tasks show on ui
function showUitasks(tasks) {
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("item");
        const status = task[1];
        let completed = '';
        if (status == 'completed') {
            completed = 'completed_task';
        }
        div.innerHTML = `<li class=${completed} data-tag=${task[0]}>${task[0]}</li>
                    <button class="edit"><i class="fas fa-pen"></i></button>
                    <button class="completed"><i class="fas fa-check"></i></button>
                    <button class="delete"><i class="fas fa-trash-can"></i></button>
        `;
        task_list.appendChild(div)

    })
}
//02 add task from input value
addNewBtn.addEventListener('click', function (e) {
    const inputValue = newTaskInp.value;
    newTaskInp.value = "";
    if (inputValue.trim() == "") {
        alert('fill the input value');
        return;
    }

    const tasks = loadTask();
    let uniqueValue = inputValue;
    tasks.forEach(task => {
        if (task[0] == inputValue) {
            uniqueValue += " ";
        }
    })
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `<li data-tag="${uniqueValue}">${inputValue}</li>
                    <button class="edit"><i class="fas fa-pen"></i></button>
                    <button class="completed"><i class="fas fa-check"></i></button>
                    <button class="delete"><i class="fas fa-trash-can"></i></button>
        `;
    task_list.appendChild(div)
    const taskArray = [uniqueValue, 'activate'];
    tasks.push(taskArray);
    setDataLocalStorage(tasks);

})
//03 setDataLocalStorage
function setDataLocalStorage(inputArraytask) {
    localStorage.setItem('tasks', JSON.stringify(inputArraytask));
}
//04 add 
task_list.addEventListener('click', function (event) {
    if (event.target.className == "delete") {
        deleteItem(event);
    }
    else if (event.target.className == "completed") {
        completedItem(event);
    }
    else if (event.target.className == "edit") {
        editItem(event);
    }
})
//05 delete task

function deleteItem(event) {
    const taskParent = event.target.parentElement;
    taskParent.remove();
    const taskItem = taskParent.firstElementChild.dataset.tag;
    const tasks = loadTask()
    let index;
    tasks.forEach((task, i) => {
        if (task[0] == taskItem) {
            index = i
        }
    })
    tasks.splice(index, 1);
    setDataLocalStorage(tasks)
}

//05 edit task