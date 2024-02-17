import Board from "../../../Board/Entities/Board";
import Piece from "../Piece";
import MovementStatus from "../../../MoveService/MovementStatus";

interface IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[];
}
export default IMoveCalculator;
