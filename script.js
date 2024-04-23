function createCheckbox() {
    var checkbox = document.createElement('input'); // Cria um elemento de input
    checkbox.type = 'checkbox'; // Define o tipo do input como checkbox
    checkbox.classList.add("boxcheck"); // Adiciona a classe "boxcheck" ao input
    return checkbox; // Retorna o elemento de input criado
}

function createRemoveButton() {
    var button = document.createElement('button'); // Cria um elemento de botão
    button.textContent = 'X'; // Define o texto do botão como 'X'
    button.classList.add("remove"); // Adiciona a classe "remove" ao botão
    button.innerHTML = "<i class='bx bxs-trash bx-sm'></i>"; // Define o conteúdo HTML do botão
    return button; // Retorna o elemento de botão criado
}

// Cria um item na lista com checkbox, botão para remover o texto do input
function createListItem(text, checked) {
    var li = document.createElement('li'); // Cria um elemento de lista (li)
    li.classList.add("listItem"); // Adiciona a classe "listItem" ao elemento de lista
    var checkbox = createCheckbox(); // Cria um elemento de checkbox usando a função createCheckbox()
    checkbox.checked = checked; // Define o estado do checkbox como marcado ou não marcado
    li.appendChild(checkbox); // Adiciona o elemento de checkbox à lista
    var textNode = document.createTextNode(text); // Cria um nó de texto com o texto fornecido
    li.appendChild(textNode); // Adiciona o nó de texto à lista
    var button = createRemoveButton(); // Cria um elemento de botão usando a função createRemoveButton()
    button.addEventListener('click', function() { // Adiciona um evento de clique ao botão
        if (confirm('Deseja excluir este item?')) { // Exibe uma caixa de diálogo de confirmação
            li.parentNode.removeChild(li); // Remove o item da lista
            removeTask(text); // Remove a tarefa do localStorage
            contagemList(); // Executa a função de contagem ao remover uma tarefa
        }
    });
    li.appendChild(button); // Adiciona o elemento de botão à lista
    checkbox.addEventListener('change', function() { // Adiciona um evento de mudança ao checkbox
        if (checkbox.checked) {
            textNode.parentNode.style.textDecoration = "line-through"; // Estiliza o texto como tarefa concluída
            markTask(text, true); // Marca a tarefa como concluída
        } else {
            textNode.parentNode.style.textDecoration = "none"; // Remove a estilização de tarefa concluída
            markTask(text, false); // Marca a tarefa como não concluída
        }
    });
    contagemList(); // Executa a função de contagem ao adicionar uma nova tarefa
    return li; // Retorna o elemento de lista criado
}

// Adiciona um evento de clique ao botão para adicionar uma nova tarefa
document.getElementById('button').addEventListener('click', function() {
    var ul = document.getElementById('list'); // Obtém o elemento de lista (ul)
    var input = document.getElementById('addTarefa'); // Obtém o elemento de input
    if (input.value.length >= 1) {
        ul.appendChild(createListItem(input.value, false)); // Cria um novo item de lista com o texto do input e o estado de conclusão como falso
        addTask(input.value); // Adiciona a tarefa ao localStorage
        input.value = ''; // Limpa o campo de input
    } else {
        alert("Insira uma tarefa"); // Exibe um alerta se nenhum texto for inserido
    }
});

setInterval(contagemList, 1); // Atualiza a contagem total de tarefas

// Função para contar o número de itens na lista
function contagemList() {
    let lista = document.querySelector("#list"); // Obtém o elemento de lista (ul)
    let ListaContagem = lista.querySelectorAll('li').length; // Conta o número de elementos de lista (li)
    document.querySelector('#contagem').textContent = ListaContagem; // Atualiza o texto do elemento de contagem
}

// Função para obter as tarefas do localStorage
function getTasks() {
    var tasks = localStorage.getItem('tarefas'); // Obtém as tarefas do localStorage
    if (tasks) {
        return JSON.parse(tasks); // Retorna as tarefas como um objeto JSON
    } else {
        return []; // Retorna um array vazio se não houver tarefas no localStorage
    }
}

// Função para adicionar uma nova tarefa ao localStorage
function addTask(text) {
    var tasks = getTasks(); // Obtém as tarefas do localStorage
    tasks.push({text: text, completed: false}); // Adiciona a nova tarefa ao array de tarefas
    localStorage.setItem('tarefas', JSON.stringify(tasks)); // Salva as tarefas atualizadas no localStorage
}

// Função para marcar uma tarefa como concluída no localStorage
function markTask(text, state) {
    var tasks = getTasks(); // Obtém as tarefas do localStorage
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].text == text) {
            tasks[i].completed = state; // Atualiza o estado de conclusão da tarefa
            break;
        }
    }
    localStorage.setItem('tarefas', JSON.stringify(tasks)); // Salva as tarefas atualizadas no localStorage
}

// Função para remover uma tarefa do localStorage
function removeTask(text) {
    var tasks = getTasks(); // Obtém as tarefas do localStorage
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].text == text) {
            tasks.splice(i, 1); // Remove a tarefa do array de tarefas
            break;
        }
    }
    localStorage.setItem('tarefas', JSON.stringify(tasks)); // Salva as tarefas atualizadas no localStorage
}

// Carrega a lista de tarefas do localStorage quando a página é carregada
window.addEventListener('load', function() {
    var tasks = getTasks(); // Obtém as tarefas do localStorage
    var ul = document.getElementById('list'); // Obtém o elemento de lista (ul)
    for (var i = 0; i < tasks.length; i++) {
        ul.appendChild(createListItem(tasks[i].text, tasks[i].completed)); // Cria os itens de lista com base nas tarefas do localStorage
    }
});
