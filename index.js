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
    <div>
        <button class="edit"><i class="fas fa-pen"></i></button>
        <button class="completed"><i class="fas fa-check"></i></button>
        <button class="delete"><i class="fas fa-trash-can"></i></button>
    </div>`
    task_list.appendChild(item)
}