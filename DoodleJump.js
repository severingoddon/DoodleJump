//@autor severin goddon
document.addEventListener('DOMContentLoaded', function () {
    var grid = document.querySelector('.grid');
    var platforms = []; //store all visible platforms
    var jumpingUp = true; //sets if the doodler jumps up or down
    var stepsize; //defines the stepsize (how many pixels does the doodler move each step)
    var movingLeft = false;
    var standingStill = true;
    var horizontalMovingSpeed = 6;
    var cancelled; //used to stop the fadeout function
    var doodlerBottom;
    var platformMovementSpeed = 1; //vertical movement speed of the platforms
    var score = 0; //total gamescore
    var DoodlePlatform = /** @class */ (function () {
        function DoodlePlatform(newPlatBottom) {
            this.left = Math.random() * 315;
            this.bottom = newPlatBottom;
            this.visualElement = document.createElement('div');
            var visualElement = this.visualElement;
            visualElement.classList.add('platform');
            visualElement.style.left = this.left + 'px';
            visualElement.style.bottom = this.bottom + 'px';
            grid.appendChild(visualElement);
        }
        return DoodlePlatform;
    }());
    var Jumper = /** @class */ (function () {
        function Jumper(position) {
            this.left = Math.random() * 310;
            this.bottom = position;
            doodlerBottom = position;
            this.visualElement = document.createElement('div');
            var visualElement = this.visualElement;
            visualElement.classList.add('doodler');
            visualElement.style.left = this.left + 'px';
            visualElement.style.bottom = this.bottom + 'px';
            grid.appendChild(visualElement);
        }
        return Jumper;
    }());
    var jumper = new Jumper(125);
    function initializePlatforms() {
        for (var i = 0; i < 5; i++) {
            var platGap = 600 / 5;
            var newPlatBottom = 100 + i * platGap;
            var newPlatform = new DoodlePlatform(newPlatBottom);
            platforms.push(newPlatform);
        }
    }
    function start() {
        initializePlatforms();
        document.getElementById("scoreParagraph").textContent = "Score: " + score;
        //----------------------------handle keyboard input----------------------------
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }
            switch (event.code) {
                case "KeyS":
                case "ArrowDown":
                    //do nothing here yet
                    break;
                case "KeyW":
                case "ArrowUp":
                    standingStill = true;
                    break;
                case "KeyA":
                case "ArrowLeft":
                    cancelled = true;
                    standingStill = false;
                    movingLeft = true;
                    break;
                case "KeyD":
                case "ArrowRight":
                    cancelled = true;
                    standingStill = false;
                    movingLeft = false;
                    break;
            }
            event.preventDefault();
        }, true);
        //---handle keyup events
        window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }
            switch (event.code) {
                case "KeyS":
                case "ArrowDown":
                    //do nothing here yet
                    break;
                case "KeyW":
                case "ArrowUp":
                    //do nothing here yet
                    break;
                case "KeyA":
                case "ArrowLeft":
                    fadeOut();
                    break;
                case "KeyD":
                case "ArrowRight":
                    fadeOut();
                    break;
            }
            event.preventDefault();
        }, true);
    }
    function movePlatforms() {
        if (jumper.bottom > 250) {
            platforms.forEach(function (platform) {
                platform.bottom -= platformMovementSpeed;
                var visual = platform.visualElement;
                visual.style.bottom = platform.bottom + 'px';
                if (platform.bottom < 10) {
                    var firstPlatform = platforms[0].visualElement;
                    firstPlatform.classList.remove('platform');
                    firstPlatform.parentNode.removeChild(firstPlatform);
                    platforms.shift();
                    var newPlatform = new DoodlePlatform(600);
                    platforms.push(newPlatform);
                }
            });
        }
    }
    function jump() {
        var interval = 25; //set the speed of the jump
        var jumpingHeight = 23; //set the height of one jump
        stepsize = 5; //set the starting stepsize (how many pixels the doodler moves each step)
        var counter = jumpingHeight;
        var myFunction = function () {
            if (jumpingUp) {
                moveJumper();
                stepsize = (counter * counter * 4) / 100; //x^2 * 4 -> Hyperbel
                counter -= 1;
                if (counter == 0)
                    jumpingUp = false; //jumping up finished, falling down is next step
            }
            else {
                if (checkCollision()) {
                    score++;
                    document.getElementById("scoreParagraph").textContent = "Score: " + score;
                    jumpingUp = true;
                    jump();
                    return;
                }
                stepsize = (counter * counter * 4) / 100; //x^2 * 4 -> Hyperbel
                counter -= 1;
                moveJumper();
            }
            setTimeout(myFunction, interval);
        };
        setTimeout(myFunction, interval);
    }
    function moveJumper() {
        if (jumpingUp) {
            jumper.bottom += stepsize;
            var visual = jumper.visualElement;
            visual.style.bottom = jumper.bottom + 'px';
        }
        if (!jumpingUp) {
            if (stepsize < 16)
                jumper.bottom -= stepsize; //max stepsize is 16 => the doodler won't increase it's speed permanently when falling
            else
                jumper.bottom -= 16;
            var visual = jumper.visualElement;
            visual.style.bottom = jumper.bottom + 'px';
        }
        if (movingLeft && !standingStill) {
            jumper.visualElement.style.backgroundImage = 'url(\'doodler-guy-small-inverted.png\')';
            jumper.left -= horizontalMovingSpeed;
            var visual = jumper.visualElement;
            visual.style.left = jumper.left + 'px';
        }
        if (!movingLeft && !standingStill) {
            jumper.visualElement.style.backgroundImage = 'url(\'doodler-guy-small.png\')';
            jumper.left += horizontalMovingSpeed;
            var visual = jumper.visualElement;
            visual.style.left = jumper.left + 'px';
        }
    }
    function fadeOut() {
        var localInterval = 50; //set the speed of the jump
        var localCounter = 10;
        cancelled = false;
        var fadeOutFunction = function () {
            if (cancelled) {
                horizontalMovingSpeed = 6;
                return;
            }
            horizontalMovingSpeed = (localCounter * localCounter * 4) / 100; //x^2 * 4 -> Hyperbel
            localCounter -= 1;
            if (localCounter == 0) {
                standingStill = true;
                horizontalMovingSpeed = 6;
                return;
            } //jumping up finished, falling down is next step
            setTimeout(fadeOutFunction, localInterval);
        };
        setTimeout(fadeOutFunction, localInterval);
    }
    function checkCollision() {
        for (var _i = 0, platforms_1 = platforms; _i < platforms_1.length; _i++) {
            var platform = platforms_1[_i];
            if (jumper.bottom <= (platform.bottom + 20) &&
                jumper.bottom >= (platform.bottom - 20) &&
                jumper.left + 20 >= (platform.left - 10) &&
                jumper.left <= (platform.left + 85) &&
                platform.bottom < 500)
                return true;
        }
        return false;
    }
    //start the game, activate the platform movement function and jump!
    start();
    setInterval(movePlatforms, 2);
    jump();
});
