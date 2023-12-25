const canvas = document.getElementById("myCanvas")
const context = canvas.getContext("2d")

const scoreDisplay = document.getElementById("myScore")
const scoreContext = scoreDisplay.getContext("2d")

document.body.style.zoom = screen.height / 11 + "%" /*Zooms user's POV */

let score, velocity, running, bestScore = 0
let player = {
    x: 100,
    y: 600,
    width: 50,
    height: 100
}
let cactus = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

context.font = "30px Monospace"
context.fillStyle = "black"
context.textAlign = "center"
context.fillText("Click to start", 350, 400)
/*Starting Text */


canvas.addEventListener("click", event => {
    if(running != true){
        Initialize()
        console.log("start")
    }
})
/*Awaits user input to begin */

/*These 2 event listeners wait for keyboard or click input from the user and change the bird's y coordinate if the game is running*/
window.addEventListener("keyup", event => {
    if((event.code == "Space" || event.code == "ArrowUp") && running == true){
        if (player.y == 600){
            player.y -= 200
        }
    }
})
canvas.addEventListener("click", event => {
    if(running == true){
        player.y -= 200
    }
})

function Initialize(){
    score = 0 /*Resets score */

    /*Resets Score Box */
    scoreDisplay.style.display = "block"
    scoreContext.font = "32px Permanent Marker, Cursive"
    scoreContext.fillStyle = "rgb(48, 48, 48)"
    scoreContext.fillRect(0, 0, 100, 100)
    scoreContext.fillStyle = "white"
    scoreContext.textAlign = "center"


    scoreContext.fillText(`${score}`, 50, 50)

    /*Initializes game */
    running = true
    createCactus()
    clearCanvas()
    drawPlayer()
    nextFrame()
}

function nextFrame(){
    const Interval = setInterval(update, 100)
    function update(){
        if (running == true){
            if (player.y < 600){
                velocity = Math.sqrt(19.6*(300 - (300 - player.y)))
                velocity = velocity / 5
                if (player.y + velocity < 600){
                    player.y = player.y + velocity
                }
                else{
                    player.y = 600
                }
                
                /*Velocity calculated and adjusted for game by me */
            }
            score += 1
            cactus.x -= 25 + (score / 100)
            if (cactus.x <= 0){
                createCactus()
            }
            checkOver()

            clearCanvas()
            drawPlayer()
            drawCactus()
            updateScore()
        }
        else{
            clearInterval(Interval)
            console.log("Program stopped")
        }
    }
}
function createCactus(){
    cactus.x = 700
    cactus.y = 700
    function createRandom(){
        return Math.floor(Math.random() * (5))
        /*Generates random integer number between 0 (included) and 25 (excluded)*/
    }
    cactus.height = 50 + (createRandom() * 10)
    cactus.width = 50 + (createRandom() * 5)
    console.log(cactus.height, cactus.width)
}

function drawCactus(){
    context.fillStyle = "rgb(91, 111, 85)"
    context.strokeStyle = "black"
    context.fillRect(cactus.x, cactus.y, cactus.width, -cactus.height)

    /*Creates cactus outline*/
    context.strokeRect(cactus.x, cactus.y, cactus.width, -cactus.height)
}
function clearCanvas(){
    context.fillStyle = "skyblue"
    context.fillRect(0, 0, 700, 700)

    context.fillStyle = "rgb(224, 222, 96)"
    context.fillRect(0, 700, 700, 50)
}

function drawPlayer(){
    context.fillStyle = "purple"
    context.fillRect(player.x, player.y, player.width, player.height)
}

function updateScore(){
    /*Resets and writes on the mini canvas, dedicated for score display */
    scoreContext.fillStyle = "rgb(48, 48, 48)"
    scoreContext.fillRect(0, 0, 100, 100)

    scoreContext.font = "32px Permanent Marker, Cursive"
    scoreContext.fillStyle = "white"
    scoreContext.textAlign = "center"
    scoreContext.fillText(`${score}`, 50, 50)
}

function checkOver(){
    if (cactus.x <= 150 && (cactus.x + cactus.width) >= 100)
    {
        console.log("Detect")
        if ((player.y + player.height) > (700 - cactus.height)){
            running = false
            console.log("Game over")
        }
        
    }
}