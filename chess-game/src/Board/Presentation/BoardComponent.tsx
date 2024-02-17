import { useGameContext } from "../../Game/GameContext";
import Container from "../../_components/container/Container";
import Board from "../Entities/Board";
import Position from "../Entities/Position";
import CellComponent from "./CellComponent";

interface Props {
  board: Board;
}
function BoardComponent(props: Props) {
  const { boardColors } = useGameContext();
  const cells = [];
  for (let i = 0; i < boardColors.length; i++) {
    for (let j = 0; j < boardColors[i].length; j++) {
      const piece = props.board.getPieceAt(new Position(i, j));
      cells.push(
        <CellComponent
          key={`${piece?.getId() || `empty-${i}+${j}`}`}
          cellColor={boardColors[i][j]}
          piece={piece}
          position={new Position(i, j)}
        />,
      );
    }
  }
  return (
    <Container
      display="grid"
      gap="0.25rem"
      gridTemplateColumns={`repeat(${props.board.getColumnSize()}, 1fr)`}
      gridTemplateRows={`repeat(${props.board.getRowSize()}, 1fr)`}
      borderRadius="12px"
      overflow="hidden"
    >
      {cells.map((cell) => cell)}
    </Container>
  );
}
export default BoardComponent;
