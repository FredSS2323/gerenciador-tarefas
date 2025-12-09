using GerenciadorDeTarefas.Application;
using GerenciadorDeTarefas.Domain;
using Microsoft.AspNetCore.Mvc;

namespace GerenciadorDeTarefas.Api.Controllers
{
    [ApiController]
    [Route("api/tarefas")]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefaServico _servico;

        public TarefasController(ITarefaServico servico)
        {
            _servico = servico;
        }

        [HttpPost]
        public async Task<IActionResult> Criar(Tarefa tarefa)
        {
            try
            {
                var criada = await _servico.CriarAsync(tarefa);
                return Ok(criada);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodas()
        {
            return Ok(await _servico.ObterTodasAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var tarefa = await _servico.ObterPorIdAsync(id);
            return tarefa == null ? NotFound() : Ok(tarefa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, Tarefa tarefa)
        {
            if (id != tarefa.Id)
                return BadRequest("ID diferente do corpo da requisição.");

            var atualizada = await _servico.AtualizarAsync(tarefa);
            return atualizada == null ? NotFound() : Ok(atualizada);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var apagou = await _servico.DeletarAsync(id);
            return apagou ? NoContent() : NotFound();
        }
    }
}
