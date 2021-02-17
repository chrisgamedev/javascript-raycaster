class Wall {
    constructor(x, y, w, h, wallNum) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = "Wall";
        this.wallNum = wallNum;
        this.color = "white";

        // this is needed for checking the ray/line collisions

        this.sides = [
            { x1: x, y1: y, x2: x + w, y2: y, color: "red" },
            { x1: x, y1: y, x2: x, y2: y + h, color: "green" },
            { x1: x + w, y1: y, x2: x + w, y2: y + h, color: "blue" },
            { x1: x, y1: y + h, x2: x + w, y2: y + h, color: "yellow" }
        ];

        for (var line of this.sides)
            line.color = rgb(random(0,255), random(0,255), random(0, 255));
    }

    update(dt) {

    }

    draw2D() {
        drawRect(this.color, this.x - game.scroll.x, this.y - game.scroll.y, this.w, this.h, true);
    }
}