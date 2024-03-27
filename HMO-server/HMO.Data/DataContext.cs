using HMO.Core.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Member> members { get; set; }
        public DbSet<Vaccination> vaccinations { get; set; }
        public DbSet<Producer> Producer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=HMO_DB");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vaccination>()
                .HasOne(v => v.Producer)
                .WithMany()
                .HasForeignKey(v => v.ProducerId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Member>()
                .HasMany(m => m.Vaccinations)
                .WithOne(v => v.Member)
                .OnDelete(DeleteBehavior.Cascade); // Configure cascade delete behavior
            base.OnModelCreating(modelBuilder);
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Configure the relationship between Members and Vaccinations
        //    modelBuilder.Entity<Member>()
        //        .HasMany(m => m.DiseaseDetails)
        //        .WithOne(v => v.Member)
        //        .OnDelete(DeleteBehavior.Cascade); // Configure cascade delete behavior
        //    base.OnModelCreating(modelBuilder);
        //}
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Disease>()
        //        .HasKey(d => d.Id); // החלטת מפתח ראשי, ניתן להחליף את "DiseaseId" בשם המתאים במודל שלך
        //}
    }
}
