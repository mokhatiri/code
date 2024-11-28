let Stoping = false;
const directions = [
    {x: 0, y: 1},   // Up
    {x: 1, y: 0},   // Right
    {x: 0, y: -1},  // Down
    {x: -1, y: 0}   // Left
];
let canvas;
let path;
let CellSize;
window.onload = function() {
    canvas = document.getElementById('canvas');
    CellSize = 5;
    Width = canvas.width / CellSize - 2;
    Height = canvas.height / CellSize - 2;
    path = [{x:Width/2,y:Height/2}];
};


async function wait(){
    return new Promise(resolve => {
        setTimeout(resolve, 10);
    });
}

async function Wait(){
    return new Promise(resolve => {
        setTimeout(resolve, 400);
    });
}

function Save() {
    Stop();
    const image = canvas.toDataURL('image/png'); // Default format is 'image/png'

    // Create a temporary <a> element
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas_image.png'; // Set the downloaded file name

    // Trigger the download
    link.click();
}

function Reset() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, (Width+2)*CellSize + 2, (Height+2)*CellSize);
}

async function UpdateCellSize() {
    // getting the new size from the input field slider
    Stop();
    let newSize = document.getElementById('cellSizeSlider').value;
    await UpdateCELLSIZE(newSize);
    await Start();
}

async function UpdateCELLSIZE(newSize) {
    // getting the new size from the input field slider
    CellSize = newSize;
    Width = Math.floor(canvas.width / CellSize);
    Height = Math.floor(canvas.height / CellSize);
    // updating the value of the cell size
    document.getElementById('cellSizeValue').innerHTML = CellSize;
    // Updating the old values from the path
    await Wait();
    await ResetAll();
}

function Stop() {
    Stoping = true;
}

async function ResetAll(){
    Stop();
    Reset();
    await wait();
    
    path = [{x:Width/2,y:Height/2}];
}

async function Start() {
    Stoping = false;

    await Loop_Erased_Random_Walk(path);
}

function randomStep(current) {
    const neighbors = [];

    for (const couple of directions) {
        const nx = couple.x + current.x;
        const ny = couple.y + current.y;

        if (nx >= 0 && nx < Width && ny >= 0 && ny < Height) {
            neighbors.push({x: nx, y: ny});
        }
    }
    const direction = neighbors[Math.floor(Math.random() * neighbors.length)];
    
    return { x: direction.x, y: direction.y };
}

function isInPath(path, point) {
    return path.some(p => p.x === point.x && p.y === point.y);
}

function getPathColor(length, maxLength) {
    // Normalize length to [0, 1]
    const normalized = Math.min(length / maxLength, 1);

    // Map normalized value to HSL (Hue: 0 to 240, Saturation: 80%, Lightness: 60%)
    const hue = normalized * 240; // 0 (red) to 240 (blue)
    return `hsl(${hue}, 80%, 60%)`;
}

function drawPath(path) {
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = getPathColor(path.length, 1000);
    ctx.lineWidth = 1;

    ctx.beginPath(); // Start a new path
    ctx.moveTo(path[0].x * CellSize , path[0].y * CellSize); // Move to the starting point

    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x * CellSize, path[i].y * CellSize); // Draw a line to the next point
    }

    ctx.stroke(); // Stroke the entire path at once
}

async function Loop_Erased_Random_Walk() {
    const x = Math.floor(Math.random() * Width);
    const y = Math.floor(Math.random() * Height);

    // Initialize an empty list `path`
    // Set `current` to the starting point

    // while not reached_goal(current):
    //     Append `current` to `path`
    //     Generate the next random step to `next_step`
    //     If `next_step` is already in `path`:
    //         Remove the loop from `path` (all points after the first occurrence of `next_step`)
    //     Update `current` to `next_step`

    let current = path[path.length - 1];

    while (!Stoping) {
        let nextStep = randomStep(current);

        // If the next step creates a loop, erase it
        if (isInPath(path, nextStep)) {
            const loopStartIndex = path.findIndex(p => p.x === nextStep.x && p.y === nextStep.y);
            path = path.slice(0, loopStartIndex + 1);  // Erase the loop from the path
        }

        path.push(nextStep);
        current = nextStep;


        // Draw the current step on the canvas
        Reset();
        drawPath(path);
        await wait();
    }

}