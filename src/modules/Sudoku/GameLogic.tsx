import { SubBoardClass } from "./SubBoard";

function getLeastAvailableMovesCellCoordinates(subBoards: SubBoardClass[][]): {x: number; y: number} {
  // Should be reasonable max to set it at
  let maxAvailableMoves = 10;
  const coordinates = {
    x: -1,
    y: -1
  };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const subBoard = subBoards[i][j];
      for (let x = 0; x < 3; x++)  {
        for (let y = 0; y < 3; y++) {
          const cell = subBoard.cells[x][y];  
          if (cell.value > 0) {
            continue;
          }
          if (cell.availableValues.length === 0) {
            throw new Error("Reached an invalid state");
          }

          if (maxAvailableMoves > cell.availableValues.length) {
            coordinates.x = i * 3 + x; 
            coordinates.y = j * 3 + y;
            maxAvailableMoves = cell.availableValues.length;
          }
        }
      }
    }
  }

  if (coordinates.x === -1) {
    return null;
  }
  return coordinates;
}


function getAvailableValues(usedValues: number[]): number[] {
  const usedValuesSet = new Set(usedValues);
  const availableValues = [];
  for (let i = 1; i < 10; i++) {
    if (!usedValuesSet.has(i)) {
      availableValues.push(i);
    }
  }
  return availableValues;
}

function getUsedValuesByCol(subBoards: SubBoardClass[][], colIndex: number): number[] {    
  const subBoardIndex = Math.floor(colIndex / 3);
  const modColIndex = colIndex % 3;
  const usedValues = [];
  for (let i = 0; i < 3; i++) {
    const subBoard = subBoards[i][subBoardIndex];
    for (let j = 0; j < 3; j++) {
      const cell = subBoard.cells[j][modColIndex];
      if (cell.value > 0) {
        usedValues.push(cell.value);
      }
    }
  }
  return usedValues;
}

function getUsedValuesByRow(subBoards: SubBoardClass[][], rowIndex: number): number[] {
  const subBoardIndex = Math.floor(rowIndex / 3);
  const modRowIndex = rowIndex % 3;
  const usedValues = [];
  for (let i = 0; i < 3; i++) {
    const subBoard = subBoards[subBoardIndex][i];
    for (let j = 0; j < 3; j++) {
      const cell = subBoard.cells[modRowIndex][j];
      if (cell.value > 0) {
        usedValues.push(cell.value);
      }
    }
  }
  return usedValues;
}

function getUsedValues(subBoard: SubBoardClass): number[] {
  const values = [];
  for (let i = 0; i < subBoard.cells.length; i++) {
    for (let j = 0; j < subBoard.cells[i].length; j++) {
      if (subBoard.cells[i][j].value > 0) {
        values.push(subBoard.cells[i][j].value);
      }
    }
  }
  return values;
}  

function calculateAvailableMovesPerCell(subBoards: SubBoardClass[][]) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const subBoard = subBoards[i][j];
      for (let x = 0; x < 3; x++)  {
        for (let y = 0; y < 3; y++) {
          const overallRow = i * 3 + x;
          const overallCol = j * 3 + y;
          const cell = subBoard.cells[x][y];  
          
          if (cell.value > 0) {              
            continue;
          }
          
          const usedValuesByRow = getUsedValuesByRow(subBoards, overallRow);
          const availableValuesByRow = new Set(getAvailableValues(usedValuesByRow));
          const usedValuesByCol = getUsedValuesByCol(subBoards, overallCol);
          const availableValuesByCol = new Set(getAvailableValues(usedValuesByCol));
          const usedValuesBySubBoard = getUsedValues(subBoard);
          const availableValuesBySubBoard = new Set(getAvailableValues(usedValuesBySubBoard));

          const availableValues = [...availableValuesBySubBoard].filter((availableValue) => 
            availableValuesByCol.has(availableValue) && availableValuesByRow.has(availableValue)
          );

          cell.availableValues = availableValues;
        }
      }
    }
  }
}

export function fillBoard(subBoards: SubBoardClass[][]) {
  for (let z = 0; z < 10; z++) {
    try {
      calculateAvailableMovesPerCell(subBoards);
      let coordinate = getLeastAvailableMovesCellCoordinates(subBoards);
      while (coordinate) {
        const i =  Math.floor(coordinate.x / 3);
        const j =  Math.floor(coordinate.y / 3);
        const x =  coordinate.x % 3;
        const y =  coordinate.y % 3;
        const subBoard = subBoards[i][j];
        const cell = subBoard.cells[x][y];

        const randomIndex = Math.floor(Math.random() * cell.availableValues.length);
        cell.value = cell.availableValues[randomIndex];
        cell.availableValues = [];
        calculateAvailableMovesPerCell(subBoards);
        coordinate = getLeastAvailableMovesCellCoordinates(subBoards);
      }  
      break;
    } catch (err) {
      console.log(err);        
    }
  }      
}