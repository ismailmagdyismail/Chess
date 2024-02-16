# Chess
chess game made using React + TS

## Design patterns used
- Strategy pattern to display diff movements based on the piece type
- builder pattern to encapsulate the change of the position away from clients using it
- factory pattern to encapsulate the creating of the pieces with thier corresponding stratgies based on the piece type and encapsulate creation of the type of movment (kill,occupyNewcell,invalid)
