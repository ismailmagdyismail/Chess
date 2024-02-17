import React, { ReactNode, useEffect, useState } from "react";
import Board from "../Board/Entities/Board";
import { getBoardBaseColors, populateBoard } from "./GameSetup";
import Piece from "../Pieces/Entities/Piece";
import Position from "../Board/Entities/Position";
import MoveService from "../MoveService/MoveService";
import { createColor } from "./ColorFactory";

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
  board: Board;
  turn: Player;
  boardColors: string[][];
  activePiece: Piece | undefined;
  toggleTurn: () => void;
  handleCellClick: (piece: Piece | undefined, position: Position) => void;
}
const GameContext = React.createContext<GameContextType | undefined>(undefined);
export function GameProvider(props: GameProps) {
  const [turn, setTurn] = useState<Player>(player1);
  const [board, setBoard] = useState<Board>(populateBoard());
  const [activePiece, setActivePiece] = useState<Piece | undefined>(undefined);
  const [boardColors, setBoardColors] =
    useState<string[][]>(getBoardBaseColors());

  useEffect(() => {
    handleActivePieceChange();
  }, [activePiece]);

  function toggleTurn() {
    if (turn.pieceColor === "white") {
      setTurn(player2);
    } else {
      setTurn(player1);
    }
  }
  function handleActivePieceChange() {
    if (activePiece === undefined) {
      setBoardColors(getBoardBaseColors);
      return;
    }
    const boardColors = getBoardBaseColors();
    const possibleMoves = activePiece.getPossibleMoves(board);
    for (let i = 0; i < possibleMoves.length; i++) {
      const position = possibleMoves[i].getDistination();
      const color = createColor(possibleMoves[i]);
      boardColors[position.row][position.col] = color;
    }
    const activePiecePostion = board.getPiecePosition(activePiece.getId());
    if (activePiecePostion !== undefined) {
      boardColors[activePiecePostion.row][activePiecePostion.col] = "brown";
    }
    setBoardColors(boardColors);
  }
  function updateActivePiece(piece: Piece | undefined) {
    if (piece === undefined) {
      return;
    }
    if (piece.getColor() === turn.pieceColor) {
      setActivePiece(piece);
    }
  }
  function handleMove(to: Position) {
    if (!activePiece) {
      return;
    }
    const isSuccessfulMove = MoveService(activePiece, to, board);
    if (!isSuccessfulMove) {
      return;
    }
    setBoard(board.clone());
    setActivePiece(undefined);
    toggleTurn();
  }
  function handleCellClick(piece: Piece | undefined, position: Position) {
    if (piece === undefined && !activePiece) {
      return;
    }
    if (piece !== undefined && piece.getColor() === turn.pieceColor) {
      updateActivePiece(piece);
      return;
    }
    handleMove(position);
  }
  return (
    <GameContext.Provider
      value={{
        toggleTurn,
        board,
        turn,
        handleCellClick,
        activePiece,
        boardColors,
      }}
    >
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
