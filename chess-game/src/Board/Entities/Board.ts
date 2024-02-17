import Piece from "../../Pieces/Entities/Piece";
import Position, { PositionBuilder } from "./Position";
import CellStatus from "./CellStatus";
import { BOARD_COL_COUNT, BOARD_ROW_COUNT } from "../../Game/constants";

/// Position data is leaking here

class Board {
  private readonly grid: (Piece | undefined)[][];

  public constructor() {
    this.grid = new Array(BOARD_ROW_COUNT);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(BOARD_COL_COUNT);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][i] = undefined;
      }
    }
  }
  public putPieceAt(piece: Piece, position: Position) {
    if (this.getCellStatus(position).isOutOfBounds()) {
      return;
    }
    this.grid[position.row][position.col] = piece;
  }
  public movePieceTo(piece: Piece, distination: Position) {
    const oldPosition = this.getPiecePosition(piece.getId());
    if (
      this.getCellStatus(distination).isOutOfBounds() ||
      oldPosition === undefined
    ) {
      return;
    }
    this.grid[distination.row][distination.col] = piece;
    this.grid[oldPosition.row][oldPosition.col] = undefined;
  }
  public getRowSize(): number {
    return this.grid.length;
  }
  public getColumnSize(): number {
    return this.grid[0].length;
  }
  public getPieceAt(position: Position): Piece | undefined {
    if (
      this.getCellStatus(position).isOutOfBounds() ||
      this.getCellStatus(position).isFree()
    ) {
      return undefined;
    }
    return this.grid[position.row][position.col];
  }
  public getCellStatus(position: Position): CellStatus {
    if (
      position.row >= this.grid.length ||
      position.row < 0 ||
      position.col >= this.grid[0].length ||
      position.col < 0
    ) {
      return new CellStatus(false, true, undefined);
    }
    const cellContent: Piece | undefined =
      this.grid[position.row][position.col];
    if (cellContent !== undefined) {
      return new CellStatus(false, false, cellContent.getColor());
    }
    return new CellStatus(true, false, undefined);
  }

  public getPiecePosition(pieceId: number): Position | undefined {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j]?.isEqual(pieceId)) {
          return new Position(i, j);
        }
      }
    }
    return undefined;
  }
  public getIterator(): BoardIterator {
    return new BoardIterator(this);
  }
  public clone(): Board {
    const clonedBoard = new Board();
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const cellContent = this.grid[i][j];
        if (cellContent === undefined) {
          clonedBoard.grid[i][j] = undefined;
        } else {
          clonedBoard.grid[i][j] = cellContent.clone();
        }
      }
    }
    return clonedBoard;
  }
}
class BoardIterator {
  private positionBuilder: PositionBuilder;
  private board: Board;
  public constructor(board: Board) {
    this.positionBuilder = new PositionBuilder(new Position(0, 0), false);
    this.board = board;
  }
  public hasNext(): boolean {
    return !this.board.getCellStatus(this.current()).isOutOfBounds();
  }
  public current(): Position {
    return this.positionBuilder.getCurrentPosition();
  }
  public next(): void {
    this.positionBuilder.right();
    if (
      this.board
        .getCellStatus(this.positionBuilder.getCurrentPosition())
        .isOutOfBounds()
    ) {
      this.positionBuilder.down().resetHorizontal();
    }
  }
}
export default Board;
