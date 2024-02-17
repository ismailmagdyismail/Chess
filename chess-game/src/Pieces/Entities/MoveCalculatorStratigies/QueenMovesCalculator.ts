import Board from "../../../Board/Entities/Board";
import IMoveCalculator from "./IMoveCalculator";
import Piece from "../Piece";
import MovementStatus from "../../../MoveService/MovementStatus";
import BishopMovesCalculator from "./BishopMovesCalculator";
import RookMovesCalculator from "./RookMovesCalculator";

class QueenMovesCalculator implements IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const bishopLikeMovements: MovementStatus[] =
      new BishopMovesCalculator().getPossibleMoves(piece, board);
    const rookLikeMovements: MovementStatus[] =
      new RookMovesCalculator().getPossibleMoves(piece, board);
    return [...bishopLikeMovements, ...rookLikeMovements].filter((move) => {
      const outOfBounds = board
        .getCellStatus(move.getDistination())
        .isOutOfBounds();
      const friendly = board
        .getPieceAt(move.getDistination())
        ?.isSameTeam(piece.getColor());
      if (!outOfBounds && !friendly) {
        return move;
      }
    });
  }
}

export default QueenMovesCalculator;
