import PieceComponent from "../../Pieces/Presentation/PieceComponent";
import Container from "../../_components/container/Container";
import Board from "../Entities/Board";
import CellComponent from "./CellComponent";

interface Props {
  board: Board;
}
function BoardComponent(props: Props) {
  const iterator = props.board.getIterator();
  const cells = [];
  let color = "#964d22";

  function flipColor() {
    if (color === "#964d22") {
      color = "#eedc97";
    } else {
      color = "#964d22";
    }
  }
  let count = 0;
  while (iterator.hasNext()) {
    const piece = props.board.getPieceAt(iterator.current());
    cells.push(
      <CellComponent cellColor={color}>
        <PieceComponent piece={piece} />
      </CellComponent>,
    );
    flipColor();
    count++;
    if (count === props.board.getColumnSize()) {
      flipColor();
      count = 0;
    }
    iterator.next();
  }
  return (
    <Container
      display="grid"
      gridTemplateColumns={`repeat(${props.board.getColumnSize()},1fr)`}
      gridTemplateRows={`repeat(${props.board.getRowSize()},1fr)`}
    >
      {cells.map((cell) => cell)}
    </Container>
  );
}
export default BoardComponent;
