import { PieceType } from "../PieceType";
import Piece from "../Piece";
import createMoveCalculator from "./MovesCalculatorFactory";

let id = 1;
function createPiece(pieceType: PieceType, color: PieceColor): Piece {
  const piece = new Piece(
    id,
    color,
    pieceType,
    createMoveCalculator(pieceType),
  );
  id++;
  return piece;
}

export default createPiece;
