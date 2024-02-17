import { CSSProperties } from "react";
import Container from "../../_components/container/Container";
import PieceComponent from "../../Pieces/Presentation/PieceComponent";
import Piece from "../../Pieces/Entities/Piece";
import { useGameContext } from "../../Game/GameContext";
import Position from "../Entities/Position";

interface Props {
  piece: Piece | undefined;
  position: Position;
  cellColor: CSSProperties["backgroundColor"];
  key: string;
}
function CellComponent(props: Props) {
  const { handleCellClick } = useGameContext();
  let cellColor = props.cellColor;

  return (
    <Container
      key={props.key}
      display="grid"
      alignItems="center"
      justifyContent="center"
      backgroundColor={cellColor}
      cursor={props.piece ? "pointer" : ""}
      onClick={() => handleCellClick(props.piece, props.position)}
    >
      <PieceComponent piece={props.piece} />
    </Container>
  );
}
export default CellComponent;
