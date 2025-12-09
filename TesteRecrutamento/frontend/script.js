const api = "https://localhost:7035/api/tarefas"; // ajuste se necessário

async function criarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const status = parseInt(document.getElementById("status").value);

    if (titulo.length === 0) {
        alert("O título é obrigatório.");
        return;
    }

    const dados = {
        titulo,
        descricao,
        status
    };

    await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    limparCampos();
    listarTarefas();
}

function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("status").value = 0;
}

async function listarTarefas() {
    const filtro = document.getElementById("filtro").value;
    const resposta = await fetch(api);
    const tarefas = await resposta.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas
        .filter(t => filtro === "" || t.status == filtro)
        .forEach(t => {
            const div = document.createElement("div");
            div.className = "tarefa";

            div.style.borderLeftColor = corStatus(t.status);

	div.innerHTML = `
<div class="titulo">${t.titulo}</div>
<div class="descricao">${t.descricao ?? ""}</div>

<div class="datas">
    <div class="data-criacao">
        Criado em: ${new Date(t.dataCriacao).toLocaleString()}
    </div>

    ${t.status === 2 && t.dataConclusao
        ? `<div class="data-conclusao">
               Concluído em: ${new Date(t.dataConclusao).toLocaleString()}
           </div>`
        : ""}
</div>

	<div class="status-controle">
    		<select onchange="atualizarStatus(${t.id}, this.value)">
        		<option value="0" ${t.status === 0 ? "selected" : ""}>Pendente</option>
        		<option value="1" ${t.status === 1 ? "selected" : ""}>Em Progresso</option>
        		<option value="2" ${t.status === 2 ? "selected" : ""}>Concluída</option>
    		</select>
	</div>

	<div class="botoes">
    		<button class="btn btn-perigo" onclick="deletarTarefa(${t.id})">Excluir</button>
	</div>
`;
            lista.appendChild(div);
        });
}

async function deletarTarefa(id) {
    await fetch(`${api}/${id}`, {
        method: "DELETE"
    });

    listarTarefas();
}

function nomeStatus(s) {
    switch (s) {
        case 0: return "Pendente";
        case 1: return "Em Progresso";
        case 2: return "Concluída";
    }
}

function classeStatus(s) {
    return ["status-pendente", "status-progresso", "status-concluida"][s];
}

function corStatus(s) {
    return ["#e67e22", "#0078ff", "#2ecc71"][s];
}

listarTarefas();

async function atualizarStatus(id, novoStatus) {
    const resposta = await fetch(`https://localhost:7035/api/tarefas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: novoStatus
        })
    });

    if (!resposta.ok) {
        alert("Erro ao atualizar status!");
        return;
    }

    carregarTarefas(); // recarrega lista
}

async function listarTarefas() {
    const filtro = document.getElementById("filtro").value;
    const resposta = await fetch(api);
    const tarefas = await resposta.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas
        .filter(t => filtro === "" || t.status == filtro)
        .forEach(t => {
            const div = document.createElement("div");
            div.className = "tarefa";

            div.style.borderLeftColor = corStatus(t.status);

            div.innerHTML = `
                <div class="titulo">${t.titulo}</div>
                <div class="descricao">${t.descricao ?? ""}</div>
		<div class="datas">
        	<div class="data-criacao">
           	   Criado em: ${new Date(t.dataCriacao).toLocaleString()}
       		</div>

        ${t.status === 2 && t.dataConclusao
            ? `<div class="data-conclusao">
                   Concluído em: ${new Date(t.dataConclusao).toLocaleString()}
               </div>`
            : ""}
    </div>

                <div class="status-controle">
                    <select onchange="atualizarStatus(${t.id}, this.value)">
                        <option value="0" ${t.status === 0 ? "selected" : ""}>Pendente</option>
                        <option value="1" ${t.status === 1 ? "selected" : ""}>Em Progresso</option>
                        <option value="2" ${t.status === 2 ? "selected" : ""}>Concluída</option>
                    </select>
                </div>

                <div class="botoes">
                    <button class="btn btn-perigo" onclick="deletarTarefa(${t.id})">
                        Excluir
                    </button>
                </div>
            `;
	  console.log("HTML do card:", div.innerHTML);
            lista.appendChild(div);
        });
}

async function atualizarStatus(id, novoStatus) {
    // 1) Buscar a tarefa atual
    const getRes = await fetch(`${api}/${id}`);
    if (!getRes.ok) { alert("Não foi possível obter a tarefa."); return; }
    const tarefa = await getRes.json();

    // 2) Atualizar o status (assegura que o objeto tenha Id e outros campos)
    tarefa.status = parseInt(novoStatus);

    // 3) Enviar o objeto completo no PUT
    const putRes = await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarefa)
    });

    if (!putRes.ok) {
        const texto = await putRes.text();
        alert("Erro ao atualizar: " + texto);
        return;
    }

    listarTarefas();
}

