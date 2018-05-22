const BoardGame = {
    gameOver: function () {
        $('#board').css('pointer-events', 'none')
        alert('You loose!')
        $('#reset').css('display', 'block')
    },
    reset: function () {
        Player.sequence = []
        AI.sequence = []
        Player.sequenceIndex = 0
        AppController.AIturn()
        $('#reset').css('display', 'none')
    },
    nextTurn: function () {
        $('#board').css('pointer-events', 'none')
        console.log('they matched')
        Player.sequenceIndex = 0
        Player.sequence = []
        AppController.AIturn()
    }
} 

const Player = {
    sequence: [],
    sequenceIndex: 0,
    playerPick: function (numero) {
        Player.sequence.push(numero)
        Player.sequenceIndex++
        AppController.CheckSequence()
        // AppController.AIturn()
    }
}

const AI = {
    sequence: [],
    sequenceIndex: 0,
    AIpickColor: function () {
        this.sequence.push(Math.floor(Math.random() * 4));
        console.log(this.sequence)
        UserExperience.ShowAIonBoard(UserExperience.delay)
        AppController.playerTurn()
    }
}

const UserExperience = {
    delay:0,
    //Show the AI sequence on the screen
    //Show the player sequence on the screen
    ShowPlayerOnBoard: function () {

    },
    ShowAIonBoard: function (delay) {
        let index = AI.sequenceIndex
        for(let i = 0; i<AI.sequence.length; i++){
            if(AI.sequence[i] == 0){
                setTimeout(UserExperience.LightGreen, delay)
                delay+=500
                console.log(delay)
                // index++
            }
            else if(AI.sequence[i] == 1){
                 setTimeout(this.LightRed, delay)
                 console.log(delay)
                 delay+=500
                //  index++
            }
            else if(AI.sequence[i] == 2){
                setTimeout(this.LightBlue, delay)
                console.log(delay)
                delay+=500
                // index++
            }
            else if(AI.sequence[i] == 3){
                setTimeout(this.LightYellow, delay)
                console.log(delay)
                delay+=500
                // index++
            }
        }

    },
    LightGreen: function () {
        setTimeout(function(){
            $('#green').css('background', 'radial-gradient(ellipse at center, rgba(210,255,82,1) 0%,rgba(145,232,66,1) 100%)')
        }, 1000)
        setTimeout(function(){
            $('#green').css('background', 'green')
        }, 1300)

    },
    LightRed: function () {
        setTimeout(function(){
            $('#red').css('background', 'radial-gradient(ellipse at center, rgba(255,26,0,1) 0%,rgba(255,26,0,1) 100%)')
        }, 1000)
        setTimeout(function(){
            $('#red').css('background', 'rgb(195, 0, 0)')
        }, 1300)

    },
    LightBlue: function () {
        setTimeout(function(){
            $('#blue').css('background', 'radial-gradient(ellipse at center, rgba(73,155,234,1) 0%,rgba(32,124,229,1) 100%)')
        }, 1000)
        setTimeout(function(){
            $('#blue').css('background', 'blue')
        }, 1300)

    },
    LightYellow: function () {
        setTimeout(function(){
            $('#yellow').css('background', 'radial-gradient(ellipse at center, rgba(255,255,136,1) 0%,rgba(255,255,136,1) 100%)')
        }, 1000)
        setTimeout(function(){
            $('#yellow').css('background', '#ffcc00')
        }, 1300)

    },
}

const AppController = {

    playerTurn: function () {
        $('#board').css('pointer-events', 'auto')
    },
    AIturn: function () {
        AI.AIpickColor()
    },
    CheckSequence: function () {
        let index = Player.sequenceIndex - 1
        const playerSeq = Player.sequence
        const AIseq = AI.sequence

        if (playerSeq[index] !== AIseq[index]) {
            BoardGame.gameOver()
        }
        if (playerSeq.length == AIseq.length && playerSeq[index] == AIseq[index]) {
            BoardGame.nextTurn()
        }
    }

}

window.onload = function () {
    AppController.AIturn()
};

//Player picker set of functions
$('#green').click(function () {
    Player.playerPick(0)
    console.log(Player.sequence)
})

$('#red').click(function () {
    Player.playerPick(1)
    console.log(Player.sequence)
})

$('#blue').click(function () {
    Player.playerPick(2)
    console.log(Player.sequence)
})

$('#yellow').click(function () {
    Player.playerPick(3)
    console.log(Player.sequence)
})

$('#reset').click(function () {
    console.clear()
    BoardGame.reset()
})
