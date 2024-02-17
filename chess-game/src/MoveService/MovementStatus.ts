import Position from "../Board/Entities/Position";

export type MovementType = "occupy" | "kill" | "invalid";

class MovementStatus {
  private readonly distination: Position;
  private readonly movementType: MovementType;
  public constructor(distination: Position, movementType: MovementType) {
    this.distination = distination;
    this.movementType = movementType;
  }
  public getMovementColor(): string {
    if (this.movementType === "occupy") {
      return "blue";
    }
    if (this.movementType === "kill") {
      return "red";
    }
    return "transperant";
  }
  public isKill(): boolean {
    return this.movementType === "kill";
  }
  public getDistination(): Position {
    return this.distination;
  }
}

export default MovementStatus;
