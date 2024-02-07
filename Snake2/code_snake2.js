const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX,foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0; //leer un elemento de la memoria, leemos lo que hay dentro de la etiqueta highscore, en caso de que no tenga nada el valor va a ser cero, esto es para leer el valor, mas abajo haremos el push
highScoreElement.innerHTML = `High Score: ${highScore}`;

const changeFoodPosition = () => { //cambia las coordenadas de la comida de manera aleatoria
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
	clearInterval(setIntervalId);
	alert("Game Over!");
	location.reload();
}

const changeDirection = (e) =>{
	if(e.key === "ArrowUp" && velocityY != 1){
		velocityX = 0;
		velocityY = -1;
	}
	if(e.key === "ArrowDown" && velocityY != -1){
		velocityX = 0;
		velocityY = 1;
	}
	if(e.key === "ArrowLeft" && velocityX != 1){
		velocityX = -1;
		velocityY = 0;
	}
	if(e.key === "ArrowRight" && velocityX != -1){
		velocityX = 1;
		velocityY = 0;
	}	
}

const initGame = () =>{
	if(gameOver) return handleGameOver(); // si el game over es verdadero retornamos la funcion para game over
	let htmlMarkup =`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

	if(snakeX === foodX && snakeY === foodY){ //la serpiente come una comida
		changeFoodPosition();
		snakeBody.push([foodX, foodY]);
		score++;

		highScore = score >= highScore ? score : highScore; //pregunta si el puntaje es igual o mayor al puntaje maximo si esto es verdadero va a quedar en puntaje maximo el valor del puntaje y el puntaje actual no es mayor al puntaje maximo, o sea, es falso, el valor del puntaje maximo se va a mantener
		localStorage.setItem("high-score", highScore);//agregamos este item en el local storage, colocamos el nombre y la variable que queremos mostrar
		scoreElement.innerHTML = `Score: ${score}`; //cambia el valor del score del html por el score de aqui

		highScoreElement.innerHTML = `High Score: ${highScore}`;
	}

	for(let i = snakeBody.length -1; i > 0; i--){
		snakeBody[i] = snakeBody[i-1];
	}

	snakeBody[0] = [snakeX, snakeY];

	snakeX += velocityX; //snakeX = snakeX + velocityX;
	snakeY += velocityY;

	if(snakeX <= 0 || snakeX >30 || snakeY <= 0 || snakeY > 30){ //colisiones con el entorno
		gameOver = true;
	}


	for(let i = 0; i < snakeBody.length; i++) { //la cola de la serpiente
		htmlMarkup +=`<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
		if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
			gameOver = true;
		}
	}
	playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 70);
document.addEventListener("keydown", changeDirection);