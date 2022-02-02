//@autor severin goddon

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let platforms = [] //store all visible platforms
    let jumpingUp = true //sets if the doodler jumps up or down
    let stepsize //defines the stepsize (how many pixels does the doodler move each step)
    let movingLeft = false
    let standingStill = true
    let horizontalMovingSpeed = 6
    let cancelled //used to stop the fadeout function
    let doodlerBottom
    let platformMovementSpeed = 1 //vertical movement speed of the platforms
    let score = 0 //total gamescore

    class DoodlePlatform {
        left: number;
        bottom: number;
        visualElement: HTMLDivElement;
        constructor(newPlatBottom) {
            this.left = Math.random() * 315
            this.bottom = newPlatBottom
            this.visualElement = document.createElement('div')
            const visualElement = this.visualElement
            visualElement.classList.add('platform')
            visualElement.style.left = this.left + 'px'
            visualElement.style.bottom = this.bottom + 'px'
            grid.appendChild(visualElement)
        }
    }

    class Jumper {
        left: number;
        bottom: number;
        visualElement: HTMLDivElement;
        constructor(position: number) {
            this.left = Math.random() * 310
            this.bottom = position
            doodlerBottom = position
            this.visualElement = document.createElement('div')
            const visualElement = this.visualElement
            visualElement.classList.add('doodler')
            visualElement.style.left = this.left + 'px'
            visualElement.style.bottom = this.bottom + 'px'
            grid.appendChild(visualElement)
        }
    }
    const jumper = new Jumper(125)

    function createPlatform() {
        for(let i =0; i < 5; i++) {
            let platGap = 600 / 5
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new DoodlePlatform(newPlatBottom)
            platforms.push(newPlatform)
        }
    }

    function start() {
        createPlatform()
        document.getElementById("scoreParagraph").textContent = "Score: "+score

        //----------------------------handle keyboard input----------------------------

        window.addEventListener("keydown", function(event) {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }

            switch(event.code) {
                case "KeyS":
                case "ArrowDown":
                    //do nothing here yet
                    break;
                case "KeyW":
                case "ArrowUp":
                    standingStill = true
                    break;
                case "KeyA":
                case "ArrowLeft":
                    cancelled = true
                    standingStill = false
                    movingLeft = true
                    break;
                case "KeyD":
                case "ArrowRight":
                    cancelled = true
                    standingStill = false
                    movingLeft = false
                    break;
            }
            event.preventDefault();
        }, true);

        //---handle keyup events
        window.addEventListener("keyup", function(event) {
            if (event.defaultPrevented) {
                return; // Do nothing if event already handled
            }
            switch(event.code) {
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
                    fadeOut()
                    break;
                case "KeyD":
                case "ArrowRight":
                    fadeOut()
                    break;
            }
            event.preventDefault();
        }, true);
    }

    function movePlatforms() {
        if(jumper.bottom > 250) {
            platforms.forEach(platform => {
                platform.bottom -= platformMovementSpeed
                let visual = platform.visualElement
                visual.style.bottom = platform.bottom + 'px'
                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visualElement
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    var newPlatform = new DoodlePlatform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump(){
        let interval = 25 //set the speed of the jump
        let jumpingHeight = 23 //set the height of one jump
        stepsize = 5 //set the starting stepsize (how many pixels the doodler moves each step)
        let counter = jumpingHeight
        var myFunction = function() {
            if(jumpingUp) {
                moveJumper()
                stepsize = (counter * counter * 4)/100//x^2 * 2 -> Hyperbel
                counter -= 1
                if(counter==0) jumpingUp = false //jumping up finished, falling down is next step
            }else{
                if(checkCollision()){
                    score++
                    document.getElementById("scoreParagraph").textContent = "Score: "+ score
                    jumpingUp = true
                    jump()
                    return
                }
                stepsize = (counter * counter * 4) /100//x^2 * 2 -> Hyperbel
                counter -= 1
                moveJumper()
            }
            setTimeout(myFunction, interval);
        }
        setTimeout(myFunction, interval);
    }

    function moveJumper(){
        if (jumpingUp){
            jumper.bottom += stepsize
            let visual = jumper.visualElement
            visual.style.bottom = jumper.bottom + 'px'
        }
        if(!jumpingUp){
            if(stepsize < 16) jumper.bottom -= stepsize
            else jumper.bottom -= 16
            let visual = jumper.visualElement
            visual.style.bottom = jumper.bottom + 'px'
        }
        if(movingLeft && !standingStill){
            jumper.visualElement.style.backgroundImage = 'url(\'doodler-guy-small-inverted.png\')'
            jumper.left -= horizontalMovingSpeed
            let visual = jumper.visualElement
            visual.style.left = jumper.left + 'px'
        }if(!movingLeft && !standingStill){
            jumper.visualElement.style.backgroundImage = 'url(\'doodler-guy-small.png\')'
            jumper.left += horizontalMovingSpeed
            let visual = jumper.visualElement
            visual.style.left = jumper.left + 'px'
        }

    }

    function fadeOut(){
        let localInterval = 50 //set the speed of the jump
        let localCounter = 10
        cancelled = false
        var fadeOutFunction = function() {
            if(cancelled) {
                horizontalMovingSpeed = 6
                return;
            }
            horizontalMovingSpeed = (localCounter * localCounter * 4)/100//x^2 * 2 -> Hyperbel
            localCounter -= 1
            if(localCounter==0) {
                standingStill = true
                horizontalMovingSpeed = 6
                return
            } //jumping up finished, falling down is next step
            setTimeout(fadeOutFunction, localInterval);
        }
        setTimeout(fadeOutFunction, localInterval);
    }

    function checkCollision(){
        for (let platform of platforms) {
            if (jumper.bottom <= (platform.bottom + 20) &&
                jumper.bottom >= (platform.bottom - 20) &&
                jumper.left >= (platform.left-10) &&
                jumper.left <= (platform.left + 85) &&
                platform.bottom < 500) return true
        }
        return false
    }

    //start the game, activate the platform movement function and jump!
    start()
    setInterval(movePlatforms,2)
    jump()
})