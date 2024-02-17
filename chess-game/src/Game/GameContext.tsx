import React, { ReactNode, useState } from "react";
import Board from "../Board/Entities/Board";

interface Player {
  pieceColor: PieceColor;
}
const player1: Player = {
  pieceColor: "white",
};
const player2: Player = {
  pieceColor: "black",
};
interface GameProps {
  children: ReactNode;
}
interface GameContextType {
  toggleTurn: () => void;
  board: Board;
  turn: Player;
}
const GameContext = React.createContext<GameContextType | undefined>(undefined);
export function GameProvider(props: GameProps) {
  const [turn, setTurn] = useState<Player>(player1);
  const [board] = useState<Board>(new Board());
  // const [activePiece, setActivePiece] = useState;

  function toggleTurn() {
    if (turn.pieceColor === "white") {
      setTurn(player2);
    } else {
      setTurn(player1);
    }
  }
  return (
    <GameContext.Provider value={{ toggleTurn, board, turn }}>
      {props.children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("Game context used outside provide");
  }
  return context;
}
