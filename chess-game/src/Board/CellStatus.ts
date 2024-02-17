export default class CellStatus {
  private readonly free: boolean;
  private readonly outOfBounds: boolean;
  private readonly occupierColor: PieceColor | undefined;

  public constructor(
    free: boolean,
    outOfBounds: boolean,
    occupierColor: PieceColor | undefined,
  ) {
    this.free = free;
    this.outOfBounds = outOfBounds;
    this.occupierColor = occupierColor;
  }
  public isOutOfBounds(): boolean {
    return this.outOfBounds;
  }
  public isFree(): boolean {
    return this.free;
  }
  public getOccupierColor(): PieceColor | undefined {
    return this.occupierColor;
  }
}
