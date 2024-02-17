import { CSSProperties, ReactNode } from "react";
import Container from "../../_components/container/Container";

interface Props {
  children?: ReactNode;
  cellColor: CSSProperties["backgroundColor"];
}
function CellComponent(props: Props) {
  return (
    <Container
      display="grid"
      alignItems="center"
      justifyContent="center"
      backgroundColor={props.cellColor}
    >
      {props.children}
    </Container>
  );
}
export default CellComponent;
