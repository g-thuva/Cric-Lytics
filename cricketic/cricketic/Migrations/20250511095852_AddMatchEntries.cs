using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cricketic.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchEntries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BowlingOverPerformances",
                columns: table => new
                {
                    OverPerformanceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlayerID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlayerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OverNumber = table.Column<int>(type: "int", nullable: false),
                    RunsInOver = table.Column<int>(type: "int", nullable: false),
                    ExtrasInOver = table.Column<int>(type: "int", nullable: false),
                    WicketBalls = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BowlingOverPerformances", x => x.OverPerformanceID);
                });

            migrationBuilder.CreateTable(
                name: "MatchEntries",
                columns: table => new
                {
                    MatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OppositeTeamName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TossResult = table.Column<int>(type: "int", nullable: false),
                    FirstInnings = table.Column<int>(type: "int", nullable: false),
                    MatchStatus = table.Column<int>(type: "int", nullable: false),
                    Venue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchEntries", x => x.MatchId);
                });

            migrationBuilder.CreateTable(
                name: "PlayerPerformances",
                columns: table => new
                {
                    PerformanceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlayerID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlayerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BattingPosition = table.Column<int>(type: "int", nullable: false),
                    Runs = table.Column<int>(type: "int", nullable: false),
                    BallsFaced = table.Column<int>(type: "int", nullable: false),
                    Sixes = table.Column<int>(type: "int", nullable: false),
                    Fours = table.Column<int>(type: "int", nullable: false),
                    IsOut = table.Column<bool>(type: "bit", nullable: false),
                    OutMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fielder1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fielder2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bowler = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OutOverBall = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalBall = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalWicket = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Record = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerPerformances", x => x.PerformanceID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BowlingOverPerformances");

            migrationBuilder.DropTable(
                name: "MatchEntries");

            migrationBuilder.DropTable(
                name: "PlayerPerformances");
        }
    }
}
