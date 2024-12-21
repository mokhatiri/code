class cell {
    constructor() {
        // the way this is designed is: 
        // [[1,0],[-1,0],[0,1],[0,-1]]
        this.walls = [true,true,true,true];
        this.visited = true;
        this.checked = false;
        this.looped = false;
    }
}

let Grid;
let M;
let N;
let isStopped = false;
let counter = 0;
let LoopsRandomisation = 20;

async function wait(){
    return new Promise(resolve => {
        setTimeout(resolve, 100);
    });
}

function NonBounded(grid, x, y){
    if(x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
        return true;
    }
    return false;
}

function checkvisit(grid, x, y){
    return (NonBounded(grid, x, y) || (grid[x][y].visited));
}

function visit(grid, x, y, neighbour){
    grid[x+neighbour[0]][y+neighbour[1]].visited = false;

    // fix the walls for both
    if(neighbour[1] == 0){
        // [[1,0],[-1,0],[0,1],[0,-1]]
        if(neighbour[0] == 1){
            grid[x][y].walls[0] = false;
            grid[x+1][y].walls[1] = false;
        }
        else if(neighbour[0] == -1){
            grid[x][y].walls[1] = false;
            grid[x-1][y].walls[0] = false;
        }
    }
    else if(neighbour[1] == 1){
        grid[x][y].walls[2] = false;
        grid[x][y+1].walls[3] = false;
    }
    else {
        grid[x][y].walls[3] = false;
        grid[x][y-1].walls[2] = false;
    }
}

function allVisited(grid, x, y) {
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1],  // Right
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length && grid[nx][ny].visited) {
            return false;
        }
    }
    return true;
}

function Randomchoice(grid, x, y) {
    const neighbors = [];
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1],  // Right
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
            if(grid[nx][ny].visited || !Math.floor(Math.random()*LoopsRandomisation))neighbors.push([dx, dy]);
        }
    }

    return neighbors[Math.floor(Math.random() * neighbors.length)];
}

function resetBack(){
    const canvas = document.getElementById('mapBack');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMaze(grid, n, m, color) {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    const canvas2 = document.getElementById('mapBack');
    
    canvas.width = n * cellSize;
    canvas.height = m * cellSize;
    canvas2.width = n * cellSize;
    canvas2.height = m * cellSize;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const x = i * cellSize;
            const y = j * cellSize;

            if (grid[i][j].visited) {
                if(!color) color = 'grey';
                drawCurrent(i,j,color);
            }

            ctx.beginPath();
            // Draw walls
            if (grid[i][j].walls[0]) {
                ctx.moveTo(x + cellSize, y);
                ctx.lineTo(x + cellSize, y + cellSize);
            }
            if (grid[i][j].walls[1]) {
                ctx.moveTo(x , y);
                ctx.lineTo(x , y + cellSize);
            }
            if (grid[i][j].walls[2]) {
                ctx.moveTo(x , y + cellSize);
                ctx.lineTo(x + cellSize, y + cellSize);
            }
            if (grid[i][j].walls[3]) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellSize, y);
            }

            ctx.stroke();
        }   
    }

    return grid;
}

function drawPath(path, color = false){

    for(let i = 0; i < path.length; i++){
        drawCurrent(path[i][0], path[i][1],"Green");
    }
}

function drawCurrent(x, y, color) {
    const canvas = document.getElementById('mapBack');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
    ctx.stroke();
}


async function RDFS(n,m){
    const grid = new Array(n);
    for(let i = 0; i < n; i++){ 
        grid[i] = new Array(m);
        for(let j = 0; j < m; j++){
            grid[i][j] = new cell();
        }
    }

    let x = 0;
    let y = 0;
    grid[x][y].visited = false;
    let stack = [[x,y]];
    drawMaze(grid, n, m);
    await wait();
    
    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        x = current[0];
        y = current[1];
        drawCurrent(x, y, '#29225f');
        await wait();
        if (allVisited(grid, x, y)) {
            stack.pop();
            continue;
        } else {
            let randomNeighbor = Randomchoice(grid, x, y);
            if (randomNeighbor) {
                let nx = x + randomNeighbor[0];
                let ny = y + randomNeighbor[1];
                stack.push([nx, ny]);
                visit(grid, x, y, randomNeighbor);
            }
        }
        drawMaze(grid, n, m);
    }

    await drawMaze(grid, n, m);
   Grid = grid;
}

