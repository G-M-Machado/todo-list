function createCheckbox() {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add("boxcheck")
    return checkbox;
}

function createRemoveButton() {
    var button = document.createElement('button');
    button.textContent = 'X';
    button.classList.add("remove")
    button.innerHTML = "<i class='bx bxs-trash'></i>"
    return button;
}


//Cria o item na lisa, com checkbox, botão para remover o texto do input
function createListItem(text, checked) {
    var li = document.createElement('li');
    var checkbox = createCheckbox();
    checkbox.checked = checked; 
    li.appendChild(checkbox);
    var button = createRemoveButton();
    button.addEventListener('click', function() { //funcionalidade do botão de remover tarefa
        if (confirm('Deseja excluir este item?')) { // confirmação do usuario para remover tarefa
            li.parentNode.removeChild(li); //removendo tarefa da lista
            removeTask(text); //removendo tarefa do localStorage
            contagemList(); //executa função de contagem ao remover uma tarefa
        }
    });
    li.appendChild(button);
    var textNode = document.createTextNode(text);
    li.appendChild(textNode);
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            textNode.parentNode.style.textDecoration = "line-through"; //Estilização em tarefa concluída
            markTask(text, true); //marca tarefa como concluida
        } else {
            textNode.parentNode.style.textDecoration = "none"; //retorna estilização para não conluída
            markTask(text, false); //retorna para o status de não concluída
        }
    });
    contagemList(); //executa função de contagem ao adcionar nova tarefa
    return li; //retorna o item li criado
}


//Funcionalide do botão para adcionar nova tarefa
document.getElementById('button').addEventListener('click', function() {
    var ul = document.getElementById('list');
    var input = 
        document.getElementById('AddTarefa');
        if (input.value.length >= 1) {
            ul.appendChild(createListItem(input.value, false)); //Cria a tarefa através do input, com valor de conclusão false
            addTask(input.value); //Adiciona a tarefa no localStorage
            input.value = ''; //limpa o campo input
        } else { 
            alert("Insira uma tarefa")
        }
    } 
);

setInterval(contagemList, 1); //atualiza a contagem de tarefas total


//Function para contagem da lista
function contagemList() {
    let lista = document.querySelector("#list");
    let ListaContagem = lista.querySelectorAll('li').length;
    document.querySelector('#contagem').textContent = ListaContagem;
}

//Function para pegar as tarefas do localStorage
function getTasks() {
    var tasks = localStorage.getItem('tarefas');
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }
}

// function para adcionar a nova tarefa no localStorage
function addTask(text) {
    var tasks = getTasks();
    tasks.push({text: text, completed: false});
    localStorage.setItem('tarefas', JSON.stringify(tasks));
}

//function para marcar a tarefa como concluida no localStorage
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

//function para remover a tarefa do localStorage
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

//Carrega a lista do localStorage junto da página
window.addEventListener('load', function() {
    var tasks = getTasks();
    var ul = document.getElementById('list');
    for (var i = 0; i < tasks.length; i++) {
        ul.appendChild(createListItem(tasks[i].text, tasks[i].completed)); //Cria a lista de tarefas com texto e status de conclusão e as exibe na ul
    }
});
