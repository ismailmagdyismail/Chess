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

    const rightUpwardDiagonal = new PositionBuilder(initialPosition, inverted)
      .rightUpwardDiagonal()
      .getCurrentPosition();
    const leftUpwardDiagonal = new PositionBuilder(initialPosition, inverted)
      .leftUpwardDiagonal()
      .getCurrentPosition();
    const rightDownwardDiagonal = new PositionBuilder(initialPosition, inverted)
      .rightDownwardDiagonal()
      .getCurrentPosition();
    const leftDownwardDigonal = new PositionBuilder(initialPosition, inverted)
      .leftDownwardDigonal()
      .getCurrentPosition();

    const upMove = createMovement(piece, up, board.getCellStatus(up));
    const rightMove = createMovement(piece, right, board.getCellStatus(right));
    const downMove = createMovement(piece, down, board.getCellStatus(down));
    const leftMove = createMovement(piece, left, board.getCellStatus(left));
    const upRightMove = createMovement(
      piece,
      rightUpwardDiagonal,
      board.getCellStatus(up),
    );
    const upLeftMove = createMovement(
      piece,
      leftUpwardDiagonal,
      board.getCellStatus(right),
    );
    const downRightMove = createMovement(
      piece,
      rightDownwardDiagonal,
      board.getCellStatus(down),
    );
    const downLeftMove = createMovement(
      piece,
      leftDownwardDigonal,
      board.getCellStatus(left),
    );

    return [
      upMove,
      rightMove,
      downMove,
      leftMove,
      upRightMove,
      upLeftMove,
      downRightMove,
      downLeftMove,
    ].filter((move) => {
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
export default KingMovesCalculator;
