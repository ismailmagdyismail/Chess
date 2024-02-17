import { ReactNode } from "react";
import { PieceType } from "../Entities/PieceType";
import { FaChessPawn } from "react-icons/fa6";
import {
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import Piece from "../Entities/Piece";

const iconMapping: Map<PieceType, (pieceColor: PieceColor) => ReactNode> =
  new Map();
iconMapping.set("rook", (pieceColor: PieceColor) => (
  <FaChessRook color={pieceColor} />
));
iconMapping.set("pawn", (pieceColor: PieceColor) => (
  <FaChessPawn color={pieceColor} />
));
iconMapping.set("bishop", (pieceColor: PieceColor) => (
  <FaChessBishop color={pieceColor} />
));
iconMapping.set("queen", (pieceColor: PieceColor) => (
  <FaChessQueen color={pieceColor} />
));
iconMapping.set("knight", (pieceColor: PieceColor) => (
  <FaChessKnight color={pieceColor} />
));
iconMapping.set("king", (pieceColor: PieceColor) => (
  <FaChessKing color={pieceColor} />
));

function createIconComponent(piece: Piece | undefined): ReactNode {
  if (piece === undefined) {
    return <div></div>;
  }
  const iconCreator: ((pieceColor: PieceColor) => ReactNode) | undefined =
    iconMapping.get(piece.getType());
  if (iconCreator === undefined) {
    return <div></div>;
  }
  return iconCreator(piece.getColor());
}
export default createIconComponent;
