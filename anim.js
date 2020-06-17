var canvas, ctx, rect;
var offsetX = 0;
var offsetY = 0;
const m = {
    x: 0,
    y: 0
};
var balls = [];
function init() {
    console.log("init");
    canvas = document.getElementById('canvas');
    console.log("canvas: " + canvas);
    ctx = canvas.getContext('2d');
    console.log("ctx: " + ctx);
    rect = canvas.getBoundingClientRect();
    console.log("rect: " + rect);
    window.onmousemove = (e) => {
        rect = canvas.getBoundingClientRect();
        m.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        m.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    }
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let numBalls = ctx.canvas.width * ctx.canvas.height / 50000;
    numBalls = Math.floor(numBalls);
    console.log(numBalls);
    for(let i = 0; i < numBalls; i++) {
        let velX = Math.random() / 2;
        let velY = Math.random() / 2;
        velX += 0.5;
        velY += 0.5;
        velX *= 2;
        velY *= 2;
        if(Math.random() < 0.5) {
            velX *= -1;
        }
        if(Math.random() < 0.5) {
            velY *= -1;
        }
        balls.push(new Ball(canvas.width * Math.random(), canvas.height * Math.random(), 3 + (Math.random() * 4), velX, velY));
    }
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1B354C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.strokeStyle = "white";
    for(let ball in balls) {
        ball = balls[ball];
        ball.move();
        let pos = ball.position;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ball.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.save();
    }
    ctx.font = '36px serif';
    ctx.fillStyle = "white";
    let text = "Hi, I'm Ryan";
    let textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (ctx.canvas.width/2) - (textWidth/2), ctx.canvas.height/2, ctx.canvas.width);
    window.requestAnimationFrame(draw);
}

class Ball {
    constructor(x, y, r, vx, vy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
    }
    get position() {
        return {x: this.x, y: this.y};
    }
    get radius() {
        return this.r;
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
        let floor = this.r / 2;
        let ceilX = canvas.width - (this.r / 2) - 1;
        let ceilY = canvas.height - (this.r / 2);
        if((this.x <= floor && this.vx < 0) || (this.x >= ceilX && this.vx > 0)) {
            this.vx *= -1;
        }
        if((this.y <= floor && this.vy < 0) || (this.y >= ceilY && this.vy > 0)) {
            this.vy *= -1;
        }
        if(isMouseCollision(this.x,this.y, this.r)) {
            if((this.x < m.x && this.vx > 0) || this.x > m.x && this.vx < 0) {
                this.vx *= -1;
            }
            if((this.y < m.y && this.vy > 0) || this.y > m.y && this.vy < 0) {
                this.vy *= -1;
            }
        }
    }
}

function isMouseCollision(x, y, r) {
    let a = x - m.x;
    let b = y - m.y;
    let dist = Math.sqrt((a*a) + (b*b));
    return dist < (r * 2);
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});