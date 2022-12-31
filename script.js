console.log("Welcome to Tic Tac Toe");
let bgMusic = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
const tiles = Array.from(document.querySelectorAll(".box"));
const resetButton = document.getElementById("reset");
const playersTurn = document.querySelector(".info");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;
// Function to change the turn
const changeTurn = () => {
  return currentPlayer === "X" ? "0" : "X";
};

const isValidMove = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "0") {
    return false;
  }
  return true;
};

const updateBoard = (index) => {
  board[index] = currentPlayer;
};
// Function check which player wins the match
let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let lineGradient = [
  [5, 5, 0],
  [5, 15, 0],
  [5, 25, 0],
  [-5, 15, 90],
  [5, 15, 90],
  [15, 15, 90],
  [5, 15, 45],
  [5, 15, 135],
];
function checkWinner() {
  let roundWon = false;
  let lineGrad;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    lineGrad = lineGradient[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    const x_grad = lineGrad[0];
    const y_grad = lineGrad[1];
    const rotate = lineGrad[2];
    document
      .querySelector(".imgbox")
      .getElementsByTagName("img")[0].style.width = "200px";
    document.querySelector(".line").style.width = "20vw";
    document.querySelector(
      ".line"
    ).style.transform = `translate(${x_grad}vw, ${y_grad}vw) rotate(${rotate}deg)`;
    playersTurn.innerText = `Player ${currentPlayer} Won`;
    isGameOver = true;
    return;
  }
  if (!board.includes("")) {
    playersTurn.innerText = 'Match Tie'
    isGameOver = true;
  }
}

const userAction = (tile, index) => {
  if (isValidMove(tile)) {
    tile.innerText = currentPlayer;
    audioturn.play();
    updateBoard(index);
    checkWinner();
    if (!isGameOver) {
      currentPlayer = changeTurn();
      playersTurn.innerText = "Turn for " + currentPlayer;
    } else {
      document.querySelector(".game-container").classList.add("disableGrid");
      gameOver.play();
    }
  }
};
tiles.forEach((tile, index) => {
  
  let boxText = tile.querySelector(".boxtext");
  tile.addEventListener("click", () => userAction(boxText, index));
});

// Adding listener to reset
resetButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  let boxTexts = document.getElementsByClassName("boxtext");
  Array.from(boxTexts).forEach((element) => {
    element.innerText = "";
  });

  currentPlayer = changeTurn();
  isGameOver = false;
  playersTurn.innerText = "Turn for " + currentPlayer;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
  document.querySelector(".line").style.width = "0vw";
  document.querySelector(".game-container").classList.remove("disableGrid");
});
// // Game Logic

// tiles.forEach((element) => {
//   let boxText = element.querySelector(".boxtext");
//   element.addEventListener("click", () => {
//     if (boxText.innerText === "") {
//       boxText.innerText = playerTurn;
//       playerTurn = changeTurn();
//       audioturn.play();
//       checkWinner();
//       if (!isGameOver) {
//         playersTurn.innerText =
//           "Turn for " + playerTurn;
//       }else{
//         document.querySelector('.game-container').classList.add('disableGrid')
//         gameOver.play();
//       }
//     }
//   });
// });

// const checkWinner = () => {
//   let boxTexts = document.getElementsByClassName("boxtext");
//   let winningCase = [
//     [0, 1, 2, 5, 5, 0],
//     [3, 4, 5, 5, 15, 0],
//     [6, 7, 8, 5, 25, 0],
//     [0, 3, 6, -5, 15, 90],
//     [1, 4, 7, 5, 15, 90],
//     [2, 5, 8, 15, 15, 90],
//     [0, 4, 8, 5, 15, 45],
//     [2, 4, 6, 5, 15, 135],
//   ];
//   winningCase.forEach((element) => {
//     // if (
//     //   boxTexts[element[0]].innerText !== "" &&
//     //   boxTexts[element[0]].innerText === boxTexts[element[1]].innerText &&
//     //   boxTexts[element[1]].innerText === boxTexts[element[2]].innerText
//     // ) {
//     //   currentPlayer.innerText =
//     //     boxTexts[element[0]].innerText + " Wins";
//     //   isGameOver = true;
//     //   document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width='200px';
//     //   document.querySelector('.line').style.width = '20vw'
//     //   document.querySelector('.line').style.transform = `translate(${element[3]}vw, ${element[4]}vw) rotate(${element[5]}deg)`;
//     // }
//     const a = boxTexts[element[0]].innerText;
//     const b = boxTexts[element[1]].innerText;
//     const c = boxTexts[element[2]].innerText;
//     if (a === b && b === c && a !== "" && b !== "" && c !== "") {
//       document
//         .querySelector(".imgbox")
//         .getElementsByTagName("img")[0].style.width = "200px";
//       document.querySelector(".line").style.width = "20vw";
//       document.querySelector(
//         ".line"
//       ).style.transform = `translate(${element[3]}vw, ${element[4]}vw) rotate(${element[5]}deg)`;
//       playersTurn.innerText = `Player ${currentPlayer} Won`;
//       isGameOver = true;
//       //   return;
//     }
//   });
// };
