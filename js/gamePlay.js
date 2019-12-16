export default class GamePlay {
    constructor() {
        this.deck = null;
        this.gameDeck = undefined;
        this.players = null;
        this.gameUI = null;
        this.turnInProgress = false;
        this.roundWon = false;
        this.roundLost = false;
    }

    setDeck(deck){
        this.deck = deck;
    }

    setPlayers(players){
        this.players = players;
    }

    setGameUI(gameUI){
        this.gameUI = gameUI;
    }

    dealStartingHand(){
        this.players.players.forEach(player => {
            if (!player.dealer){
                const firstTwoCards = this.gameDeck.splice(0, 2);
                const points = firstTwoCards[0].power + firstTwoCards[1].power;
                player.hand = firstTwoCards;
                player.points = points;
            }else {
                const firstTwoCards = this.gameDeck.splice(0, 1);
                const points = firstTwoCards[0].power;
                player.hand = firstTwoCards;
                player.points = points;
            }
        })
    }

    hit(id = 0){
        const newCard = this.gameDeck.pop();
        this.gameUI.addCard(id, newCard);
        this.players.players[id].hand.push(newCard);

        this.players.players[id].points += newCard.power;
        this.gameUI.addPoints(id, this.players.players[id].points);
    }

    newGame() {
        this.gameDeck = undefined;
        this.gameDeck = this.deck.shuffle();
        this.players.createPlayers();
        this.dealStartingHand();
        this.gameUI.dealStartingHands(this.players);
    }

    nextRound() {
        this.gameDeck = undefined;
        this.gameDeck = this.deck.shuffle();
        this.dealStartingHand();
        this.gameUI.dealStartingHands(this.players);
    }

    evaluateWinner() {
        if (this.players.players[1].points > 21){
            this.roundLost = true;
            this.gameUI.displayWinnerAlert(0);
            return;
        }

        if (this.players.players[0].points > 21){
            this.roundWon = true;
            this.gameUI.displayWinnerAlert(1);
            return;
        }

        if (this.players.players[0].points === 21){
            this.roundLost = true;
            this.gameUI.displayWinnerAlert(0);
            return;
        }

        if(this.players.players[1].points === 21) {
            if (this.players.players[0].points !== 21) {
                this.roundWon = true;
                this.gameUI.displayWinnerAlert(1);
                return;
            }
        }

        if (this.players.players[1].points < 21){
            if (this.players.players[0].points !== this.players.players[1].points){
                if (this.players.players[0].points < this.players.players[1].points){
                    this.roundWon = true;
                    this.gameUI.displayWinnerAlert(1);
                    return;
                }
                this.roundLost = true;
                this.gameUI.displayWinnerAlert(0);
            }
        }
    }

    playerTurn(){
        if (this.gameDeck.length < 4){
            return;
        }
        if (this.players.players[1].points === 21) {
            return;
        }
        if(this.players.players[1].points > 21){
            return;
        }
        this.hit(1)
    }

    dealerTurnLogic(){
        if (this.players.players[0].points >= 21){
            this.turnInProgress = false;
        }

        if (this.players.players[1].points === 21 && this.players.players[0].points === 21){
            this.turnInProgress = false;
        }

       else if (this.players.players[1].points > 18 && this.players.players[1].points <= 20 && this.players.players[0].points < 18){
            this.turnInProgress = true;
            //Play if player is between 18 and 20 points and dealer is under 18 points
        }

        else if (this.players.players[1].points < 18 && this.players.players[0].points < 18 && this.players.players[1].points !== this.players.players[0].points){
            this.turnInProgress = true;
        }

        else if (this.players.players[1].points <= this.players.players[0].points){
            this.turnInProgress = false;
        }
    }

    dealerTurn(){
        this.turnInProgress = true;
        while(this.turnInProgress){
            this.dealerTurnLogic();
            if (this.turnInProgress){
                this.hit(0);
            }
        }

        this.evaluateWinner();
    }
}