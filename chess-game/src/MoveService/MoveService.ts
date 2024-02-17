import Board from "../Board/Entities/Board";
import Position from "../Board/Entities/Position";
import { MovementType } from "./MovementStatus";

function MoveService(
  board: Board,
  from: Position,
  to: Position,
): MovementType | boolean {
  console.log(board, from, to);
  return "invalid";
}

export default MoveService;
