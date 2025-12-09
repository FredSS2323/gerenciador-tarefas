# Gerenciador de Tarefas – Teste Técnico

Aplicação desenvolvida para o teste técnico, composta por **API ASP.NET** e **Frontend em HTML, CSS e JavaScript**.  
Permite criar, listar, filtrar, atualizar o status e excluir tarefas, com datas automáticas de criação e conclusão.

---

## 🚀 Tecnologias Utilizadas

### Backend
- .NET / ASP.NET Web API
- C#
- Entity Framework Core
- SQL Server

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)

---

## 📁 Estrutura do Projeto

/GerenciadorDeTarefas.Application
/GerenciadorDeTarefas.Domain
/GerenciadorDeTarefas.Infrastructure
/ListaTarefas

/Frontend
index.html
style.css
script.js


---

## 🛠 Configuração do Ambiente

### 📌 Requisitos
- Windows 10 ou 11  
- Visual Studio ou VS Code  
- .NET SDK instalado  
- SQL Server
- Git instalado  

---

## 🗄 Configurando o Banco de Dados

O projeto utiliza **SQL Server LocalDB**.  
A string de conexão está no `appsettings.json`:

```json
"ConnectionStrings": {
  "ConexaoPadrao": "Server=(localdb)\\MSSQLLocalDB;Database=GerenciadorTarefas;Trusted_Connection=True;"
}

Criando a base via migrations

Abra o terminal no projeto Backend

Execute:
```
Add-Migration Initial
Update-Database
```

Isso cria automaticamente a tabela Tarefas com as colunas:

Id (identity)

Titulo

Descricao

Status

DataCriacao

DataConclusao

▶️ Como Rodar o Projeto
👉 1. Backend (API)

No diretório do backend:

dotnet restore
dotnet build
dotnet run


A API iniciará em algo como:

https://localhost:7035
http://localhost:5027

👉 2. Frontend

Basta abrir o arquivo:

Frontend/index.html


em qualquer navegador moderno.

✔️ Funcionamento

Criar tarefas

Listar tarefas

Filtro por status

Alterar status

Quando status = Concluída → DataConclusao é gerada automaticamente

Quando status ≠ Concluída → DataConclusao volta para null

Excluir tarefa

Datas exibidas nos cards

🙋 Sobre o Autor

Projeto desenvolvido por Frederico como parte de avaliação técnica.