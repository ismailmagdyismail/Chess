import Board from "../Board/Board";
import Position from "../Board/Position";
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
