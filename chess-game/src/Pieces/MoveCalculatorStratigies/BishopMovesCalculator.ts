import Board from "../../Board/Board";
import Position, { PositionBuilder } from "../../Board/Position";
import IMoveCalculator from "./IMoveCalculator";
import Piece from "../Piece";
import MovementStatus from "../../MoveService/MovementStatus";
import { createMovement } from "../../MoveService/MovementFactory";

class BishopMovesCalculator implements IMoveCalculator {
  public getPossibleMoves(piece: Piece, board: Board): MovementStatus[] {
    const initialPosition = board.getPiecePosition(piece.getId());
    if (initialPosition === undefined) {
      throw new Error(`Cannot get moves for Bishop with id ${piece.getId()}`);
    }
    const validUpRightDiagonalCells: MovementStatus[] = this.getValidCells(
      piece,
      initialPosition,
      board,
      (positionBuilder: PositionBuilder) =>
        positionBuilder.rightUpwardDiagonal(),
    );
    const validUpLeftDiagonalCells: MovementStatus[] = this.getValidCells(
      piece,
      initialPosition,
      board,
      (positionBuilder: PositionBuilder) =>
        positionBuilder.leftUpwardDiagonal(),
    );
    const validDownRightDiagonalCells: MovementStatus[] = this.getValidCells(
      piece,
      initialPosition,
      board,
      (positionBuilder: PositionBuilder) =>
        positionBuilder.rightDownwardDiagonal(),
    );
    const validDownLeftDiagonalCells: MovementStatus[] = this.getValidCells(
      piece,
      initialPosition,
      board,
      (positionBuilder: PositionBuilder) =>
        positionBuilder.leftUpwardDiagonal(),
    );
    return [
      ...validUpRightDiagonalCells,
      ...validUpLeftDiagonalCells,
      ...validDownRightDiagonalCells,
      ...validDownLeftDiagonalCells,
    ];
  }
  private getValidCells(
    piece: Piece,
    initialPosition: Position,
    board: Board,
    positionTransition: (positionBuilder: PositionBuilder) => void,
  ): MovementStatus[] {
    const validPositions: MovementStatus[] = [];
    const positionBuilder = new PositionBuilder(
      initialPosition,
      piece.getColor() === "black",
    );
    while (
      !board.getCellStatus(positionBuilder.getCurrentPosition()).isOutOfBounds()
    ) {
      const move: MovementStatus = createMovement(
        piece,
        positionBuilder.getCurrentPosition(),
        board.getCellStatus(positionBuilder.getCurrentPosition()),
      );
      if (move.getDistination().isEqual(initialPosition)) {
        continue;
      }
      validPositions.push(move);
      positionTransition(positionBuilder);
      if (move.isKill()) {
        break;
      }
    }
    return validPositions;
  }
}

export default BishopMovesCalculator;