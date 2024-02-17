import IMoveCalculator from "./IMoveCalculator";
import Board from "../../Board/Board";
import MovementStatus from "../../MoveService/MovementStatus";
import Piece from "../Piece";
import BishopMovesCalculator from "./BishopMovesCalculator";
import RookMovesCalculator from "./RookMovesCalculator";

class QueenMovesCalculator implements IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const bishopLikeMovements: MovementStatus[] =
      new BishopMovesCalculator().getPossibleMoves(piece, board);
    const rookLikeMovements: MovementStatus[] =
      new RookMovesCalculator().getPossibleMoves(piece, board);
    return [...bishopLikeMovements, ...rookLikeMovements];
  }
}

export default QueenMovesCalculator;
