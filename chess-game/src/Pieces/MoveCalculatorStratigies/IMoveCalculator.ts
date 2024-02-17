import Board from "../../Board/Board";
import MovementStatus from "../../MoveService/MovementStatus";
import Piece from "../Piece";

interface IMoveCalculator {
  getPossibleMoves(piece: Piece, board: Board): MovementStatus[];
}
export default IMoveCalculator;
