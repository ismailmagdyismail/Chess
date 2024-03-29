import CellStatus from "../Board/Entities/CellStatus";
import Position from "../Board/Entities/Position";
import Piece from "../Pieces/Entities/Piece";
import MovementStatus, { MovementType } from "./MovementStatus";

function createMovementType(
  movingPiece: Piece,
  distinationCellStatus: CellStatus,
): MovementType {
  if (distinationCellStatus.isOutOfBounds()) {
    return "invalid";
  }
  if (distinationCellStatus.isFree()) {
    return "occupy";
  }
  const occupierColor = distinationCellStatus.getOccupierColor();
  if (occupierColor === undefined) {
    return "invalid";
  }
  if (movingPiece.isSameTeam(occupierColor)) {
    return "invalid";
  }
  return "kill";
}

export function createMovement(
  movingPiece: Piece,
  distinationPosition: Position,
  distinationCellStatus: CellStatus,
): MovementStatus {
  const movementType = createMovementType(movingPiece, distinationCellStatus);
  return new MovementStatus(distinationPosition, movementType);
}
