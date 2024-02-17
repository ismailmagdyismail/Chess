import MovementStatus from "../MoveService/MovementStatus";

export function createColor(moveType: MovementStatus): string {
  if (moveType.isKill()) {
    return "red";
  }
  return "blue";
}