function Parent(Sets, coords){
    if(!Sets[coords]) {
        Sets[coords] = coords;
        return coords;
    }
    let parent = Sets[coords];
    while(parent != Sets[parent]){
        parent = Sets[parent];
    }
    return parent;
}

function Union(Sets, coords1, coords2){
    let parent1 = Parent(Sets, coords1);
    let parent2 = Parent(Sets, coords2);
    if(parent1 != parent2){
        Sets[parent2] = parent1;
    }
}
async function R_Kruskal(n,m){
    const grid = new Array(n);
    for(let i = 0; i < n; i++){
        grid[i] = new Array(m);
        for(let j = 0; j < m; j++){
            grid[i][j] = new cell();
        }
    }
        /*
        Create a list of all adjacent couples, and create a set for the future sets (Sets).
        For each couple of cells, in some random order:
            If the couples are divided by a wall and belong to distinct sets:
                Remove the current wall.
            Join the sets of the formerly divided cells.
        */

    let couples = [];
    let Sets = {}; // in this set each cell is a hash and it points to the set it belongs to
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            // for non redunduncy we only add the couples to the right and bottom
            if(i < n-1){
                couples.push([[i,j],[i+1,j]]);
            }
            if(j < m-1){
                couples.push([[i,j],[i,j+1]]);
            }
        }
    }
    // for each couple of cells in some random order
    couples.sort(() => Math.random() - 0.5);

    for(let i = 0; i < couples.length; i++){

        let coords1 = couples[i][0];
        let coords2 = couples[i][1];

        // if one of the cells doesn't exist then add it to the set.
        if(!Sets[coords1]){
            Sets[coords1] = coords1;
        }
        if(!Sets[coords2]){
            Sets[coords2] = coords2;
        }
        // if the cells are in the same set then skip
        // to check this we are going to use the Parent(Sets,coords) function
        if (Parent(Sets,coords1) == Parent(Sets,coords2)){
            // sometimes we may link them for a bit of loops in the maze
            if(Math.floor(Math.random()*LoopsRandomisation)){
             continue;
            }
             // if not pass
        }
        // if the cells are not in the same set then remove the wall between them and join the sets
        // first determine the position of coords2 in function of coords1
        visit(grid, coords1[0], coords1[1], [coords2[0]-coords1[0], coords2[1]-coords1[1]]);
        grid[coords1[0]][coords1[1]].visited = false;
        grid[coords2[0]][coords2[1]].visited = false;
        // join the sets
        Union(Sets, coords1, coords2);

        await drawMaze(grid, n, m); 
        await wait();
    }

    await drawMaze(grid, n, m);
    Grid = grid;
}

window.onload = async function () {
    let n = prompt("Choose N:");
    let m = prompt("Choose M:");
    N = n; M = m;

    RDFS(n,m);
    document.getElementById('map').addEventListener('click', Choice);
}

function Choice(){
    document.getElementById('map').style.borderColor = '#4f5fbf93';
    document.getElementById("Choice").style.display = "flex";
    isStopped = true;
    resetBack();
}

async function Choose(algorithm){
    isStopped = false;
    let endx;
    let endy;
    while(!endx || !endy || endx-N >= 0 || endy-M >= 0){
        endx = prompt("x = ");
        endy = prompt("y = ");
    }   
    let end = [endx,endy];
    document.getElementById("Choice").style.display = "none"
    if (algorithm == 'Astar') await Astar(end);
    if (algorithm == 'BFS') await BFS(end);
    if (algorithm == 'DFS') await DFS(end);
    if (algorithm == 'Dijkstra') await Dijkstra(end);
    if (algorithm == 'Greedy') await Greedy(end);

    console.log("counter",counter);
}

function heuristic(start, end){
    x1 = start[0];
    x2 = end[0];
    y1 = start[1];
    y2 = end[1];
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function heapify(Minheap, i) {
    let heap = [...Minheap]
    const n = heap.length;
    let smallest = i; // Start with the current node as the smallest
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index

    // Compare with left child
    if (left < n && heap[left][1] < heap[smallest][1]) {
        smallest = left;
    }

    // Compare with right child
    if (right < n && heap[right][1] < heap[smallest][1]) {
        smallest = right;
    }

    // If the smallest is not the current node, swap and recurse
    if (smallest != i) {
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]]; // Correct swap syntax
        return heapify(heap, smallest); // Recursively heapify the affected subtree
    }

    return heap;
}

