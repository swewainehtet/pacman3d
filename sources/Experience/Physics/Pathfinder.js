export default class Pathfinder {
  static instance;

  // Singleton constructor
  constructor() {
    if (Pathfinder.instance) {
      return Pathfinder.instance;
    }
    Pathfinder.instance = this;

    /* Description of the Grid-
        1--> The cell is not blocked
        0--> The cell is blocked */
    this.grid = [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
        1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1,
        1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        1, 1, 1, 1,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1,
        1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        1, 1, 1, 1,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
        0, 0, 0, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 0,
      ],
      [
        0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
        1, 0, 0, 0,
      ],
      [
        0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
        1, 0, 0, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0,
      ],
      [
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ],
    ];

    this.ROW = this.grid.length;
    this.COL = this.grid[0].length;

    function isValid(row, col) {
      return row >= 0 && row < this.ROW && col >= 0 && col < this.COL;
    }

    function isUnBlocked(grid, row, col) {
      if (grid[row][col] == 1) return true;
      else return false;
    }

    function isDestination(row, col, dest) {
      if (row == dest[0] && col == dest[1]) return true;
      else return false;
    }

    function calculateHValue(row, col, dest) {
      return Math.abs(row - dest[0]) + Math.abs(col - dest[1]);
    }

    function tracePath(cellDetails, dest) {
      console.log("The Path is ");
      let row = dest[0];
      let col = dest[1];
      let Path = [];

      while (
        !(
          cellDetails[row][col].parent_i == row &&
          cellDetails[row][col].parent_j == col
        )
      ) {
        Path.push([row, col]);
        let temp_row = cellDetails[row][col].parent_i;
        let temp_col = cellDetails[row][col].parent_j;
        row = temp_row;
        col = temp_col;
      }

      Path.push([row, col]);
      while (Path.length > 0) {
        let p = Path[0];
        Path.shift();

        if (p[0] == 2 || p[0] == 1) {
          console.log("-> (" + p[0] + ", " + (p[1] - 1) + ")");
        } else console.log("-> (" + p[0] + ", " + p[1] + ")");
      }

      return;
    }

    function aStarSearch(grid, src, dest) {
      if (isValid(src[0], src[1]) == false) {
        console.log("Source is invalid\n");
        return;
      }

      if (isValid(dest[0], dest[1]) == false) {
        console.log("Destination is invalid\n");
        return;
      }

      if (
        isUnBlocked(grid, src[0], src[1]) == false ||
        isUnBlocked(grid, dest[0], dest[1]) == false
      ) {
        console.log("Source or the destination is blocked\n");
        return;
      }

      if (isDestination(src[0], src[1], dest) == true) {
        console.log("We are already at the destination\n");
        return;
      }

      let closedList = new Array(this.ROW);
      for (let i = 0; i < this.ROW; i++) {
        closedList[i] = new Array(this.COL).fill(false);
      }

      let cellDetails = new Array(this.ROW);
      for (let i = 0; i < this.ROW; i++) {
        cellDetails[i] = new Array(this.COL);
      }

      let i, j;

      for (i = 0; i < this.ROW; i++) {
        for (j = 0; j < this.COL; j++) {
          cellDetails[i][j] = new cell();
          cellDetails[i][j].f = 2147483647;
          cellDetails[i][j].g = 2147483647;
          cellDetails[i][j].h = 2147483647;
          cellDetails[i][j].parent_i = -1;
          cellDetails[i][j].parent_j = -1;
        }
      }

      (i = src[0]), (j = src[1]);
      cellDetails[i][j].f = 0;
      cellDetails[i][j].g = 0;
      cellDetails[i][j].h = 0;
      cellDetails[i][j].parent_i = i;
      cellDetails[i][j].parent_j = j;

      let openList = new Map();
      openList.set(0, [i, j]);
      let foundDest = false;

      while (openList.size > 0) {
        let p = openList.entries().next().value;
        openList.delete(p[0]);
        i = p[1][0];
        j = p[1][1];
        closedList[i][j] = true;

        let gNew, hNew, fNew;

        //----------- 1st Successor (North) ------------
        if (isValid(i - 1, j) == true) {
          if (isDestination(i - 1, j, dest) == true) {
            cellDetails[i - 1][j].parent_i = i;
            cellDetails[i - 1][j].parent_j = j;
            console.log("The destination cell is found\n");
            tracePath(cellDetails, dest);
            foundDest = true;
            return;
          } else if (
            closedList[i - 1][j] == false &&
            isUnBlocked(grid, i - 1, j) == true
          ) {
            gNew = cellDetails[i][j].g + 1;
            hNew = calculateHValue(i - 1, j, dest);
            fNew = gNew + hNew;
            if (
              cellDetails[i - 1][j].f == 2147483647 ||
              cellDetails[i - 1][j].f > fNew
            ) {
              openList.set(fNew, [i - 1, j]);
              cellDetails[i - 1][j].f = fNew;
              cellDetails[i - 1][j].g = gNew;
              cellDetails[i - 1][j].h = hNew;
              cellDetails[i - 1][j].parent_i = i;
              cellDetails[i - 1][j].parent_j = j;
            }
          }
        }

        //----------- 2nd Successor (South) ------------
        if (isValid(i + 1, j) == true) {
          if (isDestination(i + 1, j, dest) == true) {
            cellDetails[i + 1][j].parent_i = i;
            cellDetails[i + 1][j].parent_j = j;
            console.log("The destination cell is found\n");
            tracePath(cellDetails, dest);
            foundDest = true;
            return;
          } else if (
            closedList[i + 1][j] == false &&
            isUnBlocked(grid, i + 1, j) == true
          ) {
            gNew = cellDetails[i][j].g + 1;
            hNew = calculateHValue(i + 1, j, dest);
            fNew = gNew + hNew;
            if (
              cellDetails[i + 1][j].f == 2147483647 ||
              cellDetails[i + 1][j].f > fNew
            ) {
              openList.set(fNew, [i + 1, j]);
              cellDetails[i + 1][j].f = fNew;
              cellDetails[i + 1][j].g = gNew;
              cellDetails[i + 1][j].h = hNew;
              cellDetails[i + 1][j].parent_i = i;
              cellDetails[i + 1][j].parent_j = j;
            }
          }
        }

        //----------- 3rd Successor (East) ------------
        if (isValid(i, j + 1) == true) {
          if (isDestination(i, j + 1, dest) == true) {
            cellDetails[i][j + 1].parent_i = i;
            cellDetails[i][j + 1].parent_j = j;
            console.log("The destination cell is found\n");
            tracePath(cellDetails, dest);
            foundDest = true;
            return;
          } else if (
            closedList[i][j + 1] == false &&
            isUnBlocked(grid, i, j + 1) == true
          ) {
            gNew = cellDetails[i][j].g + 1;
            hNew = calculateHValue(i, j + 1, dest);
            fNew = gNew + hNew;
            if (
              cellDetails[i][j + 1].f == 2147483647 ||
              cellDetails[i][j + 1].f > fNew
            ) {
              openList.set(fNew, [i, j + 1]);
              cellDetails[i][j + 1].f = fNew;
              cellDetails[i][j + 1].g = gNew;
              cellDetails[i][j + 1].h = hNew;
              cellDetails[i][j + 1].parent_i = i;
              cellDetails[i][j + 1].parent_j = j;
            }
          }
        }
        //----------- 4th Successor (West) ------------
        if (isValid(i, j - 1) == true) {
          if (isDestination(i, j - 1, dest) == true) {
            cellDetails[i][j - 1].parent_i = i;
            cellDetails[i][j - 1].parent_j = j;
            console.log("The destination cell is found\n");
            tracePath(cellDetails, dest);
            foundDest = true;
            return;
          } else if (
            closedList[i][j - 1] == false &&
            isUnBlocked(grid, i, j - 1) == true
          ) {
            gNew = cellDetails[i][j].g + 1;
            hNew = calculateHValue(i, j - 1, dest);
            fNew = gNew + hNew;
            if (
              cellDetails[i][j - 1].f == 2147483647 ||
              cellDetails[i][j - 1].f > fNew
            ) {
              openList.set(fNew, [i, j - 1]);
              cellDetails[i][j - 1].f = fNew;
              cellDetails[i][j - 1].g = gNew;
              cellDetails[i][j - 1].h = hNew;
              cellDetails[i][j - 1].parent_i = i;
              cellDetails[i][j - 1].parent_j = j;
            }
          }
        }
      }
      if (foundDest == false)
        console.log("Failed to find the Destination Cell\n");

      return;
    }
  }
}

class cell {
  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}
