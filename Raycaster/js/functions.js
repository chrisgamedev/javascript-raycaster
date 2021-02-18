function distance(a, b) {
    return (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
}

function collision(a, b) {
    return (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y)
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

function toDeg(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}

function toRad(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

class MyImg {
    constructor(source) {
        this.img = new Image();
        this.img.src = source;
    }
}

var time = {
    now: 0,
    last: Date.now(),
    delta: 0,
    calculateDeltaTime: function() {
        time.now = Date.now();
        time.delta = (time.now / time.last) / 1000;
        time.last = time.now;
    }
};

// https://keycode.info/
var keyCode = {
    w: 87,
    s: 83,
    a: 65,
    d: 68,
    space: 32,
    left: 37,
    right: 39,
    up: 38,
    down: 40,
    shift: 16
}

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false;
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // Lines are parallel
    if (denominator === 0) {
        return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false;
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return { x, y };
}

function drawImg(img, sx, sy, sw, sh, x, y, w, h) {
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function drawLine(color, x1, y1, x2, y2, width) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width || 1;
    draw(color);
    ctx.closePath();
}

function drawCircle(color, x, y, r, fill) {
    ctx.beginPath();
    ctx.arc(x, y, Math.abs(r), 0, Math.PI * 2);
    draw(color, fill);
    ctx.closePath();
}

function drawRect(color, x, y, w, h, fill) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    draw(color, fill);
    ctx.closePath();
}

function draw(color, fill) {
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}