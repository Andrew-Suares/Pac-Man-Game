const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let squares = []
let score = 0
// 28 x 28 = 784 squares
//  0 will be pac dots
// 1 will be wall
// 2 ghost layers
// 3 power pellets
// 4 will be empty areas to make shape
const layout = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
	1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
	1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
	1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
	1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
	4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
	1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
	4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
	1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
	1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
	1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
	0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1,
]

// create board
function createBoard() {
	for (let i = 0; i < layout.length; i++) {
		const square = document.createElement('div')
		// put square into the Grid
		grid.appendChild(square)
		// put squares into an array
		squares.push(square)

		// Style the squares
		if (layout[i] === 0) {
			squares[i].classList.add('pac-dot')
		} else if (layout[i] === 1) {
			squares[i].classList.add('wall')
		} else if (layout[i] === 2) {
			squares[i].classList.add('ghost-lair')
		} else if (layout[i] === 3) {
			squares[i].classList.add('power-pellet')
		}
	}
}

createBoard()

// Pacman starting position
let pacmanCurrentIndex = 500
squares[pacmanCurrentIndex].classList.add('pacman')

// Game controls
function control(e) {
	// !Removes him from current position
	squares[pacmanCurrentIndex].classList.remove('pacman')
	// Instead use Switch Statements
	switch (e.key) {
		case 'ArrowDown':
			if (
				!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
				!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
				pacmanCurrentIndex + width < width * width
			)
				pacmanCurrentIndex += width
			break
		case 'ArrowUp':
			if (
				!squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
				!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
				pacmanCurrentIndex - width >= 0
			)
				pacmanCurrentIndex -= width
			break
		case 'ArrowRight':
			if (
				!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
				!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
				pacmanCurrentIndex % width < width - 1
			)
				pacmanCurrentIndex += 1
			// ! The shorcut section
			if (pacmanCurrentIndex === 391) {
				pacmanCurrentIndex = 364
			}
			break
		case 'ArrowLeft':
			if (
				!squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
				!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
				pacmanCurrentIndex % width !== 0
			)
				pacmanCurrentIndex -= 1
			// ! The shorcut section
			if (pacmanCurrentIndex === 364) {
				pacmanCurrentIndex = 391
			}
			break
	}
	squares[pacmanCurrentIndex].classList.add('pacman')
	pacDotEaten()
	powerPelletEaten()
	checkForWin()
	checkForGameOver()
}
document.addEventListener('keyup', control)

// Pacdots being eaten Function
function pacDotEaten() {
	if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
		score += 1
		scoreDisplay.innerHTML = score
		squares[pacmanCurrentIndex].classList.remove('pac-dot')
	}
}

// Power Pellets Eaten Functio
function powerPelletEaten() {
	// if square pacman is on contains a power pellet
	if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
		// remove power pellet from square.
		squares[pacmanCurrentIndex].classList.remove('power-pellet')

		// Add a score of 100
		score += 10
		// Change each ghost to isScared
		ghosts.forEach(ghost => (ghost.isScared = true))
		// Use set Time Out to unscare the ghost after 10 seconds
		setTimeout(unScareGhosts, 10000)
	}
}
function unScareGhosts() {
	ghosts.forEach(ghost => (ghost.isScared = false))
}

// construct the ghosts
class Ghost {
	// ! we want each ghost to have a class name, starting index and a speed
	constructor(className, startIndex, speed) {
		this.className = className
		this.startIndex = startIndex
		this.speed = speed
		// ! can also store variables that we will use later and don't have to be in the parameters above
		this.currentIndex = startIndex
		this.isScared = false
		this.timerId = NaN
	}
}

// Make the ghosts

const ghosts = [
	new Ghost('blinky', 348, 250),
	new Ghost('pinky', 376, 400),
	new Ghost('inky', 351, 300),
	new Ghost('clyde', 379, 500),
]

// Putting the ghosts on the board using for each
// ! adding the ghost class name to the index square we gave the ghost class index to for each one
ghosts.forEach(ghost => {
	squares[ghost.currentIndex].classList.add(ghost.className)
	squares[ghost.currentIndex].classList.add('ghost')
})

// Moving the ghost
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
	const directions = [-1, +1, -width, +width]
	let direction = directions[Math.floor(Math.random() * directions.length)]

	ghost.timerId = setInterval(function () {
		//! if the next square does not contain a wall or a ghost
		if (
			!squares[ghost.currentIndex + direction].classList.contains('wall') &&
			!squares[ghost.currentIndex + direction].classList.contains('ghost')
		) {
			// remove ghost
			squares[ghost.currentIndex].classList.remove(ghost.className)
			// ! makes it so they do not run into eachother
			squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
			// add direction to the current Index
			ghost.currentIndex += direction
			// add the ghost class back to the new position
			squares[ghost.currentIndex].classList.add(ghost.className)
			// ! makes it so they do not run into eachother
			squares[ghost.currentIndex].classList.add('ghost')
			// ! get a new direction
		} else direction = directions[Math.floor(Math.random() * directions.length)]

		// ! if the Ghost is SCARED then
		if (ghost.isScared) {
			squares[ghost.currentIndex].classList.add('scared-ghost')
		}
		// ! eating the ghosts functionality
		//if the ghost is current scared AND pacman is on it
		if (
			ghost.isScared &&
			squares[ghost.currentIndex].classList.contains('pacman')
		) {
			//remove classnames - ghost.className, 'ghost', 'scared-ghost'
			squares[ghost.currentIndex].classList.remove(
				'scared-ghost',
				'ghost',
				ghost.className
			)
			// change ghosts currentIndex back to its startIndex
			ghost.currentIndex = ghost.startIndex
			//add a score of 100
			score += 100
			//re-add classnames of ghost.className and 'ghost' to the ghosts new position
			squares[ghost.currentIndex].classList.add('ghost', ghost.className)
		}
		checkForGameOver()
	}, ghost.speed)
}

// ! check for game over

function checkForGameOver() {
	//if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
	if (
		squares[pacmanCurrentIndex].classList.contains('ghost') &&
		!squares[pacmanCurrentIndex].classList.contains('scared-ghost')
	) {
		//for each ghost - we need to stop it moving
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		//remove eventlistener from our control function
		document.removeEventListener('keyup', control)
		//tell user the game is over
		scoreDisplay.innerHTML = 'You LOSE'
	}
}

//check for win
function checkForWin() {
	if (score === 274) {
		//stop each ghost
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		//remove the eventListener for the control function
		document.removeEventListener('keyup', control)
		//tell our user we have won
		scoreDisplay.innerHTML = 'You WON!'
	}
}
