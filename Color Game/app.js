var difficulty = 'easy';
var squares = document.querySelectorAll('.square:not(.d-none)');
var pickedColorDisplay = document.querySelector('.pickedColor');
var easyBtn = document.querySelector('#easy-btn');
var hardBtn = document.querySelector('#hard-btn');
var newColorsBtn = document.querySelector('#new-btn');
var banner = document.querySelector('.banner');
var message = document.querySelector('#message');
var colors = [];
var pickedColor = '';

easyBtn.addEventListener('click', changeDifficulty);
hardBtn.addEventListener('click', changeDifficulty);

//generate all new colors
newColorsBtn.addEventListener('click', init);

//initialising the game for first time
init();

//initialize and re-initialize the Game from here
function init() {
    banner.style.backgroundColor = "#75ad29";
    colors = generateRandomColor(squares.length);
    console.log(squares.length);
    pickedColor = colors[Math.floor(Math.random() * squares.length)];
    pickedColorDisplay.textContent = pickedColor.toUpperCase();
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener('click', checkPickedColor);
    }
    message.textContent = "";
}

function changeDifficulty() {
    //lets check for the button whether it is active or not
    //if an active button is clicked then do nothing otherwise go on
    if (!this.getAttribute("class")) {
        //suppose, if the Hard difficulty button is clicked
        //then it will proceed to change the difficulty to Hard
        if (difficulty === 'easy') {
            hardBtn.classList.add("selected");
            easyBtn.classList.remove("selected");
            difficulty = 'hard';
            //selecting all the squares so to remove the d-none class and make it visible
            squares = document.querySelectorAll('.square');
            for (let i = 3; i < squares.length; i++) {
                squares[i].classList.remove('d-none');
            }
            init();
        } else if (difficulty === 'hard') {
            easyBtn.classList.add("selected");
            hardBtn.classList.remove("selected");
            difficulty = 'easy';
            //adding d-none classes to the last three squares so make it hidden
            //for easy level difficulty
            for (let i = 3; i < squares.length; i++) {
                squares[i].classList.add('d-none');
            }
            //now again assigning squares variable with only visible squares
            squares = document.querySelectorAll('.square:not(.d-none');
            init();
        }
    }
}

function changeColor(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        squares[i].removeEventListener('click', checkPickedColor);
    }
    banner.classList.remove('bg-primary');
    banner.style.backgroundColor = color;
}

function checkPickedColor() {
    var clickedColor = this.style.backgroundColor;
    if (clickedColor === pickedColor) {
        changeColor(clickedColor);
        message.textContent = "Correct!!";
        newColorsBtn.textContent = "Play Again??";
    } else {
        this.style.backgroundColor = "#232323";
        message.textContent = "Try Again!!";
    }
}

function generateRandomColor(size) {
    var arr = [];
    for (let i = 0; i < size; i++) {
        var random_R = Math.floor(Math.random() * 255);
        var random_G = Math.floor(Math.random() * 255);
        var random_B = Math.floor(Math.random() * 255);
        arr.push(`rgb(${random_R}, ${random_G}, ${random_B})`);
    }
    return arr;
}