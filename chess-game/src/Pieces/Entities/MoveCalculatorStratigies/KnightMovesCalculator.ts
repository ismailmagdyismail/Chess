import Board from "../../../Board/Entities/Board";
import IMoveCalculator from "./IMoveCalculator";
import Piece from "../Piece";
import { PositionBuilder } from "../../../Board/Entities/Position";
import { createMovement } from "../../../MoveService/MovementFactory";
import MovementStatus from "../../../MoveService/MovementStatus";

class KnightMovesCalculator implements IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const initialPosition = board.getPiecePosition(piece.getId());
    if (initialPosition === undefined) {
      throw new Error(`Cannot get moves for Knight with id ${piece.getId()}`);
    }
    const inverted = piece.getColor() === "black";
    const upRight = new PositionBuilder(initialPosition, inverted)
      .up()
      .up()
      .right()
      .getCurrentPosition();
    const upLeft = new PositionBuilder(initialPosition, inverted)
      .up()
      .up()
      .left()
      .getCurrentPosition();
    const downRight = new PositionBuilder(initialPosition, inverted)
      .down()
      .down()
      .right()
      .getCurrentPosition();
    const downLeft = new PositionBuilder(initialPosition, inverted)
      .down()
      .down()
      .left()
      .getCurrentPosition();
    const rightUp = new PositionBuilder(initialPosition, inverted)
      .right()
      .right()
      .up()
      .getCurrentPosition();
    const rightDown = new PositionBuilder(initialPosition, inverted)
      .right()
      .right()
      .down()
      .getCurrentPosition();
    const leftUp = new PositionBuilder(initialPosition, inverted)
      .left()
      .left()
      .up()
      .getCurrentPosition();
    const leftDown = new PositionBuilder(initialPosition, inverted)
      .left()
      .left()
      .down()
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
    const moveDownRight = createMovement(
      piece,
      downRight,
      board.getCellStatus(downRight),
    );
    const moveDownLeft = createMovement(
      piece,
      downLeft,
      board.getCellStatus(downLeft),
    );
    const moveRightUp = createMovement(
      piece,
      rightUp,
      board.getCellStatus(rightUp),
    );
    const moveRightDown = createMovement(
      piece,
      rightDown,
      board.getCellStatus(rightDown),
    );
    const moveLeftUp = createMovement(
      piece,
      leftUp,
      board.getCellStatus(leftUp),
    );
    const moveLeftDown = createMovement(
      piece,
      leftDown,
      board.getCellStatus(leftDown),
    );

    return [
      moveUpRight,
      moveUpLeft,
      moveDownRight,
      moveDownLeft,
      moveRightUp,
      moveRightDown,
      moveLeftUp,
      moveLeftDown,
    ];
  }
}

export default KnightMovesCalculator;
