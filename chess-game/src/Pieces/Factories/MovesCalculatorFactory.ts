import BishopMovesCalculator from "../MoveCalculatorStratigies/BishopMovesCalculator";
import IMoveCalculator from "../MoveCalculatorStratigies/IMoveCalculator";
import KingMovesCalculator from "../MoveCalculatorStratigies/KingMovesCalculator";
import KnightMovesCalculator from "../MoveCalculatorStratigies/KnightMovesCalculator";
import PawnMovesCalculator from "../MoveCalculatorStratigies/PawnMovesCalculator";
import QueenMovesCalculator from "../MoveCalculatorStratigies/QueenMovesCalculator";
import RookMovesCalculator from "../MoveCalculatorStratigies/RookMovesCalculator";
import { PieceType } from "../PieceType";

const movesMapping: Map<PieceType, IMoveCalculator> = new Map();
movesMapping.set("rook", new RookMovesCalculator());
movesMapping.set("queen", new QueenMovesCalculator());
movesMapping.set("pawn", new PawnMovesCalculator());
movesMapping.set("bishop", new BishopMovesCalculator());
movesMapping.set("knight", new KnightMovesCalculator());
movesMapping.set("king", new KingMovesCalculator());

function createMoveCalculator(pieceType: PieceType): IMoveCalculator {
  const movesCalculator = movesMapping.get(pieceType);
  if (!movesCalculator) {
    throw new Error(
      "Invalid piece type,Cannot create coressponding movement policy",
    );
  }
  return movesCalculator;
}
export default createMoveCalculator;
