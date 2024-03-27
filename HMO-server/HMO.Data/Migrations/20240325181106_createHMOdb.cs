using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMO.Data.Migrations
{
    public partial class createHMOdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumOfVaccinations",
                table: "members");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumOfVaccinations",
                table: "members",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
