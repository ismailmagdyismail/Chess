import Piece from "../Pieces/Piece";
import Position from "./Position";
import CellStatus from "./CellStatus";

const GRID_ROW_COUNT = 8;
const GRID_COLUMN_COUNT = 8;
/// Position data is leaking here

class Board {
  private readonly grid: (Piece | undefined)[][];

  public constructor() {
    this.grid = new Array(GRID_ROW_COUNT);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(GRID_COLUMN_COUNT);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][i] = undefined;
      }
    }
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
}
export default Board;
