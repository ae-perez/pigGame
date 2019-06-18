/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his entire score when he rolls two 6s in a row. After that, its the next players turn. (Hint: Always save the previous dice roll in - A separate variable)
- A player looses their current score when one of the dice is a 1.
*/

//variables used for this game:
var scores, roundScores, activePlayer, gamePlaying, previousDice1, previousDice2; 

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. get a random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if(dice1 === 6 && previousDice1 === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if(dice2 === 6 && previousDice2 === 6) {
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();      
        } else if(dice1 !== 1 || dice2 !== 1) {
            roundScore = dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        previousDice1 = dice1;
        previousDice2 = dice2;

    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to the global score
        scores[activePlayer] += roundScore;

        // Update the users interface 
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;

        var winScore;

        //check if input value is not empty (to see if user has placed a value)
        if(input) {
            winScore = input;
        } else {
            winScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winScore) {
            // Player has won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



//NOTES:
// technical term for JS interacting with webpage = DOM manipulation
// DOM > document object model
//        > structured rep of html document
//        > used to connect wepages to scripts

//lets you select stuff they way you would in css,
//if you know how to select stuff with css,
//you can do it with querySelector

//for the doc code below, he did '#current-' + activePlayer because if 
//activePlayer equals o it will change all values for current 0 (so player 1) whereas if activePlayer equals 1 then it will change all values for current 1 (so player 2), its a very logical way of changing the values, because you know you are going to be changing them quite frequently

// different between using .textContent and .innerHTML is that with .textContent you will legit only add in text so if you are adding html it will literally output <h1> bla blah </h1> instead of adding that html into the document. VS when you use .innerHTML, it will actually add the html into the document, so be wary of that 
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Events are like notifications that notify the code that something happened on the webpage
// event listeners are functions that wait for a certain event to occur 
// an event can only be prosessed when execution stack is empty 
// message que > where all the events in the browser are put, they chill there and wait and are listening 
// what is a callback function? > a function that we pass in another function as an arguement 
// what is an annoymous function? > a function taht doesn't have a name, and cannot be reused .. example: 
//    ...addEventListener('click', function() {
//        // do something here
//    });
// there are various event listeners, like: click, mouseover, mouseenter, mousedown, mouseup, etc


/*https://careers.ibm.com/ShowJob/Id/630987/Front%20End%20Developer%20Interns%20September%202019%20%20%2012%20months%20(Markham,%20ON)*/