import Board from "../Board/Entities/Board";
import Position from "../Board/Entities/Position";
import Piece from "../Pieces/Entities/Piece";
import MovementStatus from "./MovementStatus";

/// TODO change it to pure function with no side effects & return new board after updates instead of modifying params
function MoveService(piece: Piece, to: Position, board: Board): boolean {
  if (board.getCellStatus(to).isOutOfBounds()) {
    return false;
  }
  const possibleMoves: MovementStatus[] = piece.getPossibleMoves(board);
  const movementStatus = possibleMoves.find((move) =>
    move.getDistination().isEqual(to),
  );
  if (!movementStatus) {
    return false;
  }
  board.movePieceTo(piece, to);
  return true;
}

export default MoveService;
