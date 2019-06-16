/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


**************************** CHALLENGE ****************************
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


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


var scores, roundScores, activePlayer, gamePlaying; //variable for the scores and who the active player is
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
    
        // 2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        //3. update the round score IF the rolled number was NOT a 1 
        if (dice !== 1 ) {
            // add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            
            nextPlayer();

        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
         // Add current score to global score
        scores[activePlayer] += roundScore;
    
        // Update user interface 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            // Player has won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
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
        
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    
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



















