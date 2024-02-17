import Board from "../../../Board/Entities/Board";
import IMoveCalculator from "./IMoveCalculator";
import Piece from "../Piece";
import Position, { PositionBuilder } from "../../../Board/Entities/Position";
import { createMovement } from "../../../MoveService/MovementFactory";
import MovementStatus from "../../../MoveService/MovementStatus";

class RookMovesCalculator implements IMoveCalculator {
  public getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const initialPosition = board.getPiecePosition(piece.getId());
    if (initialPosition === undefined) {
      throw new Error(`Cannot get moves for Rook with id ${piece.getId()}`);
    }
    const validRightCells = this.getValidCells(
      initialPosition,
      piece,
      board,
      (positionBuilder: PositionBuilder) => positionBuilder.right(),
    );
    const validLeftCells = this.getValidCells(
      initialPosition,
      piece,
      board,
      (positionBuilder: PositionBuilder) => positionBuilder.left(),
    );
    const validUpCells = this.getValidCells(
      initialPosition,
      piece,
      board,
      (positionBuilder: PositionBuilder) => positionBuilder.up(),
    );
    const validDownCells = this.getValidCells(
      initialPosition,
      piece,
      board,
      (positionBuilder: PositionBuilder) => positionBuilder.down(),
    );
    return [
      ...validRightCells,
      ...validLeftCells,
      ...validUpCells,
      ...validDownCells,
    ];
  }
  private getValidCells(
    initialPosition: Position,
    piece: Piece,
    board: Board,
    transition: (positionBuilder: PositionBuilder) => void,
  ): MovementStatus[] {
    const movements: MovementStatus[] = [];
    const positionBuilder = new PositionBuilder(
      initialPosition,
      piece.getColor() === "black",
    );
    while (
      !board.getCellStatus(positionBuilder.getCurrentPosition()).isOutOfBounds()
    ) {
      transition(positionBuilder);
      const move: MovementStatus = createMovement(
        piece,
        positionBuilder.getCurrentPosition(),
        board.getCellStatus(positionBuilder.getCurrentPosition()),
      );
      if (move.isInvalid()) {
        break;
      }
      movements.push(move);
      if (move.isKill()) {
        break;
      }
    }
    return movements;
  }
}
export default RookMovesCalculator;
