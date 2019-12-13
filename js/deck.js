export default class Deck {
    constructor() {
        this.deck = [];
        this.suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    }

    createDeck(){
        for (let i = 0; i < this.values.length; i++){
            for (let j = 0; j < this.suits.length; j++){
                let power = parseInt(this.values[i]);
                if (this.values[i] === 'J' || this.values[i] === 'Q' || this.values[i] === 'K'){
                    power = 10;
                }
                if (this.values[i] === 'A'){
                    power = 11;
                }
                const card = {
                    value: this.values[i],
                    suit: this.suits[j],
                    power: power,
                };
                this.deck.push(card);
            }
        }
    }

    shuffle(){
        this.createDeck();
        let currentDeck = this.deck;
        for (let i = currentDeck.length * 10 - 1; i>0; i--){
            const random = Math.floor(Math.random() * (i + 1));
            /**Shorthand of deck[i] = deck[random]; deck[random] = deck[i] **/
            [currentDeck[i], currentDeck[random]] = [currentDeck[random], currentDeck[i]];
        }
        return currentDeck;
    }
}