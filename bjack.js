//document.querySelector['hits'].addEventListener['click',bhit];
let blackjackGame = {
    'you': {'scorespan':'yresult','div':'yscore','score': 0},
    'dealer': {'scorespan':'dresult','div':'dscore','score': 0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':1},
    'wins':0,
    'losses':0,
    'drews':0,
    'isStand': false,
    'turnsOver': false,
};
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitsound = new Audio('images/sounds/swish.m4a');
const winsound = new Audio('images/sounds/win.mp3');
const losssound = new Audio('images/sounds/aww.mp3');
const drawsound = new Audio('images/sounds/draw.mp3');


document.querySelector('#hit').addEventListener('click',bhit);
document.querySelector('#deal').addEventListener('click',bdeal);
document.querySelector('#stand').addEventListener('click',bstand);

function bhit(){
    if(blackjackGame['isStand'] === false){
        if(YOU['score'] <= 21){
        let card = randomCards();
        showcards(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        }
    }
}

function showcards(card ,activeUser){
    var viewimage = document.createElement('img');
    viewimage.src = `images/images/${card}.png`;
    document.getElementById(activeUser['div']).appendChild(viewimage);
    hitsound.play();
}
function randomCards(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function bdeal(){
    if(blackjackGame['turnsOver'] === true){
        blackjackGame['isStand'] = false; 

        let yourimages = document.querySelector('#yscore').querySelectorAll('img');
        let dealerimages = document.querySelector('#dscore').querySelectorAll('img');

        for(let i=0;i<yourimages.length;i++){
            yourimages[i].remove();
        }
        for(let i=0;i<dealerimages.length;i++){
            dealerimages[i].remove();
        }

        YOU['score']= 0;
        DEALER['score']=0;
        document.querySelector('#yresult').textContent = 0;
        document.querySelector('#dresult').textContent = 0;

        document.getElementById(YOU['scorespan']).style.color = 'rgba(0, 238, 255)';
        document.getElementById(DEALER['scorespan']).style.color = 'rgba(0, 238, 255)';

        document.querySelector('#result').textContent = "Let's play" ;
        document.querySelector('#result').style.color = 'rgba(0, 238, 255)';

        blackjackGame['turnsOver'] = false;
    }
}

function updateScore(card,activeUser){
    activeUser['score'] += blackjackGame['cardsmap'][card];
}
function showScore(activeUser){
    if(activeUser['score'] > 21){
    document.getElementById(activeUser['scorespan']).textContent = 'BUST!!!';
    document.getElementById(activeUser['scorespan']).style.color = 'red';

    }else{
    document.getElementById(activeUser['scorespan']).textContent = activeUser['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bstand(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCards();
        showcards(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());
}

function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        } 
        else if(YOU['score'] === DEALER['score']){
            blackjackGame['drews']++;
        }
    }
    else if(YOU['score'] >21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner= DEALER;
    }
    else if(YOU['score'] >21 && DEALER['score'] > 21){
        blackjackGame['drews']++;
    }
    console.log(winner);
    return winner;
}

function showResult(winner){
    let msg,msgcolor;
    if(blackjackGame['turnsOver'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            msg = 'You Won!';
            msgcolor = 'rgb(6, 250, 67)';
            winsound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            msg = 'You Loss!';
            msgcolor = 'red';
            losssound.play();
        }
        else{
            document.querySelector('#drews').textContent = blackjackGame['drews'];
            msg = 'You Draw!';
            msgcolor = 'yellow';
            drawsound.play();
        }
        document.querySelector('#result').textContent = msg;
        document.querySelector('#result').style.color = msgcolor;


    }
}