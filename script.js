var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.canvas.width = window.innerWidth - 135;
ctx.canvas.height = window.innerHeight;
const mapsize = 200;
let x = 0;
let y = 0;
let down = false;
let currmap = [];
currmap = genrandmap(mapsize, mapsize, currmap);
let hiddenmap = [];
hiddenmap = genempmap(mapsize, mapsize, hiddenmap);
// skapa en random förstamap

function genrandmap(mapwidth, mapheight, map) {
    for (let i = 0; i < mapheight * 2; i++) {
        let subarray = [];
        for (let j = 0; j < mapwidth; j++) {
            subarray.push(random());
        }
        map.push(subarray);
    }
    return map;
}
function genempmap(mapwidth, mapheight, map) {
    for (let i = 0; i < mapheight * 2; i++) {
        let subarray = [];
        for (let j = 0; j < mapwidth; j++) {
            subarray.push(0);
        }
        map.push(subarray);
    }
    return map;
}
//rita ut currmap
function draw() {
    for (let i = 0; i < mapsize * 2; i++) {
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
tempmap = genempmap(mapsize * 2, mapsize, tempmap);

function check() {
    for (let i = 1; i < mapsize * 2 - 1; i++) {
        for (let j = 1; j < mapsize - 1; j++) {
            if (currmap[i][j] == 0) {
                if (neighbors(i, j) == 3) {
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
    tempmap = genempmap(mapsize * 2, mapsize, tempmap);
}
function randomize() {
    currmap = [];
    currmap = genrandmap(mapsize * 2, mapsize, currmap);
    draw();
}
var slider = document.getElementById("slider");
let interval = slider.value;
let lock = true;
slider.oninput = function () {
    interval = slider.value;
};

var counter = slider.value;
var myFunction = function () {
    if (lock) {
        counter = interval;
        next();
        setTimeout(myFunction, counter);
    }
};
setTimeout(myFunction, counter);
let pausebutton = document.getElementById("pausebutton");
function pause() {
    if (lock) {
        lock = false;
        pausebutton.innerHTML = "Unpause";
    } else {
        lock = true;
        pausebutton.innerHTML = "Pause";
    }
    console.log(lock);
    myFunction();
}
function clean() {
    tempmap = [];
    tempmap = genempmap(mapsize, mapsize, tempmap);
    currmap = tempmap;
    draw();
}
document.getElementById("body").onmousemove = function (event) {
    mousemove(event);
};

function mousemove(e) {
    x = e.clientX;
    y = e.clientY;
    /*hiddenmap[Math.round(x / 5)][Math.round(y / 5)] = 1;
    for (let i = 0; i < mapsize * 2; i++) {
        for (let j = 0; j < mapsize; j++) {
            if (hiddenmap[i][j] == 1) {
                ctx.fillStyle = "gray";
                ctx.fillRect(5 * i, 5 * j, 5, 5);
                hiddenmap[i][j] = 0;
            }
        }
    }*/
    if (down) {
        tempmap[Math.round(x / 5)][Math.round(y / 5)] = 1;
        currmap[Math.round(x / 5)][Math.round(y / 5)] = 1;
        draw();
    }
}
function mousedown() {
    down = true;
    tempmap[Math.round(x / 5)][Math.round(y / 5)] = 1;
    currmap[Math.round(x / 5)][Math.round(y / 5)] = 1;
    draw();
}
function mouseup() {
    down = false;
}
