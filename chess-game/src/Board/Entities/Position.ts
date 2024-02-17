export default class Position {
  public row: number;
  public col: number;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
  public isEqual(other: Position): boolean {
    return this.row === other.row && this.col === other.col;
  }
  public clone(): Position {
    return new Position(this.row, this.col);
  }
}

/// to avoid leaking position internals to the outside , and making the transistion encapsulated
export class PositionBuilder {
  private readonly currentPosition: Position;
  private readonly inverted: boolean;
  public constructor(initialPosition: Position, inverted: boolean) {
    this.currentPosition = initialPosition.clone();
    this.inverted = inverted;
  }
  public getCurrentPosition(): Position {
    return this.currentPosition;
  }
  public up(): PositionBuilder {
    if (this.inverted) {
      this.currentPosition.row++;
    } else {
      this.currentPosition.row--;
    }
    return this;
  }
  public down(): PositionBuilder {
    if (this.inverted) {
      this.currentPosition.row--;
    } else {
      this.currentPosition.row++;
    }
    return this;
  }
  public left(): PositionBuilder {
    // if (this.inverted) {
    //   this.currentPosition.col++;
    // } else {
    //   this.currentPosition.col--;
    // }
    this.currentPosition.col--;
    return this;
  }
  public right(): PositionBuilder {
    // if (this.inverted) {
    //   this.currentPosition.col--;
    // } else {
    //   this.currentPosition.col++;
    // }
    this.currentPosition.col++;

    return this;
  }
  public rightUpwardDiagonal(): PositionBuilder {
    this.up();
    this.right();
    return this;
  }
  public rightDownwardDiagonal(): PositionBuilder {
    this.down();
    this.right();
    return this;
  }
  public leftUpwardDiagonal(): PositionBuilder {
    this.left();
    this.up();
    return this;
  }
  public leftDownwardDigonal(): PositionBuilder {
    this.left();
    this.down();
    return this;
  }
  public resetHorizontal(): PositionBuilder {
    while (this.currentPosition.col > 0) {
      this.left();
    }
    return this;
  }
  public resetVertical(): PositionBuilder {
    while (this.currentPosition.row > 0) {
      this.down();
    }
    return this;
  }
}
