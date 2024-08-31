const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("[curr-player]");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

function refresh()
{
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;// green wala hatane ke liye hai
    });
}
// ab game ko start krne ke liye function bnate hai
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //game fir se sure krne ke liye
    refresh();
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"; // pointer se cursor me change krne ke liye
        // swap current player
        swapTurn();
        //check kro har bar naya input se phle
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X")
    {
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`; // ye line of code current wale ko change krne ke liye likh rhe hai
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            //check ki kon jita
            if(gameGrid[position[0]] === "X")
            answer = "X";
            else
            answer = "O";
            
            // ab hm winner jante hai to uska background color green krenge
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            // ab pointer ko disable kr do takli click hi na ho
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
        }
    });

    // current player wale ko change kro
    if(answer !== "")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return; // ek case ayesa hoga jisme koi player win kr rha hoga aur board v bhr gya hoga usko handle krne 
    }

    // ab bs draw wala case bacha hai
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box != "")
        fillCount++;
    });

    // means board fill ho gya hai jb fill count 9 hoga tb
    if(fillCount === 9)
    {
        gameInfo.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }
}


newGameBtn.addEventListener("click", initGame);