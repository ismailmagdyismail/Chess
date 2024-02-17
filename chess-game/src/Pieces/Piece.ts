import { PieceType } from "./PieceType";
import Board from "../Board/Board";
import IMoveCalculator from "./MoveCalculatorStratigies/IMoveCalculator";
import MovementStatus from "../MoveService/MovementStatus";

class Piece {
  private readonly id: number;
  private readonly color: PieceColor;
  private readonly type: PieceType;
  private readonly moveCalculator: IMoveCalculator;
  constructor(
    id: number,
    color: PieceColor,
    type: PieceType,
    movesCalculatorFactory: (pieceType: PieceType) => IMoveCalculator,
  ) {
    this.id = id;
    this.color = color;
    this.type = type;
    this.moveCalculator = movesCalculatorFactory(this.type);
  }
  getPossibleMoves(board: Board): MovementStatus[] {
    return this.moveCalculator.getPossibleMoves(this, board);
  }
  isEqual(id: number): boolean {
    return this.id === id;
  }
  isSameTeam(other: PieceColor): boolean {
    return this.getColor() === other;
  }
  getColor(): PieceColor {
    return this.color;
  }
  getType(): PieceType {
    return this.type;
  }
  getId(): number {
    return this.id;
  }
}
export default Piece;
