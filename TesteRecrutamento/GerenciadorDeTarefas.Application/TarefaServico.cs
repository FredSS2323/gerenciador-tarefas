using GerenciadorDeTarefas.Domain;
using GerenciadorDeTarefas.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GerenciadorDeTarefas.Application
{
    public class TarefaServico : ITarefaServico
    {
        private readonly BancoContexto _contexto;

        public TarefaServico(BancoContexto contexto)
        {
            _contexto = contexto;
        }

        public async Task<Tarefa> CriarAsync(Tarefa novaTarefa)
        {
            if (string.IsNullOrWhiteSpace(novaTarefa.Titulo))
                throw new Exception("O título é obrigatório.");

            if (novaTarefa.Titulo.Length > 100)
                throw new Exception("Título deve ter no máximo 100 caracteres.");

            if (novaTarefa.DataConclusao.HasValue &&
                novaTarefa.DataConclusao < novaTarefa.DataCriacao)
                throw new Exception("Data de conclusão não pode ser anterior à criação.");

            _contexto.Tarefas.Add(novaTarefa);
            await _contexto.SaveChangesAsync();
            return novaTarefa;
        }

        public async Task<Tarefa?> ObterPorIdAsync(int id)
        {
            return await _contexto.Tarefas.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<Tarefa>> ObterTodasAsync()
        {
            return await _contexto.Tarefas.ToListAsync();
        }

        public async Task<Tarefa?> AtualizarAsync(Tarefa tarefa)
        {
            var existente = await _contexto.Tarefas.FindAsync(tarefa.Id);

            if (existente == null) return null;

            existente.Titulo = tarefa.Titulo;
            existente.Descricao = tarefa.Descricao;
            existente.Status = tarefa.Status;
            existente.DataConclusao = tarefa.DataConclusao=DateTime.Now; 

            await _contexto.SaveChangesAsync();
            return existente;
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var existente = await _contexto.Tarefas.FindAsync(id);
            if (existente == null) return false;

            _contexto.Tarefas.Remove(existente);
            await _contexto.SaveChangesAsync();
            return true;
        }
    }
}
