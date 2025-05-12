using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cricketic.Migrations
{
    /// <inheritdoc />
    public partial class RecreateBowlingOverTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BowlingOverPerformances1");

            migrationBuilder.DropTable(
                name: "MatchDetails");

            migrationBuilder.DropTable(
                name: "OppositeMatchData");

            migrationBuilder.DropTable(
                name: "PlayerPerformances1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BowlingOverPerformances1",
                columns: table => new
                {
                    OverPerformanceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExtrasInOver = table.Column<int>(type: "int", nullable: false),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OverNumber = table.Column<int>(type: "int", nullable: false),
                    PlayerID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlayerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RunsInOver = table.Column<int>(type: "int", nullable: false),
                    WicketBalls = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BowlingOverPerformances1", x => x.OverPerformanceID);
                });

            migrationBuilder.CreateTable(
                name: "MatchDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstChoice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InicsT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MatchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchResult = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OppositeTeams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OurRun = table.Column<int>(type: "int", nullable: false),
                    Teams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TossResult = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OppositeMatchData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstChoice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InicsT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MatchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchResult = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OppositeTeams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OurRun = table.Column<int>(type: "int", nullable: false),
                    Teams = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TossResult = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OppositeMatchData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlayerPerformances1",
                columns: table => new
                {
                    PerformanceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BallsFaced = table.Column<int>(type: "int", nullable: false),
                    BattingPosition = table.Column<int>(type: "int", nullable: false),
                    Bowler = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fielder1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fielder2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fours = table.Column<int>(type: "int", nullable: false),
                    IsOut = table.Column<bool>(type: "bit", nullable: false),
                    MatchCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OutMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OutOverBall = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlayerID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlayerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Record = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Runs = table.Column<int>(type: "int", nullable: false),
                    Sixes = table.Column<int>(type: "int", nullable: false),
                    TotalBall = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalWicket = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerPerformances1", x => x.PerformanceID);
                });
        }
    }
}
