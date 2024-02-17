import Position from "../Board/Entities/Position";

export type MovementType = "occupy" | "kill" | "invalid";

class MovementStatus {
  private readonly distination: Position;
  private readonly movementType: MovementType;
  public constructor(distination: Position, movementType: MovementType) {
    this.distination = distination;
    this.movementType = movementType;
  }
  public isKill(): boolean {
    return this.movementType === "kill";
  }
  public isInvalid(): boolean {
    return this.movementType === "invalid";
  }
  public getDistination(): Position {
    return this.distination;
  }
  public getMovementType(): MovementType {
    return this.movementType;
  }
}

export default MovementStatus;
