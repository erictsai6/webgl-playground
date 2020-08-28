import { getAvailableValues } from "./utils";

export class Cell {
  public availableValues: number[];

  constructor(public value?: number){}
}

export class SubBoard {
  public cells: Cell[][];
  constructor() {
    this.cells = [];
    for (let i = 0; i < 3; i++) {
      this.cells.push([]);
      for (let j = 0; j < 3; j++) {
        this.cells[i].push(new Cell());
      }
    }
  }

  getUsedValues(): number[] {
    const values = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j].value > 0) {
          values.push(this.cells[i][j].value);
        }
      }
    }
    return values;
  }  
}

export class Board {
  public subBoards: SubBoard[][]; // 3 x 3
  constructor() {
    this.initializeSubBoards();    
    this.fillBoard();
  }

  initializeSubBoards() {
    this.subBoards = [];
    for (let i = 0; i < 3; i++) {
      this.subBoards.push([]);
      for (let j = 0; j < 3; j++) {
        this.subBoards[i].push(new SubBoard());
      }
    }
  }

  fillBoard() {
    for (let z = 0; z < 10; z++) {
      try {
        this.calculateAvailableMovesPerCell();
        let coordinate = this.getLeastAvailableMovesCellCoordinatess();
        while (coordinate) {
          const i =  Math.floor(coordinate.x / 3);
          const j =  Math.floor(coordinate.y / 3);
          const x =  coordinate.x % 3;
          const y =  coordinate.y % 3;
          const subBoard = this.subBoards[i][j];
          const cell = subBoard.cells[x][y];

          const randomIndex = Math.floor(Math.random() * cell.availableValues.length);
          cell.value = cell.availableValues[randomIndex];
          cell.availableValues = [];
          this.calculateAvailableMovesPerCell();
          coordinate = this.getLeastAvailableMovesCellCoordinatess();
        }  
        break;
      } catch (err) {
        console.log(err);
        this.initializeSubBoards();
      }
    }      
  }

  getLeastAvailableMovesCellCoordinatess(): {x: number; y: number} {
    // Should be reasonable max to set it at
    let maxAvailableMoves = 10;
    const coordinates = {
      x: -1,
      y: -1
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subBoard = this.subBoards[i][j];
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
  
  calculateAvailableMovesPerCell() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subBoard = this.subBoards[i][j];
        for (let x = 0; x < 3; x++)  {
          for (let y = 0; y < 3; y++) {
            const overallRow = i * 3 + x;
            const overallCol = j * 3 + y;
            const cell = subBoard.cells[x][y];  
            
            if (cell.value > 0) {              
              continue;
            }
            
            const usedValuesByRow = this.getUsedValuesByRow(overallRow);
            const availableValuesByRow = new Set(getAvailableValues(usedValuesByRow));
            const usedValuesByCol = this.getUsedValuesByCol(overallCol);
            const availableValuesByCol = new Set(getAvailableValues(usedValuesByCol));
            const usedValuesBySubBoard = subBoard.getUsedValues();
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

  getUsedValuesByCol(colIndex: number): number[] {    
    const subBoardIndex = Math.floor(colIndex / 3);
    const modColIndex = colIndex % 3;
    const usedValues = [];
    for (let i = 0; i < 3; i++) {
      const subBoard = this.subBoards[i][subBoardIndex];
      for (let j = 0; j < 3; j++) {
        const cell = subBoard.cells[j][modColIndex];
        if (cell.value > 0) {
          usedValues.push(cell.value);
        }
      }
    }
    return usedValues;
  }

  getUsedValuesByRow(rowIndex: number): number[] {
    const subBoardIndex = Math.floor(rowIndex / 3);
    const modRowIndex = rowIndex % 3;
    const usedValues = [];
    for (let i = 0; i < 3; i++) {
      const subBoard = this.subBoards[subBoardIndex][i];
      for (let j = 0; j < 3; j++) {
        const cell = subBoard.cells[modRowIndex][j];
        if (cell.value > 0) {
          usedValues.push(cell.value);
        }
      }
    }
    return usedValues;
  }
}