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
    AIpickColor: function () {
        this.sequence.push(Math.floor(Math.random() * 4));
        console.log(this.sequence)
        UserExperience.ShowAIonBoard()
        AppController.playerTurn()
    }
}

const UserExperience = {
    //Show the AI sequence on the screen
    ShowAIonBoard: function () {
        setTimeout(function(){
            $('#green').css('background-color', 'purple')
        }, 1000)
        setTimeout(function(){
            $('#green').css('background-color', 'green')
        }, 1300)

    },
    //Show the player sequence on the screen
    ShowPlayerOnBoard: function () {

    },
    ShowAIonBoard: function (index) {
        
        for(let i = 0; i<AI.sequence.length; i++){
            if(AI.sequence[i] == 0){
                this.LightGreen()
            }
            else if(AI.sequence[i] == 1){
                this.LightRed()
            }
            else if(AI.sequence[i] == 2){
                this.LightBlue()
            }
            else if(AI.sequence[i] == 3){
                this.LightYellow()
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
            $('#blue').css('background-color', 'purple')
        }, 1000)
        setTimeout(function(){
            $('#blue').css('background-color', 'blue')
        }, 1300)

    },
    LightYellow: function () {
        setTimeout(function(){
            $('#green').css('background-color', 'purple')
        }, 1000)
        setTimeout(function(){
            $('#green').css('background-color', 'green')
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
