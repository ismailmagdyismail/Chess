import Container from "../../_components/container/Container";
import createIconComponent from "./PieceIconFactory";
import { ReactNode } from "react";
import Piece from "../Entities/Piece";

interface Props {
  piece: Piece | undefined;
}

function PieceComponent(props: Props) {
  const icon: ReactNode = createIconComponent(props.piece);
  return <Container fontSize={"4.2rem"}>{icon}</Container>;
}
export default PieceComponent;
