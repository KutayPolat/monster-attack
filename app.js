function getValueOfRandomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getValueOfRandomNumberRange(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getValueOfRandomNumberRange(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster','attack',attackValue);
        },
        specialAttackToMonster() {
            this.currentRound++;
            const attackValue = getValueOfRandomNumberRange(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','special attack',attackValue);
            this.attackPlayer();
        },
        useHealForPlayer() {
            this.currentRound++;
            const healValue = getValueOfRandomNumberRange(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player','heal',healValue);
            this.attackPlayer();
        },
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift({
               actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
    computed: {
        monsterHealthBarStyle() {
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }
            return {width: this.monsterHealth + '%'};
        },
        playerHealthBarStyle() {
            if (this.playerHealth < 0) {
                this.playerHealth = 0;
            }
            return {width: this.playerHealth + '%'};
        },
        specialAttackUsePeriod() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {

            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {

            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }

        }
    }
});

app.mount('#game');