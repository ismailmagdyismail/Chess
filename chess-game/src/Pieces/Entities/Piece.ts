import { PieceType } from "./PieceType";
import Board from "../../Board/Entities/Board";
import IMoveCalculator from "./MoveCalculatorStratigies/IMoveCalculator";
import MovementStatus from "../../MoveService/MovementStatus";

class Piece {
  private readonly id: number;
  private readonly color: PieceColor;
  private readonly type: PieceType;
  private readonly moveCalculator: IMoveCalculator;

  public constructor(
    id: number,
    color: PieceColor,
    type: PieceType,
    moveCalculator: IMoveCalculator,
  ) {
    this.id = id;
    this.color = color;
    this.type = type;
    this.moveCalculator = moveCalculator;
  }
  public getPossibleMoves(board: Board): MovementStatus[] {
    return this.moveCalculator.getPossibleMoves(this, board);
  }
  public isEqual(id: number): boolean {
    return this.id === id;
  }
  public isSameTeam(other: PieceColor): boolean {
    return this.getColor() === other;
  }
  public getColor(): PieceColor {
    return this.color;
  }
  public getType(): PieceType {
    return this.type;
  }
  public getId(): number {
    return this.id;
  }
  public clone(): Piece {
    return new Piece(this.id, this.color, this.type, this.moveCalculator);
  }
}
export default Piece;
