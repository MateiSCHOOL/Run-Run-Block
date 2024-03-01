const canvas = document.getElementById("myCanvas")
const context = canvas.getContext("2d")

const scoreDisplay = document.getElementById("myScore")
const scoreContext = scoreDisplay.getContext("2d")

document.body.style.zoom = screen.height / 11 + "%" /*Zooms user's POV */

let score, velocity, running, canStart, bestScore = 0
let player = {
    x: 100,
    y: 350,
    width: 50,
    height: 100
}
let cactus = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

let cloud1 = {
    x: 0,
    y: 50,
    width: 100,
    height: 50
}

let cloud2 = {
    x: 0,
    y: 175,
    width: 100,
    height: 50
}

let cloud3 = {
    x: 0,
    y: 300,
    width: 100,
    height: 50
}

let jumpSound = new Audio("jump.mp3")
let loseSound = new Audio("lose.mp3")
let cloud = new Image()
cloud.src = "cloud.png"
let cactusimg = new Image()
cactusimg.src = "cactus.png"

context.font = "30px Monospace"
context.fillStyle = "black"
context.textAlign = "center"
context.fillText("Click to start", 350, 250)
/*Starting Text */


canvas.addEventListener("click", event => {
    if((running != true) && (canStart != false)){
        setTimeout(Initialize, 50)
        console.log("start")
    }
})
/*Awaits user input to begin */

/*These 2 event listeners wait for keyboard or click input from the user and change the player's y coordinate if the game is running*/
window.addEventListener("keyup", event => {
    if((event.code == "Space" || event.code == "ArrowUp") && running == true){
        if (player.y == 350){
            jumpSound.play()
            player.y -= 200
        }
    }
})
canvas.addEventListener("click", event => {
    if (player.y == 350 && running == true){
        jumpSound.play()
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
    createClouds()
    clearCanvas()
    drawPlayer()
    drawClouds()
    nextFrame()
}

function nextFrame(){
    const Interval = setInterval(update, 100)
    function update(){
        if (running == true){
            if (player.y < 350){
                velocity = Math.sqrt(19.6*(300 - (300 - player.y)))
                velocity = velocity/5
                if (player.y + velocity < 350){
                    player.y = player.y + velocity
                }
                else{
                    player.y = 350
                }
                
                /*Velocity calculated and adjusted for game by me */
            }
            score += 1
            cactus.x -= 30 + (score / 100)
            if (cactus.x <= 0){
                createCactus()
            }
            cloud1.x -= 5
            cloud2.x -= 5
            cloud3.x -= 5

            if (cloud1.x <= -100){
                cloud1.x = 700
            }
            if (cloud2.x <= -100){
                cloud2.x = 700
            }
            if (cloud3.x <= -100){
                cloud3.x = 700
            }

            checkOver()
            clearCanvas()
            drawCactus()
            drawClouds()
            drawPlayer()
            updateScore()
        }
        else{
            clearInterval(Interval)
            console.log("Program stopped")
        }
    }
}
function createCactus(){
    cactus.y = 460
    function createRandom(){
        return Math.floor(Math.random() * (5))
        /*Generates random integer number between 0 (included) and 5 (excluded)*/
    }
    cactus.height = 100 + (createRandom() * 10)
    cactus.width = 50 + (createRandom() * 5)
    console.log(cactus.height, cactus.width)
    cactus.x = 700 + (createRandom() * 200)
    console.log(cactus.x)
}

function drawCactus(){
    context.drawImage(cactusimg, cactus.x, cactus.y, cactus.width, -cactus.height)
}
function clearCanvas(){
    context.fillStyle = "skyblue"
    context.fillRect(0, 0, 800, 450)

    context.fillStyle = "rgb(193, 154, 107)"
    context.fillRect(0, 450, 800, 100)
}

function drawPlayer(){
    context.fillStyle = "purple"
    context.fillRect(player.x, player.y, player.width, player.height)
}

function createClouds(){
    function createRandom(){
        return Math.floor(Math.random() * (8))
        /*Generates random integer number between 0 (included) and 8 (excluded)*/
    }
    cloud1.x = createRandom() * 100
    cloud2.x = createRandom() * 100
    cloud3.x = createRandom() * 100
}

function drawClouds(){
    context.drawImage(cloud, cloud1.x, cloud1.y, cloud1.width, cloud1.height)
    context.drawImage(cloud, cloud2.x, cloud2.y, cloud2.width, cloud2.height)
    context.drawImage(cloud, cloud3.x, cloud3.y, cloud3.width, cloud3.height)
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
    if (cactus.x <= 140 && (cactus.x + cactus.width) >= 110)
    {
        console.log("Detect")
        if ((player.y + player.height) > (460 - cactus.height)){
            console.log("Game over")
            loseSound.play()
            clearCanvas()
            drawPlayer()
            drawCactus()
            running = false
            canStart = false
            setTimeout(writeLoseText, 500)
        }
        
    }
}

function writeLoseText(){
    context.font = "30px Monospace"
    context.fillStyle = "black"
    context.textAlign = "center"
    context.fillText("Game Over", 350, 250)
    context.fillText("Click to restart", 350, 300)
    canStart = true
}
