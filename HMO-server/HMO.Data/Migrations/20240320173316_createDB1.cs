using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMO.Data.Migrations
{
    public partial class createDB1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Producer",
                table: "vaccinations");

            migrationBuilder.AddColumn<int>(
                name: "ProducerId",
                table: "vaccinations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Producer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producer", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_vaccinations_ProducerId",
                table: "vaccinations",
                column: "ProducerId");

            migrationBuilder.AddForeignKey(
                name: "FK_vaccinations_Producer_ProducerId",
                table: "vaccinations",
                column: "ProducerId",
                principalTable: "Producer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_vaccinations_Producer_ProducerId",
                table: "vaccinations");

            migrationBuilder.DropTable(
                name: "Producer");

            migrationBuilder.DropIndex(
                name: "IX_vaccinations_ProducerId",
                table: "vaccinations");

            migrationBuilder.DropColumn(
                name: "ProducerId",
                table: "vaccinations");

            migrationBuilder.AddColumn<string>(
                name: "Producer",
                table: "vaccinations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
