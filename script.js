
window.onload = function(){
    loadTask();

    document.getElementById("input1").addEventListener("keypress",function (e){
        if(e.key=="Enter"){
            addHandler();
        }
    });
};


function addHandler(){
    const input = document.getElementById("input1");
    const task = input.value.trim();
    if(task==""){
        return;
    }


    addTaskToList(task);
    saveTask(task);
    input.value = "";

}


function addTaskToList(task){
    const li = document.createElement("li");
    li.innerText = task;


    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = function(){
        const newTask = prompt("edit your task",task);
        if(newTask && newTask.trim()!=""){
            updateTask(task,newTask.trim());
            li.firstChild.nodeValue= newTask.trim();
        }

    };


    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "delete-btn"
    delBtn.onclick = function(){
        li.remove();
        deleteTask(task);
    }

    li.appendChild(editBtn);
    li.appendChild(delBtn);

    document.getElementById("output").appendChild(li);

}


function saveTask(task){
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push(task);
localStorage.setItem("tasks",JSON.stringify(tasks));
}


function loadTask(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task));
}

function deleteTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t!=task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateTask(oldTask , newTask){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(oldTask);
    if(index!=-1){
        tasks[index] = newTask;
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

}