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
ghosts.forEach(ghost =>
	squares[ghost.startIndex].classList.add(ghost.className)
)
