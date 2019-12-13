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
        this.players.forEach(player => {
            const firstTwoCards = this.gameDeck.splice(0, 2);
            const points = firstTwoCards[0].power + firstTwoCards[1].power;
            player.hand.push(firstTwoCards);
            player.points = points;
        })
    }

    hit(id = 0){
        this.players[id].hand.push(this.gameDeck.pop());
    }

    newGame() {
        this.deck.shuffle();
        this.players.createPlayers();
        this.dealStartingHand();
    }

    turn(id = 0){
        if (this.gameDeck.length < 4){
            this.newGame();
        }
        if (this.players[id].points === 21) {
            this.roundWon = true;
        }
        if(this.players[id].points > 21){
            this.roundLost = true;
        }

        this.hit(id)
    }
}