var grid = [];
var w = 10;
var rows, cols;

var current;
var stack = [];

function setup() {
    createCanvas(800, 800);
    rows = floor(height / w);
    cols = floor(width / w);

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];
    while (true) {
        current.visited = true;
        //STEP 1
        var next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            //STEP2
            stack.push(current);
            //STEP3
            removeWalls(current, next);
            //STEP4
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }
    console.log("done");
}

function draw() {
    background(51);
    //frameRate(5);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    /*current.highlight();
    current.visited = true;
    //STEP 1
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        //STEP2
        stack.push(current);
        //STEP3
        removeWalls(current, next);
        //STEP4
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }*/
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x == 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x == -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y == 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y == -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function index(i, j) {
    if (i < 0 || i > rows - 1 || j < 0 || j > cols - 1) {
        return -1;
    }
    return (i * cols + j);
}

function addGrid(cell, array) {
    if (cell && !cell.visited)
        array.push(cell);
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.highlight = function() {
        var x = i * w;
        var y = j * w;
        noStroke();
        fill("#004080");
        rect(x, y, w, w);
    }

    this.show = function() {
        var x = i * w;
        var y = j * w;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke();
            //fill("#8000ff");
            //rect(x, y, w, w);
        }
    }



    this.checkNeighbors = function() {
        var neighbors = [];
        var top = grid[index(this.i - 1, this.j)];
        var bottom = grid[index(this.i + 1, this.j)];
        var right = grid[index(this.i, this.j + 1)];
        var left = grid[index(this.i, this.j - 1)];

        addGrid(top, neighbors);
        addGrid(bottom, neighbors);
        addGrid(left, neighbors);
        addGrid(right, neighbors);

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }
}