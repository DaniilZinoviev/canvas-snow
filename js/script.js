'use strict';
var canvasElement = document.getElementById('canvas');
var ctx = canvasElement.getContext('2d');

var particlesOnScreen = 100;
var particlesArray = [];
var w, h;
w = canvasElement.width = window.innerWidth;
h = canvasElement.height = window.innerHeight;

function random(min, max) {
    return min + Math.random() * (max - min + 1);
}

function clientResize(e) {
    w = canvasElement.width = window.innerWidth;
    h = canvasElement.height = window.innerHeight;
}
window.addEventListener('resize', clientResize);

function createSnowFlakes() {
    for (var i = 0; i < particlesOnScreen; i++) {
        particlesArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: random(-11, 11),
            speedY: random(7, 15),
            radius: random(0.5, 4.2)
        });
    }
}

function drawSnowFlakes() {
    for (var i = 0; i < particlesArray.length; i++) {
        var gradient = ctx.createRadialGradient(particlesArray[i].x, particlesArray[i].y, 0, particlesArray[i].x, particlesArray[i].y, particlesArray[i].radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, ' + particlesArray[i].opacity + ')'); // white
        gradient.addColorStop(0.8, 'rgba(210, 236, 242, ' + particlesArray[i].opacity + ')'); // bluish
        gradient.addColorStop(1, 'rgba(237, 247, 249, ' + particlesArray[i].opacity + ')'); // lighter bluish
        ctx.beginPath();
        ctx.arc(particlesArray[i].x, particlesArray[i].y, particlesArray[i].radius, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

function moveSnowFlakes() {
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX;
        particlesArray[i].y += particlesArray[i].speedY;
        if (particlesArray[i].y > h) {
            particlesArray[i].x = Math.random() * w;
            particlesArray[i].y = -50;
        }
    }
}

function updateSnowFall() {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
}

createSnowFlakes();
setInterval(updateSnowFall, 50);
