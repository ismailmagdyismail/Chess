import Board from "../../../Board/Entities/Board";
import IMoveCalculator from "./IMoveCalculator";
import Piece from "../Piece";
import { PositionBuilder } from "../../../Board/Entities/Position";
import { createMovement } from "../../../MoveService/MovementFactory";
import MovementStatus from "../../../MoveService/MovementStatus";

class PawnMovesCalculator implements IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const initialPosition = board.getPiecePosition(piece.getId());
    if (initialPosition === undefined) {
      throw new Error(`Cannot get moves for Pawn with id ${piece.getId()}`);
    }
    const movements: MovementStatus[] = [];
    const upRight = new PositionBuilder(
      initialPosition,
      piece.getColor() === "black",
    )
      .rightUpwardDiagonal()
      .getCurrentPosition();
    const upLeft = new PositionBuilder(
      initialPosition,
      piece.getColor() === "black",
    )
      .leftUpwardDiagonal()
      .getCurrentPosition();
    const up = new PositionBuilder(
      initialPosition,
      piece.getColor() === "black",
    )
      .up()
      .getCurrentPosition();

    const moveUpRight = createMovement(
      piece,
      upRight,
      board.getCellStatus(upRight),
    );
    const moveUpLeft = createMovement(
      piece,
      upLeft,
      board.getCellStatus(upLeft),
    );
    if (moveUpLeft.isKill()) {
      movements.push(moveUpLeft);
    }
    if (moveUpRight.isKill()) {
      movements.push(moveUpRight);
    }
    const moveUp = createMovement(piece, up, board.getCellStatus(up));
    if (!moveUp.isKill()) {
      movements.push(moveUp);
    }
    return movements.filter((move) => {
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
export default PawnMovesCalculator;
