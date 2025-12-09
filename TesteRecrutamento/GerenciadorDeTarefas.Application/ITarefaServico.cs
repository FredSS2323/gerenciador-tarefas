using GerenciadorDeTarefas.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GerenciadorDeTarefas.Application
{
    public interface ITarefaServico
    {
        Task<Tarefa> CriarAsync(Tarefa novaTarefa);
        Task<Tarefa?> ObterPorIdAsync(int id);
        Task<IEnumerable<Tarefa>> ObterTodasAsync();
        Task<Tarefa?> AtualizarAsync(Tarefa tarefa);
        Task<bool> DeletarAsync(int id);
    }
}
