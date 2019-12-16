export default class Player {
    constructor(){
        this.numberOfPlayers = 2;
        this.players = [];
    }

    createPlayers() {
        this.players = [];
        for (let i = 0; i < this.numberOfPlayers; i++){
            let hand = [];
            const player = {
                name: `Player ${i}`,
                id: i,
                dealer: i === 0,
                hand: hand,
                points: 0,
            };
            this.players.push(player);
        }
    }
}