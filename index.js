// selecting the required elements
function getById(id) {
    return document.getElementById(id)
}
//get id
const addNewBtn = getById("addNewBtn");
const newTaskInp = getById("newTaskInp");
const task_list = getById("task_list");

//add event input button
addNewBtn.addEventListener("click", function () {
    let taskText = newTaskInp.value;
    if (!taskText) {
        alert("please input your task");
        return;
    }
    addTask(taskText);
    newTaskInp.value = "";
})
//adding task function
function addTask(taskText) {
    const item = document.createElement('div');
    item.classList = 'item';
    item.innerHTML = `<li>${taskText}</li>
        <button class="edit"><i class="fas fa-pen"></i></button>
        <button class="completed"><i class="fas fa-check"></i></button>
        <button class="delete"><i class="fas fa-trash-can"></i></button>
    `
    task_list.appendChild(item)
}

//get all event for editable task
task_list.addEventListener('click', function (e) {
    if (e.target.classList == 'delete') {
        removeList(e);
    }
    else if (e.target.classList == 'completed') {
        completeList(e)
    }
    else if (e.target.classList == 'edit') {
        editList(e);
    }
})

//delete list
function removeList(event){
    event.target.parentElement.remove();
}
//complete task
function completeList(event){
    const completeList= event.target.parentElement.firstElementChild;
    completeList.classList.toggle('completed_task')
}