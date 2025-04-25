import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const matchData = [
  {
    id: 1,
    matchNumber: "Match 1",
    team1: { name: "India", logo: "india.png", runs: 250 },
    team2: { name: "Australia", logo: "australia.png", runs: 230 },
    date: "2025-02-28",
  },
  {
    id: 2,
    matchNumber: "Match 2",
    team1: { name: "England", logo: "england.png", runs: 180 },
    team2: { name: "Pakistan", logo: "pakistan.png", runs: 200 },
    date: "2025-02-27",
  },
];

const MatchTable = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/match/${id}`);
  };

  const [matchData, setMatchData

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Match Number</th>
            <th className="border p-2">Teams</th>
            <th className="border p-2">Team 1 Runs</th>
            <th className="border p-2">Team 2 Runs</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {matchData.map((match, index) => {
            const winner =
              match.team1.runs > match.team2.runs ? match.team1 : match.team2;
            return (
              <tr
                key={match.id}
                className={`cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => handleRowClick(match.id)}
              >
                <td className="border p-2">{match.matchNumber}</td>
                <td className="border p-2 flex items-center gap-2">
                  <img src={match.team1.logo} alt={match.team1.name} className="w-6 h-6" />
                  {match.team1.name} vs
                  <img src={match.team2.logo} alt={match.team2.name} className="w-6 h-6" />
                  {match.team2.name}
                </td>
                <td className="border p-2">{match.team1.runs}</td>
                <td
                  className={`border p-2 font-bold ${
                    match.team2 === winner ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {match.team2.runs}
                </td>
                <td className="border p-2">{match.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
