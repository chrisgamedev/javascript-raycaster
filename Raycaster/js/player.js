class Player {
    constructor() {
        this.x = 500;
        this.y = 500;
        this.r = 5;

        this.w = this.r * 2;
        this.h = this.r * 2;

        this.angle = 0;
        this.spd = 4000;
        this.sprint = 1;
        this.rotSpd = 100;
        this.vel = { x: 0, y: 0 }
        this.friction = 750;

        this.mouseLastX = 0;
        this.type = "Player";
    }

    update(dt) {

        var overallSpd = this.spd * this.sprint * dt;
        if (keyCode.w in game.input.keys) {
            this.vel.x += Math.cos(toRad(this.angle)) * overallSpd;
            this.vel.y += Math.sin(toRad(this.angle)) * overallSpd;
        } if (keyCode.s in game.input.keys) {
            this.vel.x -= Math.cos(toRad(this.angle)) * overallSpd;
            this.vel.y -= Math.sin(toRad(this.angle)) * overallSpd;
        } if (keyCode.a in game.input.keys) {
            this.vel.x += Math.cos(toRad(this.angle - 90)) * overallSpd;
            this.vel.y += Math.sin(toRad(this.angle - 90)) * overallSpd;
        } if (keyCode.d in game.input.keys) {
            this.vel.x += Math.cos(toRad(this.angle + 90)) * overallSpd;
            this.vel.y += Math.sin(toRad(this.angle + 90)) * overallSpd;
        }

        if (keyCode.left in game.input.keys)
            this.angle -= 4000 * dt;
        if (keyCode.right in game.input.keys) 
            this.angle += 4000 * dt;

        this.collide();

        if (this.mouseLastX != game.input.mouse.x)
            this.angle += game.input.mouse.x * this.rotSpd * dt;
        this.mouseLastX = game.input.mouse.x;

        this.x += this.vel.x;
        this.y += this.vel.y;

        // adding friction to the player
        var f = 1 / (1 + (this.friction * dt));
        this.vel.x *=  f;
        this.vel.y *=  f;
    }
    
    collide() {
        for (var obj of game.objs) {
            if (obj.type == "Wall") {

                // these collisions work by calculating how far the player has moved into the wall, and then moving them out that distance

                var c = { x: this.x + this.vel.x, y: this.y, w: this.w, h: this.h }
                if (collision(c, obj)) {
                    if (this.vel.x < 0) this.vel.x = obj.x + obj.w - this.x + 0.1;
                    else if (this.vel.x > 0) this.vel.x = obj.x - this.x - this.w - 0.1;
                }
                var c = { x: this.x, y: this.y + this.vel.y, w: this.w, h: this.h }
                if (collision(c, obj)) {
                    if (this.vel.y < 0) this.vel.y = obj.y + obj.h - this.y + 0.1;
                    else if (this.vel.y > 0) this.vel.y = obj.y - this.y - this.h - 0.1;
                }
            }
        }
    }

    draw3D() {
        var i = 0;

        // cast rays out according to fov and detail
        for (let a = -(fov / 2) + this.angle; a < (fov / 2) + this.angle; a += 1 / detail) {
            i++;
            var closest = null;
            var wallNum = 0;
            var sidesColor = "red";
            var minDistance = Infinity;

            var deltaX = dist * Math.cos(toRad(a));
            var deltaY = dist * Math.sin(toRad(a));

            // calculating which is side of wall is closest to the player
            for (var obj of game.objs) {
                if (obj.type == "Wall") {
                    for (var line of obj.sides) {
                        var point = intersect(this.x, this.y, this.x + deltaX, this.y + deltaY, line.x1, line.y1, line.x2, line.y2);
                        if (point) {
                            var newDistance = distance(this, point);
                            if (newDistance < minDistance) {
                                closest = line;
                                sidesColor = line.color;
                                wallNum = obj.wallNum;
                                minDistance = newDistance;
                            }
                        }
                    }
                }
            }
            
            if (closest) {

                // find the exact point of intersection between the side of wall and ray
                var point = intersect(this.x, this.y, this.x + deltaX, this.y + deltaY, closest.x1, closest.y1, closest.x2, closest.y2);

                var distToWall = Math.sqrt(distance(point, this));

                // some of these lines are just guessing and checking to see if it looks alright
                var rays = fov * detail;
                var height = distance > 600 ? 0 : game.canvas.h / distToWall * 100;

                // some old code to render images instead of rectangles
                // var offset = (closest.x1 == closest.x2) ? point.y : point.x;
                
                // var wall = images[wallNum - 1].img;
                // var imgSize = 64;

                // drawImg(
                //     wall,

                //     offset % (imgSize - 1),
                //     0,
                //     (imgSize - 100) / i,
                //     imgSize,


                //     (game.canvas.w / rays) * i,
                //     game.canvas.h / 2 - height / 2,
                //     game.canvas.w / rays + 1,
                //     height
                // );

                // draw a rectangle according to distance from point
                drawRect(
                    sidesColor,
                    (game.canvas.w / rays) * i - 10,
                    game.canvas.h / 2 - height / 2,
                    game.canvas.w / rays + 1,
                    height,
                    true
                );
            }    
        }
    }

    draw2D() {

        drawCircle("red", game.canvas.w / 2, game.canvas.h / 2 , this.r, true);
        
        // this is the same as the draw3D function except i just draw a line from the player to the collision point
        var i = 0;
        for (let a = -(fov / 2) + this.angle; a < (fov / 2) + this.angle; a += 1 / detail) {
            i++;
            var closest = null;
            var wallNum = 0;
            var minDistance = Infinity;

            var deltaX = dist * Math.cos(toRad(a));
            var deltaY = dist * Math.sin(toRad(a));

            for (var obj of game.objs) {
                if (obj.type == "Wall") {
                    for (var line of obj.sides) {
                        var point = intersect(this.x, this.y, this.x + deltaX, this.y + deltaY, line.x1, line.y1, line.x2, line.y2);
                        if (point) {
                            var newDistance = distance(this, point);
                            if (newDistance < minDistance) {
                                closest = line;
                                wallNum = obj.wallNum;
                                minDistance = newDistance;
                            }
                        }
                    }
                }
            }
            
            if (closest) {
                var point = intersect(this.x, this.y, this.x + deltaX, this.y + deltaY, closest.x1, closest.y1, closest.x2, closest.y2);
                drawLine("red", this.x + this.r - game.scroll.x, this.y + this.r - game.scroll.y, point.x - game.scroll.x, point.y - game.scroll.y);
            }
        }
    }
}