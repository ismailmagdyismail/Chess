import BoardComponent from "./Board/Presentation/BoardComponent";
import { useGameContext } from "./Game/GameContext";
import Container from "./_components/container/Container";
import ParagraphElement from "./_components/paragraphElement/ParagraphElement";
function App() {
  const { board, turn } = useGameContext();

  return (
    <Container
      display="grid"
      gridTemplateRows="auto 1fr"
      gap={"1.2rem"}
      padding={"4.2rem"}
    >
      <Container justifySelf="center" alignSelf="end">
        <ParagraphElement
          color="#964d22"
          text={`${turn.pieceColor} player turn`}
          fontSize={"2.4rem"}
        />
      </Container>
      <Container display="grid">
        <BoardComponent board={board} />
      </Container>
    </Container>
  );
}

export default App;
