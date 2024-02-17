import Board from "../../../Board/Entities/Board";
import { PositionBuilder } from "../../../Board/Entities/Position";
import { createMovement } from "../../../MoveService/MovementFactory";
import MovementStatus from "../../../MoveService/MovementStatus";
import Piece from "../Piece";
import IMoveCalculator from "./IMoveCalculator";

class KingMovesCalculator implements IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const initialPosition = board.getPiecePosition(piece.getId());
    if (initialPosition === undefined) {
      throw new Error(`Cannot get moves for King with id ${piece.getId()}`);
    }
    const inverted = piece.getColor() === "black";

    const up = new PositionBuilder(initialPosition, inverted)
      .up()
      .getCurrentPosition();
    const right = new PositionBuilder(initialPosition, inverted)
      .right()
      .getCurrentPosition();
    const down = new PositionBuilder(initialPosition, inverted)
      .down()
      .getCurrentPosition();
    const left = new PositionBuilder(initialPosition, inverted)
      .left()
      .getCurrentPosition();

    const upMove = createMovement(piece, up, board.getCellStatus(up));
    const rightMove = createMovement(piece, right, board.getCellStatus(right));
    const downMove = createMovement(piece, down, board.getCellStatus(down));
    const leftMove = createMovement(piece, left, board.getCellStatus(left));
    return [upMove, rightMove, downMove, leftMove];
  }
}
export default KingMovesCalculator;
