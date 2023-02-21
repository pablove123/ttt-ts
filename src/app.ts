let squareEls = document.querySelectorAll(".sqr")!
let messageEl = document.querySelector("#message")!
let winningCombos =[[0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]!

let turn:number = -1
let board:number[] = [0,0,0,0,0,0,0,0,0 ]

let winner:boolean = false
let tie:boolean = false
let scoreBoard = {
  xWins: 0,
  oWins: 0,
  ties: 0
}

const xwins = document.getElementById("xwins")!
const owins = document.getElementById("owins")!
const ties = document.getElementById("ties")!
const resetBtn = document.getElementById('reset')!
const squareClick = document.querySelector<HTMLInputElement>('.board')!
const h2 = document.querySelector('h2')!



resetBtn.addEventListener("click", init)

squareClick.addEventListener("click", handleClick)

init()

function init():void{
    board = [0,0,0,0,0,0,0,0,0]
    turn = -1
    winner = false
    tie = false
    h2.style.fontSize = "35px"
    h2.style.color = "black"
    render()
}

function render(){
  updateMessage()
    updateBoard()
  }

  function updateBoard(){
    board.forEach( function (ele, i){
      if(ele === 1){
        squareEls[i].textContent = "💖"
      }  else if( ele === -1) {
        squareEls[i].textContent = "❤️"
      } else if (ele === 0){
        squareEls[i].textContent = " "
      }
    }
    )
  }

  function updateMessage(){
  
    if (winner === false && tie === false){
      if(turn === 1){
        return messageEl.innerHTML= "It is 💖's turn"} 
      else {
          return messageEl.innerHTML= "It is ❤️'s turn"
        }
    } else if (winner === false && tie === true){
        console.log("its a tie")
        return messageEl.innerHTML= "It is a tie! Try Again?",scoreBoard.ties++
    } else if (winner === true){
        if(turn === 1){
          return messageEl.innerHTML= "❤️ has won!", h2.style.fontSize = "60px", h2.style.color = "red",scoreBoard.xWins++} 
      else {
        }return messageEl.innerHTML= "💖 has won!",h2.style.fontSize = "60px", h2.style.color = "red",scoreBoard.oWins++}     
    }

    function handleClick(e: MouseEvent):void{
      if (!e.target) return
      
      const target = e.target as HTMLButtonElement;
      const id = target.id
      console.log(id)
      if(!id) return
      let sqIdx = id.split("").slice(2)
      let sqIdxS = sqIdx.toString()
      if (sqIdxS == "❤️" || sqIdxS == "💖"){
        return
      } else if (winner === true){
        return
      } else {
        let squareIdx = +sqIdxS
        console.log("square", squareIdx)
        placePiece(squareIdx)
      }
      render()
      switchPlayerTurn()
      checkForWinner()
      updateMessage()
      updateScore()
    }

    function placePiece(square:number){
      board[square] = turn
      checkForTie()
    }

    function checkForTie(){
      if (board.includes(0) == true) {
        return
    }else {
      tie = true
    }
    }
    
    function checkForWinner(){
        for (let i = 0; i < winningCombos.length; i++) {
          let sum = board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]
          let absSum = Math.abs(sum)
          if (absSum === 3) winner = true
        }
      }
    
    
    
    function switchPlayerTurn(){
      if(winner === true){
        return
      }else {
        turn = (turn * -1)
        console.log ("swicthed turn", turn)
      }
    }
    function updateScore(){
      xwins.textContent= `❤️: ${scoreBoard.xWins}`
      owins.textContent= `💖: ${scoreBoard.oWins}`
      ties.textContent = `Ties: ${scoreBoard.ties}`
    }