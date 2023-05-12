// Função para excluir nota

// Variável global para armazenar as notas
let notas = [];

// Função para adicionar uma nova nota
function adicionarNota() {
    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;
    
    if (titulo.trim() !== "" && texto.trim() !== "") {
        const nota = {
            id: Date.now(),
            titulo: titulo,
            texto: texto
        };

        
        notas.push(nota);
        
        const jsonObject = JSON.stringify(nota);
        localStorage.setItem(Date.now(), jsonObject);
        
        exibirNotas();
        limparFormulario();
    } else {
        alert("Título e texto são obrigatórios!");
    }
}

// Função para exibir as notas na tela
function exibirNotas() {
    const listaNotas = document.getElementById("lista-notas");
    listaNotas.innerHTML = "";

    notas.forEach(nota => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <div>
                <h4>${nota.titulo}</h4>
                <p>${nota.texto}</p>
            </div>
            <div>
                <button type="button" class="btn btn-secondary" onclick="editarNota(${nota.id})">Editar</button>
            </div>
        `;
        listaNotas.appendChild(li);
    });
}

function exibir_nota(nota) {
    const listaNotas = document.getElementById("lista-notas");
    listaNotas.innerHTML = "";

    notas.forEach(nota => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <div>
                <h4>${nota.titulo}</h4>
                <p>${nota.texto}</p>
            </div>
            <div>
                <button type="button" class="btn btn-secondary" onclick="editarNota(${nota.id})">Editar</button>
                <button type="button" class="btn btn-danger" onclick="excluirNota(${nota.id})">Excluir</button>
            </div>
        `;
        listaNotas.appendChild(li);
    });
}

function carregar_notas(){

    if(notas.length === 0){
        for(var i = 0; i< localStorage.length;i++){
            var key = localStorage.key(i);
            notajson = JSON.parse(localStorage[key]);
            const nota = {
                id: notajson.id,
                titulo: notajson.titulo,
                texto: notajson.texto
            };
            notas.push(nota);
            
        }
    }
    exibir_nota(notas);
}

function atualizar_localStorage(nota){
    for(var i = 0; i< localStorage.length;i++){
        var key = localStorage.key(i);
        notajson = JSON.parse(localStorage[key]);
        if(notajson.id == nota.id){
            const jsonObject = JSON.stringify(nota);
            localStorage.setItem(nota.id, jsonObject);
        }
        
    }
}

function delete_localStorage(nota){
    for(var i = 0; i< localStorage.length;i++){
        var key = localStorage.key(i);
        notajson = JSON.parse(localStorage[key]);
        if(notajson.id == nota.id){
            localStorage.removeItem(nota.id);
        }
        
    }
}



// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}


// Função para editar uma nota existente
function editarNota(id) {
    const nota = notas.find(nota => nota.id === id);
    if (nota) {
        const novoTitulo = prompt("Digite o novo título da nota:", nota.titulo);
        const novoTexto = prompt("Digite o novo texto da nota:", nota.texto);
        if (novoTitulo.trim() !== "" && novoTexto.trim() !== "") {
            nota.titulo = novoTitulo;
            nota.texto = novoTexto;
            atualizar_localStorage(nota);
            carregar_notas();
        } else {
            alert("Título e texto são obrigatórios!");
        }
    } else {
        alert("Nota não encontrada!");
    }
}

// Função para excluir uma nota existente
function excluirNota(id) {
    const index = notas.findIndex(nota => nota.id === id);
    if (index !== -1) {
        delete_localStorage(notas[index]);
        notas.splice(0, 1);
        carregar_notas();
    } else {
        alert("Nota não encontrada!");
    }
}


// Outras funções