function deleteMin(heap){
    heap[0] = heap[heap.length-1];
    heap.splice(heap.length-1,1);
    let Minheap = heapify(heap,0);
    return Minheap;
}

function heapifyUp(Minheap) {
    let heap = [...Minheap];
    let current = heap.length - 1; // Start with the last element (newly added)


    // Restore the heap property
    while (current > 0) {
        let parent = Math.floor((current - 1) / 2); // Find the parent index

        // Compare with the parent; second position (`[1]`) is used for comparison
        if (heap[parent][1] > heap[current][1]) {
            // Swap parent and current if the heap property is violated
            [heap[parent], heap[current]] = [heap[current], heap[parent]];
            // Move up to the parent
            current = parent;
        } else {
            // Heap property satisfied; exit loop
            break;
        }
    }

    return heap;
}

function Insert(heap, element){
    let Minheap = [...heap]; 
    Minheap.push(element);
    return heapifyUp(Minheap);
}

function Ways(grid, position){
    // this function will return the possible next nodes base on the wall property of this node
    let next = []
    
    let x = position[0];
    let y = position[1];
    // [[1,0],[-1,0],[0,1],[0,-1]]
    let poss = [[x+1,y],[x-1,y],[x,y+1],[x,y-1]];
    for(let i = 0; i< 4; i++){
        if(!grid[x][y].walls[i]) next.push(poss[i]);
    }

    return next
}

async function Astar(end){

    // we are going to be using a min heap to store the nodes to visit
    // the heapifying is based on the f value of the node
    // the next node is the node at the top of the heap
    const grid = JSON.parse(JSON.stringify(Grid));
    drawCurrent(end[0],end[1],"#00ff003e")
    let start = [0,0];
    let Minheap = [];
    counter = 0;

    Minheap.push([start,heuristic(start,end)+0,0,[start]])
    grid[start[0]][start[1]].checked = true;
    drawCurrent(start[0],start[1],"#c6484893");

    while(Minheap.length > 0 && !isStopped){
        counter++;
        
        let head = Minheap[0];
        grid[head[0][0]][head[0][1]].checked = true;
        if(head[0][0] == end[0] && head[0][1] == end[1]){
            drawPath(head[3]);
            drawCurrent(end[0],end[1],"#c6484893");
            break;
        }
        
        drawCurrent(head[0][0],head[0][1],"#4fbf5393");
        Minheap = deleteMin(Minheap);

        // head = [coords, distance, steps to get here]
        for(let path of Ways(grid, head[0])){
            if(!grid[path[0]][path[1]].checked){
                let next = [path,heuristic(path,end)+head[2]+1,head[2]+1, head[3].concat([path])];
                Minheap = Insert(Minheap, next);
                drawCurrent(path[0],path[1],"#bdbf4f93");
                await wait();
            }
        }
    }

    if(!isStopped){
        await wait();
        document.getElementById('map').style.borderColor = '#4fbf5393';
    }
}

async function DFS(end){
    const grid = JSON.parse(JSON.stringify(Grid));
    drawCurrent(end[0],end[1],"#00ff003e")
    let start = [0,0];
    let Stack = [];
    counter = 0;

    Stack.push([start,[start]]);
    grid[start[0]][start[1]].checked = true;
    drawCurrent(start[0],start[1],"#c6484893");

    while(Stack.length > 0 && !isStopped){
        counter++;

        let [current, path] = Stack.pop();
        let [x,y] = current;

        grid[x][y].visited = true;

        if (x == end[0] && y == end[1]) {
            console.log("Reached the goal!");
            drawPath(path);
            drawCurrent(end[0], end[1], "#c6484893");
            break;
        }

        drawCurrent(x, y, "#4fbf5393");
        for(let neighbor of Ways(grid, current)){
            let [nx, ny] = neighbor;
    
            if (!grid[nx][ny].checked) {

                grid[nx][ny].checked = true;
                Stack.push([neighbor, path.concat([neighbor])]);
                drawCurrent(nx, ny, "#bdbf4f93");
            }
            await wait();
        }
    }

    if(!isStopped){
        await wait();
        document.getElementById('map').style.borderColor = '#4fbf5393';
    }
}

