import { useState } from "react";
// import Board from "./Board/Board";
interface Player {
  pieceColor: PieceColor;
}
const player1: Player = {
  pieceColor: "white",
};
const player2: Player = {
  pieceColor: "black",
};
function useGame() {
  const [turn, setTurn] = useState<Player>(player1);
  // const [board, setBoard] = useState<Board>(new Board());
  // const [activePiece, setActivePiece] = useState;

  function toggleTurn() {
    if (turn.pieceColor === "white") {
      setTurn(player2);
    } else {
      setTurn(player1);
    }
  }

  return {
    toggleTurn,
  };
}
export default useGame;
