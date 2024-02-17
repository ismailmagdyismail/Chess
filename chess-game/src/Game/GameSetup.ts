import Board from "../Board/Entities/Board";
import Position from "../Board/Entities/Position";
import createPiece from "../Pieces/Entities/Factories/PieceFactory";
import { BOARD_COL_COUNT, BOARD_ROW_COUNT } from "./constants";

export function populateBoard(): Board {
  const board: Board = new Board();
  board.putPieceAt(createPiece("rook", "black"), new Position(0, 0));
  board.putPieceAt(createPiece("knight", "black"), new Position(0, 1));
  board.putPieceAt(createPiece("bishop", "black"), new Position(0, 2));
  board.putPieceAt(createPiece("queen", "black"), new Position(0, 3));
  board.putPieceAt(createPiece("king", "black"), new Position(0, 4));
  board.putPieceAt(createPiece("bishop", "black"), new Position(0, 5));
  board.putPieceAt(createPiece("knight", "black"), new Position(0, 6));
  board.putPieceAt(createPiece("rook", "black"), new Position(0, 7));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 0));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 1));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 2));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 3));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 4));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 5));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 6));
  board.putPieceAt(createPiece("pawn", "black"), new Position(1, 7));

  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 0));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 1));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 2));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 3));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 4));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 5));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 6));
  board.putPieceAt(createPiece("pawn", "white"), new Position(6, 7));
  board.putPieceAt(createPiece("rook", "white"), new Position(7, 0));
  board.putPieceAt(createPiece("knight", "white"), new Position(7, 1));
  board.putPieceAt(createPiece("bishop", "white"), new Position(7, 2));
  board.putPieceAt(createPiece("queen", "white"), new Position(7, 3));
  board.putPieceAt(createPiece("king", "white"), new Position(7, 4));
  board.putPieceAt(createPiece("bishop", "white"), new Position(7, 5));
  board.putPieceAt(createPiece("knight", "white"), new Position(7, 6));
  board.putPieceAt(createPiece("rook", "white"), new Position(7, 7));

  return board;
}

export function getBoardBaseColors(): string[][] {
  const colors: string[][] = new Array(BOARD_ROW_COUNT);
  let color = "#964d22";
  function flipColor() {
    if (color === "#964d22") {
      color = "#eedc97";
    } else {
      color = "#964d22";
    }
  }
  for (let i = 0; i < colors.length; i++) {
    colors[i] = new Array(BOARD_COL_COUNT);
    for (let j = 0; j < colors[i].length; j++) {
      colors[i][j] = color;
      flipColor();
    }
    flipColor();
  }

  return colors;
}
