// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = 300;
    
    this.x += this.speed * dt;

    //reset enemy's position
    if (this.x >= 500) {
        this.reset();
    }

    //Handle collision
    if (this.x - 50 < player.x && this.x + 50 > player.x) {
        if (this.y - 50 < player.y && this.y + 50 > player.y) {
            player.reset();

            document.getElementById("Msg").innerHTML = "Oops! Try Again";

        }
    }
};


//Reset Function for enemy's position
Enemy.prototype.reset = function() {
    this.x = -100;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Player.prototype.update = function() {
    //If Player reaches the water   
    if (this.y < -10) {
        this.reset();
        document.getElementById("Msg").innerHTML = "You Win";
    }
    //This is for a Player to not move off screen
    if (this.x < -10) {
        this.x = 0;
    }

    if (this.x > 410) {
        this.x = 400;
    }

    if (this.y > 400) {
        this.y = 400;
    }

};

//Reset Function for player's position
Player.prototype.reset = function() {
    this.y = 400;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The handleInput for user input 
Player.prototype.handleInput = function(key) {
    if (key == 'left')
        this.x = this.x - 100;
    if (key == 'up')
        this.y = this.y - 100;
    if (key == 'right')
        this.x = this.x + 100;
    if (key == "down")
        this.y = this.y + 100;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(100, 230, 300), new Enemy(200, 130, 300), new Enemy(300, 40, 300), new Enemy(400, 230, 300)];
var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});