async function BFS(end) {
    const grid = JSON.parse(JSON.stringify(Grid)); // Deep copy the grid
    drawCurrent(end[0], end[1], '#00ff003e'); // Highlight the goal
    let start = [0, 0];
    let queue = [];
    counter = 0;

    queue.push([start, [start]]);
    grid[start[0]][start[1]].checked = true;
    drawCurrent(start[0], start[1], "#c6484893");

    while (queue.length > 0 && !isStopped) {
        counter++;

        let [current, path] = queue.shift();
        let [x, y] = current;

        grid[x][y].visited = true;
        drawCurrent(x, y,  grid[x][y].looped? "#4f5fbf93":"#4fbf5393");

        if (x == end[0] && y == end[1]) {
            console.log("Reached the goal!");
            drawPath(path);
            drawCurrent(end[0], end[1], "#c6484893");
            break;
        }

        for (let neighbor of Ways(grid, current)) {
            let [nx, ny] = neighbor;

            if (!grid[nx][ny].visited) {
                if (!grid[nx][ny].checked) {

                    grid[nx][ny].checked = true;
                    queue.push([neighbor, path.concat([neighbor])]);
                    drawCurrent(nx, ny, "#bdbf4f93");
                }
                else grid[nx][ny].looped = true;
                await wait();
            }
        }

    }

    // Finalize visualization if not stopped
    if (!isStopped) {
        await wait();
        document.getElementById('map').style.borderColor = '#4fbf5393';
    }
}

async function Dijkstra(end){
    const grid = JSON.parse(JSON.stringify(Grid));
    drawCurrent(end[0],end[1],"#00ff003e")
    let start = [0,0];
    let Minheap = [];
    counter = 0;
    Minheap.push([start,0,[start]]);
    grid[start[0]][start[1]].checked = true;
    drawCurrent(start[0],start[1],"#c6484893");
    while(Minheap.length > 0 && !isStopped){
        counter++;

        let head = Minheap[0];
        grid[head[0][0]][head[0][1]].checked = true;
        if(head[0][0] == end[0] && head[0][1] == end[1]){
            drawPath(head[2]);
            drawCurrent(end[0],end[1],"#c6484893");
            break;
        }

        drawCurrent(head[0][0],head[0][1],"#4fbf5393");
        Minheap = deleteMin(Minheap);
        // head = [coords, distance, steps to get here]
        for(let path of Ways(grid, head[0])){
            if(!grid[path[0]][path[1]].checked){
                let next = [path,head[1]+1,head[2].concat([path])];
                Minheap = Insert(Minheap, next);
                drawCurrent(path[0],path[1],"#bdbf4f93");
                await wait();
            }
        }
    }
    if(!isStopped){
        await wait();
        document.getElementById('map').style.borderColor = '#4fbf5393';
    }
}

async function Greedy(end){
    const grid = JSON.parse(JSON.stringify(Grid));
    drawCurrent(end[0],end[1],"#00ff003e")
    let start = [0,0];
    let Minheap = [];
    counter = 0;
    Minheap.push([start,heuristic(start,end),[start]]);
    grid[start[0]][start[1]].checked = true;
    drawCurrent(start[0],start[1],"#c6484893");
    while(Minheap.length > 0 && !isStopped){
        counter++;
        let head = Minheap[0];
        grid[head[0][0]][head[0][1]].checked = true;
        if(head[0][0] == end[0] && head[0][1] == end[1]){
            drawPath(head[2]);
            drawCurrent(end[0],end[1],"#c6484893");
            break;
        }
        drawCurrent(head[0][0],head[0][1],"#4fbf5393");
        Minheap = deleteMin(Minheap);
        // head = [coords, distance, steps to get here]
        for(let path of Ways(grid, head[0])){
            if(!grid[path[0]][path[1]].checked){
                let next = [path,heuristic(path,end),head[2].concat([path])];
                Minheap = Insert(Minheap, next);
                drawCurrent(path[0],path[1],"#bdbf4f93");
                await wait();
            }
        }
    }
    if(!isStopped){
        await wait();
        document.getElementById('map').style.borderColor = '#4fbf5393';
    }
}