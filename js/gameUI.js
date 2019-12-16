export default class GameUI {

    DOMElements = {
        playerHand: '.player__hand',
        dealerHand: '.dealer__hand',
        playerPoints: '.player__points',
        dealerPoints: '.dealer__points',
    };

    constructor(){
        this.playerHand = document.querySelector(this.DOMElements.playerHand);
        this.dealerHand = document.querySelector(this.DOMElements.dealerHand);
        this.playerPoints = document.querySelector(this.DOMElements.playerPoints);
        this.dealerPoints = document.querySelector(this.DOMElements.dealerPoints);
    }

    dealStartingHands(players){

        if(this.dealerHand.childElementCount > 0){
            while(this.dealerHand.firstChild){
                this.dealerHand.removeChild(this.dealerHand.firstChild)
            }
        }

        if(this.playerHand.childElementCount > 0){
            while(this.playerHand.firstChild){
                this.playerHand.removeChild(this.playerHand.firstChild)
            }
        }

        const dealerFragment = document.createDocumentFragment();
        const playerFragment = document.createDocumentFragment();

        players.players[0].hand.forEach(card => {
            const liElement = document.createElement('li');
            liElement.setAttribute('class', 'card');

            const value = document.createElement('span');
            value.textContent = `${card.value} ${card.suit}`;

            liElement.appendChild(value);
            dealerFragment.appendChild(liElement);
        });

        players.players[1].hand.forEach(card => {
            const liElement = document.createElement('li');
            liElement.setAttribute('class', 'card');

            const value = document.createElement('span');
            value.textContent = `${card.value} ${card.suit}`;

            liElement.appendChild(value);
            playerFragment.appendChild(liElement);
        });

        this.dealerHand.appendChild(dealerFragment);
        this.playerHand.appendChild(playerFragment);


        this.dealerPoints.textContent = `Score: ${players.players[0].points}`;
        this.playerPoints.textContent = `Score: ${players.players[1].points}`;
    }

    addPoints(id, points){
        if (id === 0){
            this.dealerPoints.textContent = `Score: ${points}`;
        }else {
            this.playerPoints.textContent = `Score: ${points}`;
        }
    }

    addCard(id, card){
        const liElement = document.createElement('li');
        liElement.setAttribute('class', 'card');

        const value = document.createElement('span');
        value.textContent = `${card.value} ${card.suit}`;

        liElement.appendChild(value);

        if (id === 0){
            this.dealerHand.appendChild(liElement);
        }else {
            this.playerHand.appendChild(liElement);
        }
    }

    displayWinnerAlert(id){
        console.log(`Winner: ${id}`)
    }

}