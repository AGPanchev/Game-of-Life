// initialise
var i, j, k, g, gridWidth, gridHeight, gridSize, cellsCount, generation, generationNext, cellY, cellX;

var cellColour = new Array("#fff", "#337ab7");
var cellWidth= 30;
var cellHeight = 30;

function setParams(width, height, cells) {
    gridWidth = width;
    gridHeight = height;
    gridSize = gridWidth * gridHeight;
    cellsCount = cells;
}

function generateGeneration() {
    generation = new Array();
    generationNext = new Array();
    for (i=0; i<=gridHeight+1; i++)
    {
        generation[i] = new Array();
        generationNext[i] = new Array();

        for (j=0; j<=gridWidth+1; j++)
        {
            generation[i][j] = 0;
            generationNext[i][j] = 0;
        }
    }

    g = 0;
}

Array.prototype.setAll = function(value) {
    for (i=1; i<=gridHeight; i++)
    {
        for (j=1; j<=gridWidth; j++)
        {
            generation[i][j] = value;
        }
    }
};

function populateRandomCells(){
	if(cellsCount === gridSize){
        generation.setAll(1);
	} else {
        for (i=0; i<cellsCount; i++) {
            setCellValue();
        }
	}
}

function setCellValue() {
    cellY = getRandomIntFromOneToMax(gridHeight);
    cellX = getRandomIntFromOneToMax(gridWidth);

    if(generation[cellY][cellX] == 0){
        generation[cellY][cellX] = 1;
    } else{
        setCellValue();
	}
}

function getRandomIntFromOneToMax(max) {
    return Math.floor(Math.random() * (max)) + 1;
}

function countAdjacent(i, j) {
	var x = 0;
	x += generation[i-1][j-1];
	x += generation[i-1][j];
	x += generation[i-1][j+1];
	x += generation[i][j-1];
	x += generation[i][j+1];
	x += generation[i+1][j-1];
	x += generation[i+1][j];
	x += generation[i+1][j+1];
	return x;
}

function nextGeneration() {
	for (i=1; i<=gridHeight; i++)
	{
		for (j=1; j<=gridWidth; j++)
		{
			adjacent = countAdjacent(i, j);

			switch (generation[i][j]) {
				case 0:
					if ( (adjacent == 3) ) {
						generationNext[i][j] = 1;
					}
					break;
				case 1:
					if ( (adjacent == 2) || (adjacent == 3) ) {
						generationNext[i][j] = 1;
					}
                    break;
			}
		}
	}
}

function copyGrids() {
	for (i=1; i<=gridHeight; i++)
	{
		for (j=1; j<=gridWidth; j++)
		{
			generation[i][j] = generationNext[i][j];
			generationNext[i][j] = 0;
		}
	}
}

function drawCell(ctx, i, j) {
	var x = (j-1) * cellWidth + 0.5;
	var y = (i-1) * cellHeight + 0.5;
	ctx.strokeStyle = "#ccc";
	ctx.strokeRect(x, y, cellWidth, cellHeight);
}

function fillCell(ctx, i, j, c) {
	var x = (j-1) * cellWidth + 1;
	var y = (i-1) * cellHeight + 1;
	ctx.fillStyle = c;
	ctx.fillRect(x, y, cellWidth-1, cellHeight-1);
}

function drawGrid(width, height) {
	var canvas = document.getElementById("gameboard");

	if (canvas.getContext) {
		canvas.width = cellWidth * gridWidth;
		canvas.height = cellHeight * gridHeight;
		var ctx = canvas.getContext("2d");
		
		for (i=1; i<=gridHeight; i++)
		{
			for (j=1; j<=gridWidth; j++)
			{
				drawCell(ctx, i, j);
			}
		}
	}
}

function seedGeneration() {
    generateGeneration();
	drawGrid();
    populateRandomCells()
	drawGeneration();
}

function drawGeneration() {
	var canvas = document.getElementById("gameboard");
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		for (i=1; i<=gridHeight; i++)
		{
			for (j=1; j<=gridWidth; j++)
			{
				fillCell(ctx, i, j, cellColour[generation[i][j]]);
			}
		}
	}
	
	g++;
	document.getElementById("generation").innerHTML = g;
}
