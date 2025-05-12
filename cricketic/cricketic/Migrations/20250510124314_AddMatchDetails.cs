using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cricketic.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.CreateTable(
                name: "MatchDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Matchcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("PK_MatchDetails", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchDetails");

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MatchPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchResult = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OppositeTeams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OurRun = table.Column<int>(type: "int", nullable: false),
                    TargetRun = table.Column<int>(type: "int", nullable: false),
                    Teams = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    Balls = table.Column<int>(type: "int", nullable: false),
                    BallsFaced = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fielder = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fours = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OutStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OutType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RunOutReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Runs = table.Column<int>(type: "int", nullable: false),
                    Sixes = table.Column<int>(type: "int", nullable: false),
                    Suggestions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Wickets = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_Matches_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_MatchId",
                table: "Players",
                column: "MatchId");
        }
    }
}
