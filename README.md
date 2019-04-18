# Maze-genrator(The depth-first search algorithm)
This is one of the most famous algorithms that creates a perfect maze

  The depth-first search algorithm of maze generation is frequently implemented using backtracking:

    1- Make the initial cell the current cell and mark it as visited
    2- While there are unvisited cells
        1- If the current cell has any neighbours which have not been visited
          i- Choose randomly one of the unvisited neighbours
          ii- Push the current cell to the stack
          iii- Remove the wall between the current cell and the chosen cell
          iiii- Make the chosen cell the current cell and mark it as visited
        2- Else if stack is not empty
          i- Pop a cell from the stack
          ii- Make it the current cell
