using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cricketic.Migrations
{
    /// <inheritdoc />
    public partial class AddOppositeMatchData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OppositeMatchData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InicsT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TossResult = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstChoice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Teams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OppositeTeams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OurRun = table.Column<int>(type: "int", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MatchPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchResult = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OppositeMatchData", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OppositeMatchData");
        }
    }
}
