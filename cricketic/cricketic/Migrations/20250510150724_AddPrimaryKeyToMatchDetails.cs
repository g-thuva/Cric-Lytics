using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cricketic.Migrations
{
    /// <inheritdoc />
    public partial class AddPrimaryKeyToMatchDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Matchcode",
                table: "MatchDetails",
                newName: "MatchCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MatchCode",
                table: "MatchDetails",
                newName: "Matchcode");
        }
    }
}
