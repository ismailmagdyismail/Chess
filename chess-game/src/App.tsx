//// *********************************  GETTING PIECES POSSIBLE MOVES *********************************************************
/// require knowledge about board sizes and elements within could make an arugument that it is not leaky abstraction since board is always the same but this is bad design in general
/// could pass the board as an argument this would simplify getting the moves since you know if the cells are occuipied by enimes or friends or none at all and wouldn't require any extrea filtering after getting initial moves
//// could pass boundries of the board as params that way we only return values withing the board but this would require extra filtering to be done by the board in order to not return cells that are occupied by other pieces to the ui to b rendere
/// could make one of the above solutions + adding in a module to filter returned cells and mark retunred cells as blue or red and it would be used by all the pieces

//// could make it in a OOP + functional way in which we combine passing an object and grid to a stand alone function called get Positions

/////// stand alone SERVICESSSSSSSSS Domain driven design could be used to get positions and filter them in a polymorphic way
/// service 1- getValidMoves(board,piece) => delegates getting peices moves from a peice then filters them through the board
/// service 2- getValidMoves(board,piece) => is the strategy within itself whre every piece takes board as args
/// position is a value objcet

function App() {
  return <></>;
}

export default App;