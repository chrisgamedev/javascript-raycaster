var ctx;
var dist = 2000;
var fov = 60;
var detail = 1;

var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// var images = [
//     new MyImg("images/wall.png"),
//     new MyImg("images/wall2.png")
// ];

var game = {
    canvas: { w: 0, h: 0 },
    objs: [],
    input: {
        keys: {},
        mouse: { x: 0, y: 0, click: false },
        mousePos: { x: 0, y: 0, w: 1, h: 1 }
    },
    scroll: { x: 0, y: 0 },
    draw2D: false,
    draw2DToggled: false
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game.canvas.w = canvas.width;
    game.canvas.h = canvas.height
}

function addInputListeners() {
    window.addEventListener("resize", resize)
    window.addEventListener("keydown", function (event) { game.input.keys[event.which] = true });
    window.addEventListener("keyup", function (event) { delete game.input.keys[event.which] });
    window.addEventListener("mousemove", function (event) { 
        game.input.mouse.x = event.movementX + document.body.style.marginLeft; 
        game.input.mouse.y = event.movementY + document.body.style.marginTop; 
        game.input.mousePos.x = event.clientX;
        game.input.mousePos.y = event.clientY;
    });
    window.addEventListener("mousedown", function (event) { 
        if (!collision(game.input.mousePos, { x: 0, y: 0, w: 220, h: 160 }))
            canvas.requestPointerLock(); 

        game.input.mouse.click = true 
    });
    window.addEventListener("mouseup", function (event) { game.input.mouse.click = false });
}

function init() {
    canvas = document.getElementById("screen");
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;

    canvas.requestPointerLock = canvas.requestPointerLock || canvas.moxRequestPointerLock
    canvas.requestPointerLock();

    resize();
    addInputListeners();

    if (ctx) {
        game.objs.push(new Player());
        loadMap();
        requestAnimationFrame(loop);
    }
}

function loadMap() {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] != 0)
                game.objs.push(new Wall(j * 60, i * 60, 60, 60, map[i][j]))
        }
    }
}

function loop() {
    requestAnimationFrame(loop);
    time.calculateDeltaTime();

    // change detail
    if (79 in game.input.keys)
        if (detail > 1)
            detail--;

    if (80 in game.input.keys)
        if (detail < 10)
            detail++;

    document.getElementById("detailDisplay").innerText = "Detail: " + detail;

    // Toggling Between Drawing Modes
    if (keyCode.space in game.input.keys && !game.draw2DToggled) {
        game.draw2D = !game.draw2D;
        game.draw2DToggled = true;
    }
    if (!(keyCode.space in game.input.keys))
        game.draw2DToggled = false;

    // 2D Drawing
    if (game.draw2D) {
        drawRect("rgb(50, 50, 50)", 0, 0, game.canvas.w, game.canvas.h, true);

        for (var obj of game.objs) {
            obj.update(time.delta);
            if (obj.type == "Player") {
                game.scroll.x = obj.x - game.canvas.w / 2 + obj.r;
                game.scroll.y = obj.y - game.canvas.h / 2 + obj.r;
                obj.draw2D();
            }
            if (obj.type == "Wall") obj.draw2D();
        }
    }
    // 2.5D Drawing
    else {
        drawRect("rgb(177, 239, 252)", 0, 0, game.canvas.w, game.canvas.h / 2, true);
        drawRect("rgb(50, 50, 50)", 0, game.canvas.h / 2, game.canvas.w, game.canvas.h / 2, true);

        for (var obj of game.objs) {
            obj.update(time.delta);
            if (obj.type == "Player") obj.draw3D();
        }
    }
}