var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const mapsize = 100;

let currmap = [];

// skapa en random förstamap
for (let i = 0; i < mapsize; i++) {
    let subarray = [];
    for (let j = 0; j < mapsize; j++) {
        subarray.push(random());
    }
    currmap.push(subarray);
}

//rita ut currmap
function draw() {
    for (let i = 0; i < mapsize; i++) {
        for (let j = 0; j < mapsize; j++) {
            if (currmap[i][j] == 1) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.fillRect(5 * i, 5 * j, 5, 5);
        }
    }
}
draw();

//random 0 eller 1
function random() {
    return Math.round(Math.random());
}

let tempmap = [];
for (let i = 0; i < mapsize; i++) {
    let subarray = [];
    for (let j = 0; j < mapsize; j++) {
        subarray.push(0);
    }
    tempmap.push(subarray);
}
function check() {
    for (let i = 1; i < mapsize - 1; i++) {
        for (let j = 1; j < mapsize - 1; j++) {
            if (currmap[i][j] == 0) {
                if (neighbors(i, j) > 3) {
                    tempmap[i][j] = 1;
                } else {
                    tempmap[i][j] = 0;
                }
            } else {
                if (neighbors(i, j) == 2 || neighbors(i, j) == 3) {
                    tempmap[i][j] = 1;
                } else {
                    tempmap[i][j] = 0;
                }
            }
        }
    }
}

function neighbors(i, j) {
    let x = 0;
    if (currmap[i - 1][j - 1] == 1) {
        x++;
    }
    if (currmap[i - 1][j] == 1) {
        x++;
    }
    if (currmap[i - 1][j + 1] == 1) {
        x++;
    }
    if (currmap[i][j - 1] == 1) {
        x++;
    }
    if (currmap[i][j + 1] == 1) {
        x++;
    }
    if (currmap[i + 1][j - 1] == 1) {
        x++;
    }
    if (currmap[i + 1][j] == 1) {
        x++;
    }
    if (currmap[i + 1][j + 1] == 1) {
        x++;
    }
    return x;
}
function next() {
    check();

    currmap = tempmap;
    draw();
    tempmap = [];
    for (let i = 0; i < mapsize; i++) {
        let subarray = [];
        for (let j = 0; j < mapsize; j++) {
            subarray.push(0);
        }
        tempmap.push(subarray);
    }
}
