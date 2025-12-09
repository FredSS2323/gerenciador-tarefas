using GerenciadorDeTarefas.Domain;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeTarefas.Infrastructure
{
    public class BancoContexto : DbContext
    {
        public BancoContexto(DbContextOptions<BancoContexto> options)
            : base(options)
        {
        }

        public DbSet<Tarefa> Tarefas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tarefa>(t =>
            {
                t.Property(x => x.Titulo)
                 .IsRequired()
                 .HasMaxLength(100);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
