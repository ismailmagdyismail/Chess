import { useState } from "react";
type Player = "player1" | "player2";
function useGame() {
  const [turn, setTurn] = useState<Player>("player1");
  const [activePiece, setActivePiece] = useState;

  function toggleTurn() {
    if (turn === "player1") {
      setTurn("player2");
    } else {
      setTurn("player1");
    }
  }

  return {
    toggleTurn,
  };
}
export default useGame;
