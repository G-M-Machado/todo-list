function createCheckbox() {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add("boxcheck");
    return checkbox;
}

function createRemoveButton() {
    var button = document.createElement('button');
    button.classList.add("remove");
    button.innerHTML = "<i class='bx bxs-trash bx-sm'></i>";
    return button;
}

function createListItem(text, checked) {
    var li = document.createElement('li');
    li.classList.add("listItem");
    var checkbox = createCheckbox();
    checkbox.checked = checked;
    li.appendChild(checkbox);
    var textNode = document.createTextNode(text);
    li.appendChild(textNode);
    var button = createRemoveButton();
    button.addEventListener('click', function() {
        if (confirm('Deseja excluir este item?')) {
            li.parentNode.removeChild(li);
            removeTask(text);
            listLenght();
        }
    });
    li.appendChild(button);
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            textNode.parentNode.style.textDecoration = "line-through";
            markTask(text, true);
        } else {
            textNode.parentNode.style.textDecoration = "none";
            markTask(text, false);
        }
    });
    listLenght();
    return li;
}

document.getElementById('button').addEventListener('click', function() {
    var ul = document.getElementById('list');
    var input = document.getElementById('addTarefa');
    if (input.value.length >= 1) {
        ul.appendChild(createListItem(input.value, false));
        addTask(input.value);
        input.value = '';
    } else {
        alert("Insira uma tarefa");
    }
});

setInterval(listLenght, 1);

function listLenght() {
    let list = document.querySelector("#list");
    let listLenght = list.querySelectorAll('li').length;
    document.querySelector('#contagem').textContent = listLenght;
}

function getTasks() {
    var tasks = localStorage.getItem('tarefas');
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }
}

function addTask(text) {
    var tasks = getTasks();
    tasks.push({text: text, completed: false});
    localStorage.setItem('tarefas', JSON.stringify(tasks));
}

function markTask(text, state) {
    var tasks = getTasks();
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].text == text) {
            tasks[i].completed = state;
            break;
        }
    }
    localStorage.setItem('tarefas', JSON.stringify(tasks));
}

function removeTask(text) {
    var tasks = getTasks();
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].text == text) {
            tasks.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('tarefas', JSON.stringify(tasks));
}

function completedCheck() {
    let completed = document.querySelectorAll('.boxcheck');
    let textNode = document.querySelectorAll('li');

    for (let i = 0; i < completed.length; i++) {
        if (completed[i].checked) {
            textNode[i].style.textDecoration = "line-through";
        } else {
            textNode[i].style.textDecoration = "none";
        }
    }
}

window.addEventListener('load', function() {
    var tasks = getTasks();
    var ul = document.getElementById('list');
    for (var i = 0; i < tasks.length; i++) {
        ul.appendChild(createListItem(tasks[i].text, tasks[i].completed));
        completedCheck();
    }
});
